# 207. Course Schedule

class Solution(object):
    def canFinish(self, numCourses, prerequisites):
        """
        :type numCourses: int
        :type prerequisites: List[List[int]]
        :rtype: bool
        """
        # this is basically a graph problem where each course number is a node
        # the question can be translated to finding loops in this graph simply

        # create an adjacency list
        adjList = {}

        # populate the adjacency list and check for loops
        for course, prereq in prerequisites:
            if course not in adjList:
                adjList[course] = []
            if prereq in adjList:
                if prereq in adjList[course]:
                    return False
            adjList[course].append(prereq)

        # check for loops
        alreadyVisited = set()
        for course in adjList:
            if course not in alreadyVisited:
                check = self.dft(course,adjList,alreadyVisited,set())
                if not check:
                    return False

        return True

    def dft(self,course, adjList, alreadyVisited, recurStack):

        if course in recurStack:
            return False
        if course in alreadyVisited:
            return True

        alreadyVisited.add(course)
        recurStack.add(course)


        if course in adjList:       
            print("here",course)
            for prereq in adjList[course]:
                if not self.dft(prereq,adjList,alreadyVisited,recurStack):
                    return False
        
        recurStack.remove(course)
        return True


            
prereequisites = [[0,1],[0,2],[1,2]]
numCourses = 3
print(Solution().canFinish(numCourses,prereequisites))