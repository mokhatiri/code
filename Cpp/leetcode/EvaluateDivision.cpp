// 399. Evaluate Division
# include <vector>
# include <string>
# include <iostream>
#include <unordered_map>

using namespace std;

class Solution {
public:
    double dfs(vector<vector<double>> adj_list, int start, int end, double val = 1, vector<bool> visited = {}) {
        if (start == end) {
            return val;
        }
        
        visited[start] = true;
        for (int i = 0; i < adj_list.size(); i++) {
            if (visited[i] == false) {
                if (adj_list[start][i] != 0){                 
                    double res = dfs(adj_list, i, end, val * adj_list[start][i], visited);
                    if (res != -1) {
                        return res;
                    }
                }
            }
        }
        return -1;
    }

    vector<double> calcEquation(vector<vector<string>>& equations, vector<double>& values, vector<vector<string>>& queries) {

        // let's start by making a hash_maper
        // and an adjacency list
        // the hash_maper will map every string to an int
        unordered_map<string, int> hash_map;
        int count = 0;

        for (int i = 0; i < equations.size(); i++) {
            string s1 = equations[i][0];
            string s2 = equations[i][1];
            // if not found
            if (hash_map.find(s1) == hash_map.end()) {
                hash_map[s1] = count;
                count++;
            }
            if (hash_map.find(s2) == hash_map.end()) {
                hash_map[s2] = count;
                count++;
            }
        }

        // now let's make the adjacency list
        vector<vector<double>> adj_list(count, vector<double>(count, 0));
        for (int i = 0; i < equations.size(); i++) {
            int s1 = hash_map[equations[i][0]];
            int s2 = hash_map[equations[i][1]];

            adj_list[s1][s2] = values[i];
            adj_list[s2][s1] = 1 / values[i];
        }

        // now let's make the queries
        vector<double> res;
        for (int i = 0; i < queries.size(); i++) {
            string s1 = queries[i][0];
            string s2 = queries[i][1];
            if (hash_map.find(s1) == hash_map.end() || hash_map.find(s2) == hash_map.end()) {
                res.push_back(-1);
            }
            else {
                int s1_index = hash_map[s1];
                int s2_index = hash_map[s2];
                vector<bool> visited(count, false);
                double ans = dfs(adj_list, s1_index, s2_index, 1, visited);
                res.push_back(ans);
            }
        }
    }
};