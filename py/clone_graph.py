# 133. Clone Graph

# Definition for a Node.
class Node(object):
    def __init__(self, val = 0, neighbors = None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []
        
class Solution(object):
    def cloneGraph(self, mainNode):
        """
        :type node: Node
        :rtype: Node
        """
        # if the node is none just return 
        if not mainNode:
            return None
        
        # we will be using a hash table to keep track of the nodes we have already visited
        visited = {mainNode.val : Node(mainNode.val)} # the key is the node value since it's unique and the value is the cloned node
        
        # we will be using a queue to keep track of the nodes we need to visit
        toDoList = [mainNode]

        while toDoList:

            # get the first node in the queue to clone out of the to do list
            node = toDoList.pop(0)
            
            # now we need to link to the neighbors
            for neighbor in node.neighbors:

                # if they don't exist already clone them by putting them in the to Do list
                if neighbor.val not in visited:
                    visited[neighbor.val] = Node(neighbor.val)
                    toDoList.append(neighbor)

                # either way the links must be addes to the neighbors list
                visited[node.val].neighbors.append(visited[neighbor.val])

            # if it's checked it can't be that the neighbors are already checked

        # finally let's return the clone of the same sent guy
        return visited[mainNode.val]