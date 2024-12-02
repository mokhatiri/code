// in this code i am going to make a maze using multiple ways
// 1. randomized dfs
// 2. randomized kruskal
// 3. randomized prims
// 4. randomized wilson
// 5. randomized aldous broder
// 6. randomized hunt and kill
// 7. randomized binary tree
// 8. randomized sidewinder
// 9. randomized recursive backtracker
// 10. randomized growing tree
// 11. randomized growing tree with walls
// 12. randomized growing tree with walls and corridors
// 13. randomized growing tree with walls and corridors and rooms

#include <iostream>
#include <vector>
#include <random>
#include <stack>
#include <ctime>

using namespace std;

// this will be used to free the memory of the array
void freeArray(int **array, int n) {
    // Free each row
    for (int i = 0; i < n; i++) {
        delete[] array[i];
    }

    // Free the row pointers
    delete[] array;
}

// Randomized Depth-First Search Maze Generator
int** RDFS(int n, int m) {
    int **maze = new int*[n]; // 0 = wall, 1 = path
    bool **visited = new bool*[n]; // 0 = wall, 1 = path

    for(int i = 0; i < n; i++) {
        maze[i] = new int[m];
        visited[i] = new bool[m];

        for(int j = 0; j < m; j++) {
            maze[i][j] = 0;
            visited[i][j] = false;
        }
    }

    maze[0][0] = 1; // Start at (0, 0)
    visited[0][0] = true; // Start at (0, 0)

    mt19937 gen(static_cast<unsigned int>(time(0))); // Seed with current time

    stack<pair<int, int>> s;
    s.push({0, 0});           // Start DFS from (0, 0)
    int x = 0, y = 0;
    bool end = false;
    pair<int, int> endCords;

    while (!s.empty()) {
        pair<int, int> p = s.top();
        s.pop();
        x = p.first;
        y = p.second;

        vector<pair<int, int>> neighbors;
        vector<pair<int, int>> directions = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

        // Find unvisited neighbors
        for (auto V : directions) {
            int dx = V.first;
            int dy = V.second;
            int nx = x + dx, ny = y + dy;
            if (nx >= 0 && ny >= 0 && nx < n && ny < m && !visited[nx][ny]) {
                neighbors.push_back({nx, ny});
                visited[nx][ny] = true;
            }
        }

        if (!neighbors.empty()) {
            // Push current cell back to stack to allow backtracking
            s.push(p);

            // Choose a random neighbor to connect
            uniform_int_distribution<> dis(0, neighbors.size() - 1);
            uniform_int_distribution<> dis1(0, 3);

            // change this number for more or less paths
            auto next = neighbors[dis(gen)];
            s.push(next);
            if(!dis1(gen)) {
                auto next1 = neighbors[dis(gen)];
                s.push(next1);
            }

        }


        else {
            // If no unvisited neighbors, backtrack
            visited[x][y] = true;
            if (end) maze[x][y] = 2;
            else{
                endCords = {x, y};
                end = true;
            }
        }
    }

    maze[endCords.first][endCords.second] = 3;
    maze[0][0] = 1;

    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            cout << (visited[i][j] ? 1:0) << " ";
        }
        cout << endl;
    }
    cout << endl;
    // Free the memory allocated for the visited array
    for (int i = 0; i < n; i++) {
        delete[] visited[i];
    }
    delete[] visited;

    return maze;
}


// Randomized Kruskal's Algorithm Maze Generator

// Test the function
int main() {
    int n = 50, m = 50;

    int **maze = RDFS(n, m);

    // Print the generated maze
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            cout << maze[i][j] << " ";
        }
        cout << endl;
    }

    // Free the memory allocated for the maze
    freeArray(maze, n);

    return 0;
}