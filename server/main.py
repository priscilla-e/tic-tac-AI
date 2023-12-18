from fastapi import FastAPI
from openai import OpenAI
from config import settings
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = OpenAI(api_key=settings.openai_key, organization=settings.organization)


@app.get("/")
async def root():
    return {"message": "API is running..."}


@app.get("/gpt-move")
async def get_gpt_move(board: str, model: str = "gpt-3.5-turbo-1106"):
    response = client.chat.completions.create(
        model=model,
        temperature=0.4,
        response_format={"type": "json_object"},
        messages=[
            {"role": "system",
             "content": "You are an opponent in a Tic-Tac-Toe game. You're playing as 'O' and your goal is to p. Suggest the indexes of the next move as 'row,col' in JSON format"},
            {"role": "user",
             "content": f"Given the current Tic-Tac-Toe board:\n{board}\nMake the next move for 'O':"},
        ],
    )
    move = response.choices[0].message.content
    return move
