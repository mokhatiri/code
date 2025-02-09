# 1091. Shortest Path in Binary Matrix

class Solution(object):
    def shortestPathBinaryMatrix(self, grid):
        """
        :type grid: List[List[int]]
        :rtype: int
        """
        # let's start from the upper left corner
        pile = set()
        pile.add((0,0,1))
        if grid[0][0] == 1:
            return -1
        
        # now we check each adjacent corner from each element in the pile
        while pile:
            new_pile = set()
            for x,y,d in pile:

                # if am at the right bottom corner
                if x == len(grid)-1 and y == len(grid)-1:
                    return d
                
                # check each possible dirrection
                for i,j in [(x+1,y+1),(x+1,y),(x+1,y-1),(x,y+1),(x,y-1),(x-1,y+1),(x-1,y),(x-1,y-1)]:
                    if 0 <= i < len(grid) and 0 <= j < len(grid) and grid[i][j] == 0:
                        
                        # mark the cell as visited to not create loops and since
                        # if there exits another path throught the cell it will be longer than the current paths
                        grid[i][j] = 1

                        # add the new position
                        new_pile.add((i,j,d+1)) 

            # replace the old visited guys
            pile = new_pile
        
        # if we are here it means that there is no path
        # we couldn't satisfy the condition  x == len(grid)-1 and y == len(grid)-1
        return -1

# check
grid = [[1,0,0],[1,1,0],[1,1,0]]
print(Solution().shortestPathBinaryMatrix(grid))