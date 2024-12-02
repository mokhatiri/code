import turtle
from math import *

t = turtle.Turtle()

t.speed(10)
t.hideturtle()

def draw_circle(x,y,r):
    #this will draw a circle in position (x,y)
    t.up()
    t.goto(x,y)
    t.seth(0)
    t.down()
    t.circle(r)
    
def temple(x, y, r, direction = 90, max_depth=4):
    
    cte_dir = 90 # to change right and left circles tilting
    cte_r = 0.5 # to change new circles radius

    if max_depth <= 0: return

    # the drawing of the circle
    draw_circle(x, y - r, r)

    # Calculate positions for the next circles
    x1 = x + r * (cte_r+1) * cos(radians(direction))
    y1 = y + r * (cte_r+1) * sin(radians(direction))

    x2 = x + r * (cte_r+1) * cos(radians(direction - cte_dir))
    y2 = y + r * (cte_r+1) * sin(radians(direction -  cte_dir))

    x3 = x + r * (cte_r+1) * cos(radians(direction + cte_dir))
    y3 = y + r * (cte_r+1) * sin(radians(direction + cte_dir))


    # this will make the up, right, left circles
    temple(x1, y1, cte_r * r, direction, max_depth - 1)
    temple(x2, y2, cte_r * r, direction - cte_dir, max_depth - 1)
    temple(x3, y3, cte_r * r, direction + cte_dir, max_depth - 1)


temple(0, -100, 100, max_depth=5)
# the coordinates -100, 100 are used to make it shown in the screen
# 100 is the initial circles radius
# depth : 5

turtle.mainloop()