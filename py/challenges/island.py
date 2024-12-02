# island finder
# class Solution(object):
#     def numIslands(self, grid):
#         """
#         :type grid: List[List[str]]
#         :rtype: int
#         """
#         return self.finder(grid)

#     def finder(self,grid):
#         searched = []
#         j = 0
#         for i in range(len(grid)):
#             for k in range(len(grid[0])):
#                 if grid[i][k] == "1" and (i,k) not in searched:
#                     searched__ = [(i,k)] + self.DFS(grid,i,k,[(i,k)])
#                     searched += searched__
#                     j+=1

#         return j,

#     def DFS(self,grid,i,k,searched):
#         new_searched = []
#         print(i,k)
#         if (i+1,k) not in searched + new_searched and i+1 < len(grid) and grid[i+1][k] == "1":
#             new_searched += [(i+1,k)]
#             new_searched += self.DFS(grid, i+1,k,searched + new_searched)
#         if (i,k+1) not in searched + new_searched and k+1 < len(grid[0]) and grid[i][k+1] == "1":
#             new_searched += [(i,k+1)]
#             new_searched += self.DFS(grid, i,k+1,searched + new_searched)
#         if (i-1,k) not in searched + new_searched and i-1 >= 0 and grid[i-1][k] == "1":
#             new_searched += [(i-1,k)]
#             new_searched += self.DFS(grid, i-1,k,searched + new_searched)
#         if (i,k-1) not in searched + new_searched and k-1 >= 0 and grid[i][k-1] == "1":
#             new_searched += [(i,k-1)]
#             new_searched += self.DFS(grid, i,k-1,searched + new_searched)
        
#         return new_searched
    
    # def numislands(self,grid):

    #     island_count = 0
    #     land_coordinate_set = set()

    #     if len(grid) == 0 or len(grid[0]) == 0:
    #         return island_count
        
    #     row = 0
    #     while row < len(grid):
    #         col = 0
    #         while col < len(grid[0]):

    #             if grid[row][col] == "1" and not (row, col) in land_coordinate_set:
                    
    #                 island_count += 1
    #                 new_land_coordinate_set = set()

    #                 new_land_coordinate_set.add((row, col))
    #                 self.check_land(new_land_coordinate_set, grid, row, col -1)
    #                 self.check_land(new_land_coordinate_set, grid, row, col +1)
    #                 self.check_land(new_land_coordinate_set, grid, row -1, col)
    #                 self.check_land(new_land_coordinate_set, grid, row +1, col)

    #                 print(new_land_coordinate_set,row,col,len(new_land_coordinate_set))

    #                 for i in new_land_coordinate_set:
    #                     land_coordinate_set.add(i)

    #             col += 1
    #         row += 1
        
    #     return island_count
        
    # def check_land(self, land_coordinate_set, grid, row, col):

    #     if row < 0 or row >= len(grid) or col < 0 or col >= len(grid[0]):
    #         return
        
    #     if grid[row][col] == "1" and not (row, col) in land_coordinate_set:
    #         land_coordinate_set.add((row, col))

    #         self.check_land(land_coordinate_set, grid, row, col - 1)
    #         self.check_land(land_coordinate_set, grid, row, col + 1)
    #         self.check_land(land_coordinate_set, grid, row - 1, col)
    #         self.check_land(land_coordinate_set, grid, row + 1, col)

    #     else:
    #         return

class Solution(object):
    def maxAreaOfIsland(self, grid):
        """
        :type grid: List[List[int]]
        :rtype: int
        """
        island_max = 0
        land_coordinate_set = set()

        if len(grid) == 0 or len(grid[0]) == 0:
            return island_max
        
        row = 0
        while row < len(grid):
            col = 0
            while col < len(grid[0]):
                if grid[row][col] == "1" and not (row, col) in land_coordinate_set:
                    land_coordinate_set.add((row, col))
                    count = 1
                    count += self.check_land(land_coordinate_set, grid, row, col -1)
                    count += self.check_land(land_coordinate_set, grid, row, col +1)
                    count += self.check_land(land_coordinate_set, grid, row -1, col)
                    count += self.check_land(land_coordinate_set, grid, row +1, col)
                    print(count)
                    if count > island_max: island_max = count
                col += 1
            row += 1
        
        return island_max
        
    def check_land(self, land_coordinate_set, grid, row, col):
        count = 0

        if row < 0 or row >= len(grid) or col < 0 or col >= len(grid[0]):
            return 0
        
        if grid[row][col] == "1" and not (row, col) in land_coordinate_set:
            land_coordinate_set.add((row, col))
            count += 1

            count += self.check_land(land_coordinate_set, grid, row, col - 1)
            count += self.check_land(land_coordinate_set, grid, row, col + 1)
            count += self.check_land(land_coordinate_set, grid, row - 1, col)
            count += self.check_land(land_coordinate_set, grid, row + 1, col)

        return count
    
# grid = [
#   ["1","1","0","0","0","0"],
#   ["1","1","0","0","0","0"],
#   ["0","0","1","0","0","0"],
#   ["0","0","0","1","1","0"],
#   ["0","0","0","1","0","1"]
#   ]

grid = [[0,0,1,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,0,0,0,1,1,1,0,0,0],
        [0,1,1,0,1,0,0,0,0,0,0,0,0],
        [0,1,0,0,1,1,0,0,1,0,1,0,0],
        [0,1,0,0,1,1,0,0,1,1,1,0,0],
        [0,0,0,0,0,0,0,0,0,0,1,0,0],
        [0,0,0,0,0,0,0,1,1,1,0,0,0],
        [0,0,0,0,0,0,0,1,1,0,0,0,0]
        ]

sol = Solution()
print(sol.maxAreaOfIsland(grid))
