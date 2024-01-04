def check_win(player, board):
    board_size = len(board)
    # Check rows, columns, and diagonals for a win
    for i in range(board_size):
        if all([board[i][j] == player for j in range(board_size)]) or \
                all([board[j][i] == player for j in range(board_size)]):
            return True
    if all([board[i][i] == player for i in range(board_size)]) or \
            all([board[i][board_size - 1 - i] == player for i in range(board_size)]):
        return True
    return False


def check_draw(board):
    return all([cell is not None for row in board for cell in row])


def evaluate(board):
    """
    Heuristic function to evaluate the board state.

    Scoring criteria:
    - Add points for each row, column, or diagonal with only 'X's and empty cells.
    - Subtract points for each row, column, or diagonal with only 'O's and empty cells.
    - More points are given for more 'X's or 'O's in a line.
    """
    board_size = len(board)
    score = 0
    lines = []

    # Check rows and columns
    for i in range(board_size):
        lines.append(board[i])  # row
        lines.append([board[j][i] for j in range(board_size)])  # column

    # Check diagonals
    lines.append([board[i][i] for i in range(board_size)])
    lines.append([board[i][board_size - 1 - i] for i in range(board_size)])

    for line in lines:
        x_count = line.count('X')
        o_count = line.count('O')

        if x_count == board_size:
            score += 1000  # Win for X
        elif o_count == board_size:
            score -= 1000  # Win for O
        elif x_count > 0 and o_count == 0:
            # Score positively for potential X wins
            score += 10 ** x_count
        elif o_count > 0 and x_count == 0:
            # Score negatively for potential O wins (block)
            score -= 10 ** o_count

    return score


def minimax(board, depth, alpha, beta, is_maximizing):
    """
    Minimax algorithm with alpha-beta pruning.
    """
    board_size = len(board)

    if depth == 0 or check_win('X', board) or check_win('O', board) or check_draw(board):
        return evaluate(board)

    if is_maximizing:
        best_score = -float('inf')
        for i in range(board_size):
            for j in range(board_size):
                if board[i][j] is None:
                    board[i][j] = 'X'
                    score = minimax(board, depth - 1, alpha, beta, False)
                    board[i][j] = None
                    best_score = max(score, best_score)
                    alpha = max(alpha, score)
                    if beta <= alpha:
                        break
        return best_score
    else:
        best_score = float('inf')
        for i in range(board_size):
            for j in range(board_size):
                if board[i][j] is None:
                    board[i][j] = 'O'
                    score = minimax(board, depth - 1, alpha, beta, True)
                    board[i][j] = None
                    best_score = min(score, best_score)
                    beta = min(beta, score)
                    if beta <= alpha:
                        break
        return best_score


def find_best_move(board, max_depth):
    """
    Find the best move for the AI player using the minimax algorithm.
    :param board:
    :param max_depth: Maximum depth to search in the game tree before evaluating the board state. This is necessary for large boards.
    :return: The best move as a dictionary with keys 'row' and 'col'.
    """
    best_score = float('inf')
    best_move = (-1, -1)
    for depth in range(1, max_depth + 1):
        for i in range(len(board)):
            for j in range(len(board)):
                if board[i][j] is None:
                    board[i][j] = 'O' # Assuming 'O' is the AI player and is minimizing
                    score = minimax(board, depth, -float('inf'), float('inf'), True)
                    board[i][j] = None
                    if score < best_score:
                        best_score = score
                        best_move = {'row': i, 'col': j}
    return best_move