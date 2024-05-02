"""
let's make a heap making algo
in this one we will use the [father,[child_1],[child_2]]
"""

def make_heap(arr):
    # first let's make the array to a binary tree if possible
    # this will be using the 2n+1 and 2n+2 representations and transform it to this representation    
    new_arr = to_tree(arr)
    reallocate_down(new_arr)

def reallocate_down(arr):
    ...

def to_tree(arr,index = 0):
    father = arr[index]

    if(2*index+1)< len(arr) : right_child = to_tree(arr,index = 2*index+1)
    else : right_child = None
    if(2*index+2)< len(arr) : left_child = to_tree(arr,index = 2*index+2)
    else : left_child = None

    return [father,right_child,left_child]

