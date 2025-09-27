from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

# Importă funcția de recomandare și variabilele necesare
# Asigură-te că fisierul similarity.py este în același director


try:
    from similarity import get_recommendations, df, cosine_sim
except ImportError:
    # Dacă fișierul nu este găsit, poți afișa un mesaj de eroare util
    print("Eroare la import. Asigură-te că fișierul similarity.py există și rulează corect.")
    exit()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatMessage(BaseModel):
    message: str

@app.post("/api/chat")
async def chat_endpoint(chat_message: ChatMessage):
    user_input = chat_message.message
    
    # Aici, vom verifica dacă input-ul utilizatorului este o cerere de recomandare
    # O metodă simplă este să cauți cuvinte-cheie ca "recomandă", "similar cu", etc.
    # Putem să presupunem că utilizatorul va scrie doar numele unui anime.
    
    anime_to_recommend = user_input
    
    # Apelăm funcția de recomandare pe care am importat-o
    recommendations = get_recommendations(anime_to_recommend, cosine_sim, df)
    
    if recommendations:
        # Transformăm lista de recomandări într-un șir de caractere
        recommendations_str = ", ".join(recommendations)
        reply = f"So you want something similar with '{user_input}'. I would recommend: {recommendations_str}."
    else:
        # Dacă funcția nu a găsit nimic, răspundem corespunzător
        reply = f"I am sorry, I do not understand '{user_input}'. Please write the exact name of an anime, from My Anime List."
        
    return {"response": reply}