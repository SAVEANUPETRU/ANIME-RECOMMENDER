from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware



try:
    from similarity import get_recommendations, df, cosine_sim
except ImportError:
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
    
    anime_to_recommend = user_input
    recommendations = get_recommendations(anime_to_recommend, cosine_sim, df)
    
    if recommendations:
        recommendations_str = ", ".join(recommendations)
        reply = f"So you want something similar with '{user_input}'. I would recommend: {recommendations_str}."
    else:
        reply = f"I am sorry, I do not understand '{user_input}'. Please write the exact name of an anime, from My Anime List."
        
    return {"response": reply}
