import math
def function(n):
    return math.log2(n)/(n**2+1)

def series(m):
    sum=0
    for i in range(1,m+1):
        sum+=function(i)
    return sum

n = input("Enter the value of n: ")
print(series(int(n)))