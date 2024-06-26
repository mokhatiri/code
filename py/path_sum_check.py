class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

# Example usage
root = TreeNode(5)
root.left = TreeNode(4)
root.right = TreeNode(8)
root.left.left = TreeNode(11)
root.left.left.left = TreeNode(7)
root.left.left.right = TreeNode(2)
root.right.left = TreeNode(13)
root.right.right = TreeNode(4)
root.right.right.right = TreeNode(1)

target = 22

def path_sum(T, target):
    if T:
        return path_sum(T.right, target - T.val) or path_sum(T.left, target - T.val)
    elif target == 0:
        return True
    else:
        return False
    
print(path_sum(root, target))  # True