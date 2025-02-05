// 1926. Nearest Exit from Entrance in Maze
# include <iostream>
# include <vector>
# include <queue>

using namespace std;

class Solution {
public:
    int nearestExit(vector<vector<char>>& maze, vector<int>& entrance) {
        // this is a simpl bfs problem traversing the maze throught "."
        // and finding the shortest path to the exit

        // according to the rules a person can only move in 4 directions
        // up down left right
        
        queue<pair<int, int>> q;
        q.push({entrance[0],entrance[1]});
		
        int count = 1;
        int m = maze.size();
        int n = maze[0].size();
        
        // the direction array (up down right left)
        vector<vector<int>> directions ={{0,1},{1,0},{0,-1},{-1,0}};
		
        
        maze[entrance[0]][entrance[1]]='+';

        while(!q.empty()) {
            
            int L = q.size();
			
            for(int k=0;k<L;k++) {
                int x = q.front().first;
                int y = q.front().second;
                q.pop();
				
                for(int l=0;l<4;l++)
                {
                    int new_x = x + directions[l][0];
                    int new_y = y + directions[l][1];
					
                    if(new_x<0 || new_y<0 || new_x>=m || new_y>=n || maze[new_x][new_y]=='+')
                        continue;
					
                    if(new_x==0 || new_y==0 || new_x==m-1 || new_y==n-1)
                        return count;
					
                    maze[new_x][new_y]='+';
                    q.push({new_x,new_y});
                }
            }
			
            count++;
            
        }
        return -1;
    }
};