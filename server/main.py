from fastapi import FastAPI
from openai import OpenAI
from config import settings
from fastapi.middleware.cors import CORSMiddleware
import json
from utils import find_best_move


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
async def get_gpt_move(board, model: str = "gpt-3.5-turbo-1106"):
    """
    Use the GPT engine to generate a move for the AI player.
    :param board: the game board  as a 2D list
    :param model: the GPT model to use (gpt-3.5-turbo-1106 OR gpt-4.5-turbo-1106)
    :return:
    """
    board = json.loads(board)
    size = len(board)

    response = client.chat.completions.create(
        model=model,
        temperature=0.4,
        response_format={"type": "json_object"},
        messages=[
            {"role": "system",
             "content": f"You are an opponent in a {size}x{size} Tic-Tac-Toe game. You're playing as 'O' and your goal is to win. Suggest the indexes of the next move as 'row,col' in JSON format. Do not suggest cells that are already occupied."},
            {"role": "user",
             "content": f"Given the current Tic-Tac-Toe board:\n{board}\nMake the next move for 'O':"},
        ],
    )
    move = response.choices[0].message.content
    return move


@app.get("/minimax-move")
def get_minimax_move(board):
    """
    Find the best move for the AI player using the minimax algorithm.
    :param board: the game board  as a 2D list
    :return: a dictionary with keys 'row' and 'col'
    """
    board = json.loads(board)

    print(board)
    return find_best_move(board, 3)
