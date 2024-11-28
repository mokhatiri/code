# problem: make an allgorithm that finds the biggest complete graph in a graph

# examples:
V = [1, 2, 3, 4, 5]
E = [(1,2), (2,3), (3,1), (1,4), (2,4), (3,4), (5,1)]

# we are going to be using the following algorithm:
# first approach is a brute force approach

def find_biggest(V,E):
    E_ = [(min(i),max(i)) for i in E]
    E_.sort(key = lambda x: x[0])
    print(E_)
    return find_biggest_complete_graph0(V,E)


# to complete later since trying to make it better
def find_biggest_complete_graph0(V,E):
    # first we need to create a map of the graph
    
    Max = 0
    biggest = []
    ToCheck = {}
    element = E[0][0]
    E_ = []
    V_ = []
    for couple in E:
        for liker in ToCheck:
            if(couple[1] in ToCheck[liker][1]):
                E_.append(couple)
        if(couple[0] == element):
            V_.append(couple[1])
        else:
            ToCheck[element] = (E_,V_)
            E_ = []
            V_ = []
            element = couple[0]
        
    return (Max,biggest)
        
print(find_biggest(V,E))