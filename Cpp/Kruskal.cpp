#include <iostream>
#include <vector>
#include <algorithm>
#include <unordered_map>

using namespace std;

int find(unordered_map<int, int>& M, int x);
void Union(unordered_map<int,int>& M ,int x, int y);

vector<vector<int>> kruskal(vector<vector<int>> graph){
    vector<vector<int>> mst;
    unordered_map<int,int> parent;
    // sort the graph by wieght the third element.
    sort(graph.begin(), graph.end(), [](const vector<int>& a, const vector<int>& b) {
        return a[2] < b[2];
    });

    for(vector<int> links : graph){
        int edge1 = links[0];
        int edge2 = links[1];
        // we dont case about the weight as we already have the graph sorted
        int parent1 = find(parent, edge1);
        int parent2 = find(parent, edge2);
        // if they have different parents;
        if(parent1 != parent2){
            mst.push_back(links);
            // unify the two sets
            Union(parent, parent1, parent2);
        }
        // if not do nothing
    }

    return mst;
}

int find(unordered_map<int,int>& M, int x){
    if (M.find(x) == M.end()) {
        M[x] = x;
        return x;
    }
    if(M[x] == x){
        return x;
    }
    return find(M, M[x]);
}

void Union(unordered_map<int,int>&M ,int x, int y){
    int xset = find(M, x);
    int yset = find(M, y);
    M[xset] = yset;
}

int main(){
    // using the notation : node1, node2, weight
    vector<vector<int>> graph = {{0,1,1},{0,2,2},{1,2,3},{1,3,4},{2,3,5},{3,4,6},{4,5,7},{3,5,8},{4,6,9},{5,6,10}};
    vector<vector<int>> mst = kruskal(graph);
    for(int i = 0; i < mst.size(); i++){
        cout << mst[i][0] << " " << mst[i][1] << " " << mst[i][2] << endl;
    }
    return 0;
}