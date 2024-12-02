#include <iostream>
#include <array>
using namespace std;

class Game {
public:
    int gameboard[3][3] = {0};
    int timer = 1;

    void curr() {
        for (int i = 0; i < 3; i++) {
            cout << gameboard[i][0] << "|" << gameboard[i][1] << "|" << gameboard[i][2] << '\n';
            if (i < 2) cout << "-|-|-" << '\n';
        }
    }

    void move(int player, int positionx, int positiony) {
        if (gameboard[positionx][positiony] == 0)
            gameboard[positionx][positiony] = player;
        else
            cout << "Position already taken. Try again.\n";
    }

    int end(int board[3][3]) {
        for (int i = 0; i < 3; i++) {
            if (board[i][0] == board[i][1] && board[i][1] == board[i][2] && board[i][0] != 0)
                return board[i][0];
            if (board[0][i] == board[1][i] && board[1][i] == board[2][i] && board[0][i] != 0)
                return board[0][i];
        }

        if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != 0)
            return board[0][0];
        if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] != 0)
            return board[0][2];

        bool isDraw = true;
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                if (board[i][j] == 0) {
                    isDraw = false;
                    break;
                }
            }
        }
        return isDraw ? 2 : 0;
    }

    array<int, 2> ai() {
        int bestScore = 2;
        array<int, 2> bestMove;

        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                if (gameboard[i][j] == 0) {
                    gameboard[i][j] = -1;
                    int score = minimax(gameboard, true);
                    gameboard[i][j] = 0;

                    if (score < bestScore) {
                        bestScore = score;
                        bestMove = {i, j};
                    }
                }
            }
        }
        return bestMove;
    }

    int minimax(int board[3][3], bool isMaximizing) {
        int result = end(board);
        if (result != 0) {
            if (result == 1) return 1;
            if (result == -1) return -1;
            return 0;
        }

        if (isMaximizing) {
            int bestScore = -2;
            for (int i = 0; i < 3; i++) {
                for (int j = 0; j < 3; j++) {
                    if (board[i][j] == 0) {
                        board[i][j] = 1;
                        int score = minimax(board, false);
                        board[i][j] = 0;
                        bestScore = max(score, bestScore);
                    }
                }
            }
            return bestScore;
        } else {
            int bestScore = 2;
            for (int i = 0; i < 3; i++) {
                for (int j = 0; j < 3; j++) {
                    if (board[i][j] == 0) {
                        board[i][j] = -1;
                        int score = minimax(board, true);
                        board[i][j] = 0;
                        bestScore = min(score, bestScore);
                    }
                }
            }
            return bestScore;
        }
    }

    void play() {
        int player, positionx, positiony;

        while (true) {
            cout << "*************************\n";
            cout << "Current board position:\n";
            curr();

            player = (timer % 2 == 1) ? 1 : -1;
            cout << "Time for " << (player == 1 ? "X" : "O") << " to play.\n";
            cout << "Choose a move x and y (0-2 for each):\n";
            
            if (player == 1) {
                while (true) {
                    cin >> positionx >> positiony;
                    if (cin.fail() || positionx < 0 || positionx > 2 || positiony < 0 || positiony > 2) {
                        cout << "Invalid input. Please enter two integers between 0 and 2.\n";
                        cin.clear();
                        cin.ignore(10000, '\n');
                    } else {
                        break;
                    }
                }
            } else {
                array<int, 2> positions = ai();
                positionx = positions[0];
                positiony = positions[1];
            }

            if (gameboard[positionx][positiony] != 0) {
                cout << "Position already taken. Try again.\n";
                continue;
            }

            move(player, positionx, positiony);
            timer++;

            int result = end(gameboard);
            if (result == 1) {
                curr();
                cout << "X wins!\n";
                break;
            } else if (result == -1) {
                curr();
                cout << "O wins!\n";
                break;
            } else if (result == 2) {
                curr();
                cout << "It's a draw!\n";
                break;
            }
        }
    }
};

int main() {
    Game g;
    g.play();
    return 0;
}