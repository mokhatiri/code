# name: Game of life
import copy

def GameOfLife(arr,size,iter):

    for _ in range(iter):
        print(f"*************************")
        past_state = copy.deepcopy(arr)
        for i in range(size):
            print('|',end='')
            for j in range(size):
                Voi =  past_state[i][(j-1)%size] 
                Voi += past_state[i][(j+1)%size] 
                Voi += past_state[(i-1)%size][j] 
                Voi += past_state[(i-1)%size][(j-1)%size] 
                Voi += past_state[(i-1)%size][(j+1)%size] 
                Voi += past_state[(i+1)%size][j]
                Voi += past_state[(i+1)%size][(j-1)%size]
                Voi += past_state[(i+1)%size][(j+1)%size]
                if arr[i][j] == 1:
                    if Voi < 2 or Voi > 3:
                        arr[i][j] = 0

                else:
                    if Voi == 3:
                        arr[i][j] = 1
                print("LMMMJ" if arr[i][j] else "     ",end = '')
            print('|')
            print()
size = 10
iter = 40
arr = [[0]*size for _ in range(size)]

arr[3][5] = arr[4][3] = arr[4][5] = arr[5][4] = arr[5][5] = 1
print(f"********************")
for i in arr:
    print('|',end ='')
    for j in i:
        print("LMMMJ" if j else "     ",end = '')
    print('|')
    print()
GameOfLife(arr,size,iter)