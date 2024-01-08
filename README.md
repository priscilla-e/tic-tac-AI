# Tic-tac-~~toe~~AI

Tic-tac-AI is an enhanced version of the classic [Tic-tac-toe](https://en.wikipedia.org/wiki/Tic-tac-toe) game that utilizes AI and Game Theory to enhance your gaming experience. 
I started this project to explore the performance of OpenAI's models in games. Over the course of the development process, I also did some research into Game Theory, specifically focusing on the [**Minimax algorithm**](https://en.wikipedia.org/wiki/Minimax).

# Preview
**Live Demo:  https://tic-tac-ai-nu.vercel.app**

https://github.com/priscilla-e/tic-tac-AI/assets/56302477/34fb8b3b-7e79-4588-b7c6-be759e220efa

# Features
### Multiple Board Sizes
Ever wondered what it's like to play Tic-tac-toe on a larger board? Well now you can! Tic-tac-AI introduces multiple board sizes (3x3, 4x4, and 5x5).

### Multi Player Mode

Play against friends in local multiplayer mode. Enjoy the timeless experience of competing with someone sitting right next to you.

### Single Player Mode
Challenge yourself against computer opponents with varying levels of difficulty:

* **Easy**: The computer player uses a random algorithm to simulate moves, providing a straightforward and beginner-friendly opponent.

* **Medium**: Utilizes OpenAI text-generation models to make intelligent and context-aware moves, creating a more challenging adversary.

* **Hard**: Implements the Minimax algorithm with alpha-beta pruning optimization, offering a highly strategic and formidable opponent.


### Minimax + Alpha-Beta Pruning and Fixed Depth Heuristic Evaluation
In the hard difficulty, Tic-tac-AI uses the Minimax algorithm, a decision rule used in artificial intelligence, decision theory, game theory, statistics, and philosophy  for minimizing the possible loss in a worst-case scenario. 
This algorithm is crucial in two player turn-based games such as Tic-Tac-Toe, Chess, etc.  

To enhance its efficiency, especially for larger boards like 4x4 and 5x5, I implemented alpha-beta pruning. Alpha-beta pruning is an optimization technique that significantly reduces the number of nodes evaluated by the Minimax algorithm. This enhancement was critical in addressing the challenge of longer evaluation times on larger boards.  
Furthermore,  Heuristics were introduced to evaluate the search tree at a fixed depth, rather than at terminal nodes.

### Open AI 
In the medium difficulty level of Tic-tac-AI, I integrated OpenAI's text-generation models to simulate an intelligent computer opponent. To achieve this, I began by crafting a specific prompt that would guide the AI to play Tic-tac-Toe effectively.

> You are an opponent in an NXN Tic-Tac-Toe game. You're playing as 'O' and your goal is to win. Suggest the indexes of the next move as 'row,col' in JSON format. Do not suggest cells that are already occupied.

This prompt was critical in setting the context for the AI. It clearly defines the role of the AI as an opponent in the game, specifies the symbol it's playing ('O'), and outlines the objective (to win). Most importantly, it instructs the AI to suggest its move in a 'row, col' format, encoded in JSON. This was a deliberate choice to ensure that the AI's responses could be easily parsed and integrated back into the game's logic.



**Code Sample:**
```python
@app.get("/gpt-move")
async def get_gpt_move(board, model: str = "gpt-3.5-turbo-1106"):
    board = json.loads(board)
    size = len(board)

    response = client.chat.completions.create(
        model=model,
        temperature=0.4,
        response_format={"type": "json_object"},
        max_tokens=150,
        messages=[
            {"role": "system",
             "content": f"You are an opponent in a {size}x{size} Tic-Tac-Toe game. You're playing as 'O' and your goal is to win. Suggest the indexes of the next move as 'row,col' in JSON format. Do not suggest cells that are already occupied."},
            {"role": "user",
             "content": f"Given the current Tic-Tac-Toe board:\n{board}\nMake the next move for 'O':"},
        ],
    )
    move = response.choices[0].message.content
    return move

```
# Technologies
* React.js + Vite (JavaScript)
* FastAPI
* OpenAI
* HTML (JSX)
* TailwindCSS

# Run the project locally
### Server  - Fast API
Navigate to the `/server` directory and activate a python virtual environment.  
[How to create a virtual environment?](https://docs.python.org/3/library/venv.html)

**Set environment variables:**  
Remember to set the required environement variables in the `.env.example `file and rename the file to `.env` afterwards.  
* OPENAI_KEY  
* ORGANIZATION

Run the following commands to install the project requirements and start server:
```bash
pip install -r requirements.txt
uvicorn main:app
```

### Client - React
Ensure the backend server is already up and running. 

**Set environment variables:**  
Rename `env.local.example` file to `.env.local`
* VITE_SERVER_URL (Default: http://localhost:8000)
* VITE_GPT_MODEL (Default: gpt-3.5-turbo-1106)

As of **6 Jan 2024**, if you want to experiment with other OpenAI text generation models, 
you can only use `gpt-3.5-turbo-1106` and `gpt-4-1106-preview` models in JSON mode.
[Why?](https://platform.openai.com/docs/guides/text-generation/json-mode)


Navigate to the `/client` directory and run the following commands.

```bash
npm install
npm run dev
```


You're welcome!

# Analysis & Conclusion

I gained significant insights developing this game, specifically with OpenAI implementation, game theory, and algorithm optimization.
This project was more than just a programming endeavor; it was a deep dive into AI and its application in game development.

Evaluating the performance of OpenAI's text-generation models in the context of Tic-tac-toe was a key aspect of this project.
While these models offered an innovative approach to simulating a computer opponent, their performance in strategic gameplay was not as effective as I had hoped.
I noticed that the models, including GPT-3, often struggled to grasp the strategic depth required for higher-level Tic-tac-toe play. Although there was a noticeable improvement in performance with the GPT-4 model, it also had its limitations. 

Looking forward, I am considering the possibility of training my own models specifically tailored for Tic-tac-toe. _When i find the time :)_

