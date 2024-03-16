def p(tree):
    Ans = []
    if tree[1] != None : Ans+=p(tree[1])
    Ans.append(tree[0])
    if tree[2] != None : Ans+=p(tree[2])

    return Ans

def makeTree(L):
    L.sort()
    if L == []: return None
    return [L[len(L)//2],makeTree(L[:len(L)//2]),makeTree(L[len(L)//2 +1:])]

tree= [7,[4,[2,[1,None,None],[3,None,None]],[6,[5,None,None],None]],[10,[8,None,[9,None,None]],[12,[11,None,None],[13,None,None]]]]
print(p(tree))

L = [1,4,7,2,7,2,9,19,2,5]
print(p(makeTree(L)))