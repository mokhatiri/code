# 63. Unique Paths II

class Solution(object):
    def uniquePathsWithObstacles(self, obstacleGrid):
        """
        :type obstacleGrid: List[List[int]]
        :rtype: int
        """
        if not obstacleGrid or not obstacleGrid[0]:
            return 0
        for i in range(len(obstacleGrid)-1,-1,-1):
            for j in range(len(obstacleGrid[0])-1,-1,-1):
                if obstacleGrid[i][j] == 1:
                    obstacleGrid[i][j] = 0
                else:
                    if i == len(obstacleGrid)-1 and j == len(obstacleGrid[0])-1:
                        obstacleGrid[i][j] = 1
                    elif i == len(obstacleGrid)-1:
                        obstacleGrid[i][j] = obstacleGrid[i][j+1]
                    elif j == len(obstacleGrid[0])-1:
                        obstacleGrid[i][j] = obstacleGrid[i+1][j]
                    else:
                        obstacleGrid[i][j] = obstacleGrid[i+1][j] + obstacleGrid[i][j+1]
        print(obstacleGrid)
        return obstacleGrid[0][0]

sol = Solution()
print(sol.uniquePathsWithObstacles([[0,0],[1,1],[0,0]]))