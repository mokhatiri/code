class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def level_traversal(T):
    L = []
    queue = [(T,0)]
    while queue:
        if len(L) < queue[0][1]+1: L.append([])
        L[queue[0][1]].append(queue[0][0].val)
        if queue[0][0].left: queue.append((queue[0][0].left,queue[0][1]+1))
        if queue[0][0].right: queue.append((queue[0][0].right,queue[0][1]+1))
        queue.pop(0)
    return L

def right_side_view(T):
    result = []
    L = []
    P = [T]

    while P:
        if P[0].left: L.append(P[0].left)
        if P[0].right: L.append(P[0].right)
        if len(P) == 1:
            result.append(P[0].val)
            P = L[:]
            L = []
        else: P.pop(0)
    
    return result

root = TreeNode(1)
root.left = TreeNode(2)
root.right = TreeNode(3)
root.left.left = TreeNode(4)
root.left.right = TreeNode(5)
root.right.right = TreeNode(6)

print(level_traversal(root))
print(right_side_view(root))
