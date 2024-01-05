# Tic-tac-~~toe~~AI

Tic-tac-AI is an enhanced Tic-tac-toe game that utilizes AI and Game Theory to enhance your gaming experience. 
I started this project to explore the performance of OpenAI's models in games. Over the course of the development process,  
I also dived into Game Theory, learning about power  learnt about game theory
and powerful algorithms like Minimax. 

# Preview
**Live Demo:  https://example.com**

<Demo Video Here>

# Features
## 1. Multiple Board Sizes
Ever played a Tic-tac-toe on a 4x4 board? Well now you can!  
Tic-tac-AI comes with 3x3, 4x4, and 5x5 boards!

## 2. Multi Player Mode

Play against friends in local multiplayer mode. Enjoy the timeless experience of competing with someone sitting right next to you.

## 3. Single Player Mode
Challenge yourself against computer opponents with varying levels of difficulty:

* **Easy**: The computer player uses a random algorithm to simulate moves, providing a straightforward and beginner-friendly opponent.

* **Medium**: Utilizes OpenAI text-generation models to make intelligent and context-aware moves, creating a more challenging adversary.

* **Hard**: Implements the Minimax algorithm with alpha-beta pruning optimization, offering a highly strategic and formidable opponent.


# Minimax + Alpha Beta Prunning 
Lorem

# Open AI 
Lorem

# Technologies
* React.js
* FastAPI
* OpenAI
* TailwindCSS

# Run the project locally
## Server  - Fast API
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

## Client - React
Ensure the backend server is already up and running. 

**Set environment variables:**  
Rename `env.local.example` file to `.env.local`
* VITE_GPT_MODEL

By default this variable is set to **gpt-3.5-turbo-1106** you may want to experiment with other 
models.


Navigate to the `/client` directory and run the following commands.

```bash
npm install
npm run dev
```


You're welcome!

# Analysis & Conclusion

Lorem