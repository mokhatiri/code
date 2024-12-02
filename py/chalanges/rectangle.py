def main():
    print(fill_rectangle(*get_input()))

def get_input():
    x = str(input("size (x,y) : "))
    n = x.strip().split(',')
    filling = input("filling:")
    return int(n[0]),int(n[1]),filling

def fill_rectangle(m,n,k):
    str = ""
    str += (k * m + '\n')*n
    return str

main()