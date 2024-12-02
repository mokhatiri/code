# 994. Rotting Oranges, leetcode

class Solution(object):
    def orangesRotting(self, grid):
        """
        :type grid: List[List[int]]
        :rtype: int
        """
        # let's start by making a counter to keep track of the gen
        counter = 0

        # first we need to find the rotten oranges
        # we are going to put them in a pile
        pile = set()
        for i in range(len(grid)):
            for j in range(len(grid[0])):
                if grid[i][j] == 2:
                    pile.add((i,j))

        # now let's check the new gen
        while pile:
            new_gen = set()
            for i,j in pile:
                # check the neighbors
                if i-1 >= 0 and grid[i-1][j] == 1:
                    grid[i-1][j] = 2
                    new_gen.add((i-1,j))
                if i+1 < len(grid) and grid[i+1][j] == 1:
                    grid[i+1][j] = 2
                    new_gen.add((i+1,j))
                if j-1 >= 0 and grid[i][j-1] == 1:
                    grid[i][j-1] = 2
                    new_gen.add((i,j-1))
                if j+1 < len(grid[0]) and grid[i][j+1] == 1:
                    grid[i][j+1] = 2
                    new_gen.add((i,j+1))
            pile = new_gen
            if pile: counter += 1
        
        # let's now check that all the oranges are rotten
        for i in range(len(grid)):
            for j in range(len(grid[0])):
                if grid[i][j] == 1:
                    return -1
        
        # if we made it here, then all the oranges are rotten
        return counter


grid = [[0]]
print(Solution().orangesRotting(grid))