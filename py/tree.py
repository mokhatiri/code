import turtle
from math import *

t = turtle.Turtle()

t.speed(0)
t.hideturtle()

def drawLine(x, y, x1, y1):
    # this will draw a line from position (x,y) to (x1,y1)
    t.up()
    t.goto(x, y)
    t.down()
    t.goto(x1, y1)
    t.up()


def tree(x, y, r, angle = 90, max_depth = 7):
        
    cte_angle = 30 # to change angle update
    cte_r = 0.7 # to change length update
    
    max_depth -=1 

    if max_depth < 0: return

    # Calculate positions for the next point
    x1 = x - cos(radians(angle)) * r
    y1 = y + sin(radians(angle)) * r

    # the drawing of the line to the next point
    drawLine(x, y, x1, y1)

    # this will make the right and the left trees
    tree(x1, y1, r *cte_r, angle + cte_angle,max_depth) # the angle gets bigger
    tree(x1, y1, r *cte_r, angle - cte_angle,max_depth) # ... gets smaller

tree(-50, -350, 200, max_depth=8)
# the coordinates -50, -350 are used to make it shown in the screen
# 200 is the initial length
# depth : 8

turtle.mainloop()