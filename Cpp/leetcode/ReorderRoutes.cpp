// 1466. Reorder Routes to Make All Paths Lead to the City Zero
# include <iostream>
# include <vector>
# include <unordered_set>
# include <queue>

using namespace std;

// first solution

// class Solution {
// public:
//     int minReorder(int n, vector<vector<int>>& connections) {

//         // using bfs
//         int count = 0;  
//         vector<int> visited(n, 0); 
//         vector<vector<int>> graph(n, vector<int>(0, 0));
//         vector<unordered_set<int>> toward(n, unordered_set<int>());
//         queue<int> next;
        
//         for(vector<int>& connection : connections) {
//             // the sender
//             graph[connection[0]].push_back(connection[1]);

//             // the receiver
//             toward[connection[1]].insert(connection[0]); 
//             graph[connection[1]].push_back(connection[0]); 
//         }

//         // bfs traversal
//         next.push(0);
//         while(!next.empty()){
//             int current = next.front();
//             next.pop(); 
//             visited[current] = 1; 

//             // check all edges 
//             for(int next_node : graph[current]) {
//                 if(visited[next_node]) continue; 
//                 if(toward[current].find(next_node) == toward[current].end()) count++; 
//                 next.push(next_node); 
//             }   
//         }

//         return count; 
//     }
// };


// second solution

class Solution {
public:
    
    int dfs(vector<vector<unsigned int>> &adj_list, vector<bool> &visited , int from) {
        int count = 0;
        visited[from] = true;
        // recursion is a stack operation

        for (int to : adj_list[from]) if(!visited[to]) count += dfs(adj_list, visited, to) + (to > 0);
        return count;        
    }

    int minReorder(int n, vector<vector<int>>& connections) {
        vector<vector<unsigned int>> adjacency_list(n);

        for (auto &c : connections) {
            adjacency_list[c[0]].push_back(c[1]);
            adjacency_list[c[1]].push_back(-c[0]);
        }

        vector<bool> visited(n);
        return dfs(adjacency_list, visited, 0);
    }
};