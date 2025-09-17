import pandas as pd
from supabase import create_client, Client
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import re
# Setează datele tale de autentificare
url: str = 'https://ftjfabgifsbdlnbxvgwo.supabase.co'
key: str = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0amZhYmdpZnNiZGxuYnh2Z3dvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1MTAyOTcsImV4cCI6MjA3MTA4NjI5N30.os3bsl_sSyeLQ7O-cLGS2fUGlNzdtaxc_py_e0mjGQI'
supabase: Client = create_client(url, key)

count_response = supabase.table('anime').select('*', count='exact').limit(0).execute()
total_rows = count_response.count
response = supabase.table('anime').select('*').range(0, total_rows - 1).execute()

if not response.data:
    print("Eroare la extragerea datelor. Verifică URL-ul și cheia.")
    exit()

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

def get_recommendations(title, cosine_sim_matrix=cosine_sim, anime_df=df):
    if title not in anime_df['name'].values:
        print("Anime-ul nu a fost găsit în baza de date.")
        return []

    def get_provisional_series_id(name):
        # Aceasta este versiunea simplificată și robustă a funcției
        words = name.split()
        if len(words) > 2 and words[1] in ['x', 'X']:
            return ' '.join(words[:3]).lower()
        return words[0].lower()

    provisional_series_id = get_provisional_series_id(title)
    idx = anime_df[df['name'] == title].index[0]
    sim_scores = list(enumerate(cosine_sim_matrix[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

    recommended_anime = []
    for i in range(1, len(sim_scores)):
        if len(recommended_anime) >= 10:
            break
        
        current_idx = sim_scores[i][0]
        current_title = df['name'].iloc[current_idx]
        current_provisional_id = get_provisional_series_id(current_title)
        
        if current_provisional_id != provisional_series_id:
            recommended_anime.append(current_title)
            
    return recommended_anime

# --- Exemplu de utilizare ---
anime_recomended = get_recommendations('Hunter x Hunter')
print(f"\nRecomandări pentru Hunter x Hunter:\n{anime_recomended}")