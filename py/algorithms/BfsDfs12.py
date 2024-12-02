def Bfs11(A,element):
    # this will print the path to the element
    # without recursion
    queue = [A]
    while queue != [] and queue[0][0] != element:
        if queue[0][1] != None: queue.append(queue[0][1])
        if queue[0][2] != None: queue.append(queue[0][2])
        print(queue.pop(0)[0])
    
    if queue == []:
        return 'not found'
    return 'found'

def Bfs12(A,element,queue = [], k = 0):
    # with recursion
    if k == 0: return Bfs12(A,element,[A],1)

    if queue == []:
        return 'not found'
    if queue[0][0] == element : 
        return 'found'

    if queue[0][1] != None: queue.append(queue[0][1])
    if queue[0][2] != None: queue.append(queue[0][2])
    print(queue.pop(0)[0])

    return Bfs12(A,element,queue,1)

def Bfs2(B,element):
    # this will print the index of the element
    queue = [0]
    while queue != [] and B[queue[0]] != element:
        if 2*queue[0]+1 < len(B) and B[2*queue[0]+1] != None: queue.append(2*queue[0]+1)
        if 2*queue[0]+2 < len(B) and B[2*queue[0]+2] != None: queue.append(2*queue[0]+2)
        print(B[queue.pop(0)])
    
    if queue == []:
        return 'not found'
    return f'found at index : {queue[0]}'

def Dfs11(A,element,depth = 0):
    # this will print the path to the element
    L = []
    h = 'not found'

    print(A[0])
    if A[0] == element:
        return 'found', depth

    if A[1] != None: 
        V = Dfs11(A[1],element, depth+1)
        if V != h:
            L.append(V[-1])

    if A[2] != None:
        V = Dfs11(A[2],element, depth+1)
        if V != h:
            L.append(V[-1])
    
    if L != [] :
        return 'found',sorted(L)[0]
    return h

def Dfs12(A,element):
    # without recursion using stack, a lot of memory is used
    stack = [A]
    while stack != [] and stack[-1][0] != element:
        cur = stack.pop()
        print(cur[0])
        if cur[2] != None: stack.append(cur[2])
        if cur[1] != None: stack.append(cur[1])

    if stack == []:
        return 'not found'
    return 'found'

def Dfs2(B,element):
    # this will print the index of the element
    stack = [0]
    while stack != [] and B[stack[-1]] != element:
        cur = stack.pop()
        print(B[cur], cur)
        if 2*cur+2 < len(B) and B[2*cur+2] != None: stack.append(2*cur+2)
        if 2*cur+1 < len(B) and B[2*cur+1] != None: stack.append(2*cur+1)
    
    if stack == []:
        return 'not found'
    return f'found at index : {stack[-1]}'

A = [ 7,
        [ 4,
            [ 2, [ 1, None, None ],
                 [ 3, None, None ] 
            ],
            [ 5, None, 
                 [ 6, None, None ] 
            ] 
        ],
        [ 10,
            [ 8, None,
                 [ 9, None, None ] 
            ],
            [ 12, [ 11, None, None ],
                  [ 13, None, None ] 
            ] 
        ]
    ]

B = [ 7, 4, 10, 2, 5, 8, 12, 1, 3, None, 6, None, 9, 11, 13]
