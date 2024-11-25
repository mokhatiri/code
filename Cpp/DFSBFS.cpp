#include <vector>
#include <stack>
#include <queue>
#include <iostream>
using namespace std;

// Suppose a matrix of size n*m
int n = 5;
int m = 6;
vector<vector<int>> matrix(n, vector<int>(m, 0));

// Initialize matrix with predefined values
void initMatrix() {
    matrix = {
        {0, 0, 0, 0, 0, 0},
        {0, 1, 0, 1, 1, 0},
        {0, 0, 1, 3, 1, 0},
        {0, 1, 1, 0, 1, 0},
        {0, 0, 0, 0, 1, 0}
    };
}

// Visualize the matrix
void visualise(const vector<vector<int>>& matrix) {
    for (int i = 0; i < matrix.size(); i++) {
        for (int j = 0; j < matrix[i].size(); j++) {
            cout << matrix[i][j] << " ";
        }
        cout << endl;
    }
    cout << "***************" << endl;
}

// DFS function
void dfs(vector<vector<int>>& matrix, int n, int m) {
    stack<pair<int, int>> S;

    if (matrix.empty()) return;

    S.push({0, 0});
    vector<vector<int>> C = matrix;

    while (!S.empty()) {
        pair<int, int> P = S.top();
        S.pop();

        int i = P.first;
        int j = P.second;

        if (i >= 0 && j >= 0 && i < n && j < m) {  // Ensure within bounds
            if (C[i][j] == 3) {  // Check for target
                cout << "Success!" << endl;
                return;
            }
            if (C[i][j] == 0) {
                C[i][j] = 2;  // Mark as visited
                visualise(C); // Visualize after marking

                // Push neighbors
                S.push({i + 1, j});
                S.push({i - 1, j});
                S.push({i, j + 1});
                S.push({i, j - 1});
            }
        }
    }
}

// BFS function
void bfs(vector<vector<int>>& matrix, int n, int m) {
    queue<pair<int, int>> Q;

    if (matrix.empty()) return;

    Q.push({0, 0});
    vector<vector<int>> C = matrix;

    while (!Q.empty()) {
        pair<int, int> P = Q.front();
        Q.pop();

        int i = P.first;
        int j = P.second;

        if (i >= 0 && j >= 0 && i < n && j < m) {  // Ensure within bounds
            if (C[i][j] == 3) {  // Check for target
                cout << "Success!" << endl;
                return;
            }
            if (C[i][j] == 0) {
                C[i][j] = 2;  // Mark as visited
                visualise(C); // Visualize after marking

                // Push neighbors
                Q.push({i + 1, j});
                Q.push({i - 1, j});
                Q.push({i, j + 1});
                Q.push({i, j - 1});
            }
        }
    }
}



int main() {
    initMatrix();
    bfs(matrix, n, m);  // Start BFS from the top-left corner (0, 0)
    return 0;
}
