# name: Game of life
import copy
import pygame

def NextGameOfLife(arr,dimx,dimy):
        past_state = copy.deepcopy(arr)
        for i in range(dimx):
            for j in range(dimy):
                Voi =  past_state[i][(j-1)%dimy] 
                Voi += past_state[i][(j+1)%dimy] 
                Voi += past_state[(i-1)%dimx][j] 
                Voi += past_state[(i-1)%dimx][(j-1)%dimy] 
                Voi += past_state[(i-1)%dimx][(j+1)%dimy] 
                Voi += past_state[(i+1)%dimx][j]
                Voi += past_state[(i+1)%dimx][(j-1)%dimy]
                Voi += past_state[(i+1)%dimx][(j+1)%dimy]
                if arr[i][j] == 1:
                    if Voi < 2 or Voi > 3:
                        arr[i][j] = 0

                else:
                    if Voi == 3:
                        arr[i][j] = 1
        return arr

def draw(surface,arr,dimx,dimy):
    for i in range(dimx):
        for j in range(dimy):
            if arr[i][j] == 1:
                pygame.draw.rect(surface,(255,255,255),(j*cellsize,i*cellsize,cellsize,cellsize))
            else:
                pygame.draw.rect(surface,(0,0,0),(j*cellsize,i*cellsize,cellsize,cellsize))

pygame.init()
dimx = 170 ;dimy = 100
cellsize = 10
surface = pygame.display.set_mode((dimx*cellsize,dimy*cellsize))
pygame.display.set_caption('Game of life')
arr = [[0]*dimy for _ in range(dimx)]
arr[3][5] = arr[4][3] = arr[4][5] = arr[5][4] = arr[5][5] = 1
while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            quit()
    surface.fill((0,0,0))
    draw(surface,arr,dimx,dimy)
    arr = NextGameOfLife(arr,dimx,dimy)
    pygame.time.delay(100)
    pygame.display.update()