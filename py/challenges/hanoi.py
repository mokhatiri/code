A = [5,4,3,2,1]; B = []; C =[]

# the logic is that to move n disks from a to c
# we need to move n-1 disks from a to b,
# then move the nth disk from a to c
# and then move n-1 disks from b to c

def hanoi(n,a,b,c):
    if n == 1:
        c.append(a.pop()) #in the case of n=1, we just move the top disk from a to c
        print(n,a,b,c,"##")
        return
    
    hanoi(n-1,a,c,b) #move n-1 disks from a to b
    print(n,a,b,c)

    c.append(a.pop()) #move the nth disk from a to c
    print(n,a,b,c)
    
    hanoi(n-1,b,a,c) #move n-1 disks from b to c
    print(n,a,b,c)

hanoi(A,B,C)
print(A,B,C)