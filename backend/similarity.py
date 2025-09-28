import pandas as pd
from supabase import create_client, Client
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import re
import os
from dotenv import load_dotenv
import numpy as np
load_dotenv(dotenv_path='.env') 

url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_KEY")
if not url or not key:
    print("EROARE: Variabilele SUPABASE_URL sau SUPABASE_KEY nu sunt setate.")
    raise EnvironmentError("Variabile Supabase lipsă.")
supabase: Client = create_client(url, key)

count_response = supabase.table('anime').select('*', count='exact').limit(0).execute()
total_rows = count_response.count
response = supabase.table('anime').select('*').range(0, total_rows - 1).execute()

if not response.data:
    print("Eroare la extragerea datelor. Verifică URL-ul și cheia.")
    raise ValueError("Nu s-au putut extrage date din Supabase.")

df = pd.DataFrame(response.data)
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

cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)


np.save('cosine_sim.npy', cosine_sim)

SIMILARITY_THRESHOLD = 95 

def get_recommendations(title, cosine_sim_matrix=cosine_sim, anime_df=df):
    if title not in anime_df['name'].values:
        print("Anime-ul nu a fost găsit în baza de date.")
        return []

    def get_token_set(name):
        cleaned_name = re.sub(r'[^\w\s]', '', name).lower()
        return set(word for word in cleaned_name.split() if len(word) >= 3)

    source_token_set = get_token_set(title)

    idx = anime_df[anime_df['name'] == title].index[0]
    sim_scores = list(enumerate(cosine_sim_matrix[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

    recommended_anime = []
    for i in range(1, len(sim_scores)):
        if len(recommended_anime) >= 10:
            break
        
        current_idx = sim_scores[i][0]
        current_title = anime_df['name'].iloc[current_idx]
        
        recommended_token_set = get_token_set(current_title)
        is_same_series = source_token_set.issubset(recommended_token_set) or \
                         recommended_token_set.issubset(source_token_set)
        
        if not is_same_series:
            recommended_anime.append(current_title)
            
    return recommended_anime

