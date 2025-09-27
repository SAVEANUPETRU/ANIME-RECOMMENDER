import pandas as pd
from supabase import create_client, Client
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import re
import os
from dotenv import load_dotenv

load_dotenv(dotenv_path='.env') 

# Setează datele tale de autentificare
url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_KEY")
if not url or not key:
    print("EROARE: Variabilele SUPABASE_URL sau SUPABASE_KEY nu sunt setate. Serverul nu poate porni!")
    raise EnvironmentError("Variabile Supabase lipsă.")
supabase: Client = create_client(url, key)

count_response = supabase.table('anime').select('*', count='exact').limit(0).execute()
total_rows = count_response.count
response = supabase.table('anime').select('*').range(0, total_rows - 1).execute()

if not response.data:
    print("Eroare la extragerea datelor. Verifică URL-ul și cheia.")
    raise ValueError("Nu s-au putut extrage date din Supabase.")

df = pd.DataFrame(response.data)

# --- Pasul 2: Pregătirea și Vectorizarea Datelor ---
for col in ['genres', 'themes', 'synopsis']:
    if col in df.columns:
        df[col] = df[col].fillna('')

def combine_features(row):
    genres = row['genres']
    themes = row['themes']
    synopsis = row['synopsis']
    combined_string = f"{genres} {themes} {synopsis}"
    return combined_string

df['combined_features'] = df.apply(combine_features, axis=1)

tfidf_vectorizer = TfidfVectorizer(stop_words='english')
tfidf_matrix = tfidf_vectorizer.fit_transform(df['combined_features'])

print(f"\nMatricea TF-IDF a fost creată cu succes, incluzând toate cele {len(df)} anime-uri!")
print(f"Dimensiunea matricei TF-IDF: {tfidf_matrix.shape}")

# --- Pasul 3: Calculul Similarității și Funcția de Recomandare ---
cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)
SIMILARITY_THRESHOLD = 95 

def get_recommendations(title, cosine_sim_matrix=cosine_sim, anime_df=df):
    if title not in anime_df['name'].values:
        print("Anime-ul nu a fost găsit în baza de date.")
        return []

    # Funcție internă pentru a crea setul de cuvinte al titlului
    def get_token_set(name):
        # 1. Elimină caracterele non-alfanumerice (rămân doar litere și cifre)
        cleaned_name = re.sub(r'[^\w\s]', '', name).lower()
        # 2. Împarte în cuvinte și le filtrează pe cele scurte (< 3 litere)
        return set(word for word in cleaned_name.split() if len(word) >= 3)

    # Obținem setul de cuvinte pentru anime-ul de referință
    source_token_set = get_token_set(title)

    idx = anime_df[anime_df['name'] == title].index[0]
    sim_scores = list(enumerate(cosine_sim_matrix[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

    recommended_anime = []
    
    # Parcurgem lista de recomandări
    for i in range(1, len(sim_scores)):
        if len(recommended_anime) >= 10:
            break
        
        current_idx = sim_scores[i][0]
        current_title = anime_df['name'].iloc[current_idx]
        
        # Obținem setul de cuvinte pentru anime-ul recomandat
        recommended_token_set = get_token_set(current_title)
        
        # Logica de filtrare: Dacă setul de cuvinte al sursei este un subset
        # al setului de cuvinte recomandat (sau invers), le considerăm aceeași serie
        
        # EXEMPLU: {'hunter', 'hunter'} este subset de {'hunter', 'hunter', 'greed', 'island'}
        is_same_series = source_token_set.issubset(recommended_token_set) or \
                         recommended_token_set.issubset(source_token_set)
        
        if not is_same_series:
            recommended_anime.append(current_title)
            
    return recommended_anime

