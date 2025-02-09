import copy
import pygame

def get_neighbors(past_state, x, y, dimx, dimy):
    """Calculate the number of alive neighbors around the cell at (x, y)."""
    neighbors = 0
    for i in range(-1, 2):
        for j in range(-1, 2):
            if i == 0 and j == 0:
                continue  # Skip the cell itself
            neighbors += past_state[(x + i) % dimx][(y + j) % dimy]
    return neighbors

def next_game_of_life(arr, dimx, dimy):
    """Update the game board based on Conway's Game of Life rules."""
    past_state = copy.deepcopy(arr)
    for i in range(dimx):
        for j in range(dimy):
            neighbors = get_neighbors(past_state, i, j, dimx, dimy)
            if arr[i][j] == 1:
                if neighbors < 2 or neighbors > 3:
                    arr[i][j] = 0  # Cell dies
            else:
                if neighbors == 3:
                    arr[i][j] = 1  # Cell becomes alive
    return arr

def draw(surface, arr, dimx, dimy, cellsize):
    """Draw the current state of the board."""
    for i in range(dimx):
        for j in range(dimy):
            color = (255, 255, 255) if arr[i][j] == 1 else (0, 0, 0)
            pygame.draw.rect(surface, color, (j * cellsize, i * cellsize, cellsize, cellsize))
            # Draw a grid line (optional, for better visibility)
            pygame.draw.rect(surface, (50, 50, 50), (j * cellsize, i * cellsize, cellsize, cellsize), 1)

def handle_mouse_input(arr, dimx, dimy, cellsize):
    """Toggle the state of a cell based on mouse click position."""
    mouse_x, mouse_y = pygame.mouse.get_pos()
    # Calculate which cell was clicked
    cell_x = mouse_y // cellsize
    cell_y = mouse_x // cellsize
    
    if 0 <= cell_x < dimx and 0 <= cell_y < dimy:
        arr[cell_x][cell_y] = 1 - arr[cell_x][cell_y]  # Toggle the cell state (0 -> 1 or 1 -> 0)

def main():
    pygame.init()
    
    # Constants
    cellsize = 10  # Adjust the size of each cell
    dimx, dimy = 60, 100  # Number of rows and columns
    
    # Ensure the screen size matches the grid size
    screen_size = (dimy * cellsize, dimx * cellsize)  # Width, Height based on number of cells and cell size
    
    # Set up display
    surface = pygame.display.set_mode(screen_size)
    pygame.display.set_caption('Game of Life')
    
    # Initial game state (Glider)
    arr = [[0] * dimy for _ in range(dimx)]
    
    # Set up clock for frame rate control
    clock = pygame.time.Clock()
    fps = 10  # Adjust frame rate as needed
    
    running = True
    paused = False  # Pause flag
    
    while running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            elif event.type == pygame.KEYDOWN:
                if event.key == pygame.K_SPACE:  # Spacebar to pause/resume the game
                    paused = not paused
            elif event.type == pygame.MOUSEBUTTONDOWN:
                if paused:  # Allow cell editing only when paused
                    handle_mouse_input(arr, dimx, dimy, cellsize)
        
        if not paused:
            # Update game state if not paused
            arr = next_game_of_life(arr, dimx, dimy)
        
        # Draw everything
        surface.fill((0, 0, 0))  # Clear screen
        draw(surface, arr, dimx, dimy, cellsize)
        
        pygame.display.update()
        
        # Control frame rate
        clock.tick(fps)
    
    pygame.quit()

if __name__ == "__main__":
    main()
