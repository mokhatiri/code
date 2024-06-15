L = [1,2,3]

def subsets(L):
    result = [[]]
    for i in range(len(L)):
        result += [[L[i]] + subset for subset in subsets(L[i+1:])]
    return result

print(subsets(L))