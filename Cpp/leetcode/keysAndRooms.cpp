// 841. Keys and Rooms
#include <iostream>
#include <vector>
#include <stack>

using namespace std;

class Solution {
public:
    bool canVisitAllRooms(std::vector<std::vector<int>>& rooms) {
        // we start at position "0"
        stack<unsigned int> S;
        S.push(0);

        unsigned int count = rooms.size();
        vector<bool> visited(rooms.size(), false);

        while(!S.empty() and count > 0) {            
            unsigned int current = S.top();
            S.pop();
            if(!visited[current]){
                visited[current] = true;

                // push all the rooms that are connected to the current room
                for(unsigned int i = 0; i < rooms[current].size(); i++){
                    S.push(rooms[current][i]);
                }

                // lower the count
                count--;
            }
        }

        if (count == 0) {
            return true;
        }
        return false;
    }
};


int main(){
    vector<vector<int>> rooms = {{1,3},{3,0,1},{2},{0}};
    Solution s;
    cout << s.canVisitAllRooms(rooms);

    return 0;
}