// 547. Number of Provinces
#include <iostream>
#include <vector>
#include <stack>
#include <queue>

using namespace std;

class Solution {
public:
    // solution 1
    int findCircleNum1(vector<vector<int>>& isConnected) {
        // this is again a simple dfs problem
        // under the connected graphs category
        stack<unsigned int> S;

        unsigned int n = isConnected.size();
        vector<bool> visited(n, false);
        unsigned int count = 0;

        for (unsigned int i = 0; i < n; i++) {
            if (!visited[i]){
                S.push(i);

                while (!S.empty()) {
                    unsigned int cur = S.top();
                    S.pop();
                    visited[cur] = true;
                    for (unsigned int j = 0; j < n; j++) {
                        if (isConnected[cur][j] && !visited[j]) {
                            S.push(j);
                        }
                    }
                }
                count++;
            }
        }
    }

    // solution 2
    int findCircleNum2(vector<vector<int>>& isConnected) {
        // this is again a simple bfs problem
        // under the connected graphs category
        queue<unsigned int> Q;

        unsigned int n = isConnected.size();
        vector<bool> visited(n, false);
        unsigned int count = 0; 

        for (unsigned int i = 0; i < n; i++) {
            if (!visited[i]){
                Q.push(i);
                while (!Q.empty()) {
                    unsigned int cur = Q.front();
                    Q.pop();
                    visited[cur] = true;
                    for (unsigned int j = 0; j < n; j++) {
                        if (isConnected[cur][j] && !visited[j]) {
                            Q.push(j);
                        }
                    }
                }
                count++;
            }
        }
        return count;
    }
};