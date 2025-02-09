# still needs change

from random import randint
def next(GameState):
    move = None
    while not move:
        move = input("move: ")
        if move == "esc":
            return 1
        elif move == "z": #up
            move = 1
        elif move == "s": #down
            move = 2
        elif move == "q": #left
            move = 3
        elif move == "d": #right
                move = 4
        else:
            print("invalid move")
            move = None 


    if move == 3:
        for i in range(len(GameState)):
            Move(GameState,i)
        print("done 3") 

    if move == 4:
        for i in range(len(GameState)):
            Move(GameState,i,key = 1)
        print("done 4")
    
    if move == 1:
        for i in range(len(GameState)):
            Vmove(GameState,i)
        print("done 1")

    if move == 2:
        for i in range(len(GameState)):
            Vmove(GameState,i,key = 1)
        print("done 2")

    for i in GameState:
        print(i)

    if sum([i.count(0) for i in GameState]) == 0:
        return 1
    
def Vmove(state,j,key = 0):
    
    init_len = len(state[0])
    Vstate = [state[i][j] for i in range(len(state))]

    Move([Vstate],0,key = key)
    
    for i in range(len(state)):
        state[i][j] = Vstate[i]

def Move(state,j,key=0):

    init_len = len(state[j])
    i = 0

    while i < len(state[j])-1:
        if state[j][i] == 0:
            state[j].pop(i)
            i -= 1 

        if i!= -1:
            if len(state[j]) > 1 and state[j][i] == state[j][i+1]:
                state[j].pop(i)
                state[j][i] *= 2
        
        i += 1

    if state[j][-1] == 0: state[j].pop(-1)

    while len(S := state[j]) < init_len:
        if key == 0: S.append(0)
        else: S.insert(0,0)
    
    return state

def GameOn():

    GameState = [[0,0,0,0],
               [0,0,0,0],
               [0,0,0,0],
               [0,0,0,0]]
    
    while not (in_ := 0):  
        
        a = randint(0,3)
        b = randint(0,3)
        while GameState[a][b] != 0:
            a = randint(0,3)
            b = randint(0,3)

        GameState[a][b] = [2,4][randint(0,1)]

        in_ = next(GameState)


    print("game over")

GameOn()