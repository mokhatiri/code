# merge Sort

def mergeSort(L : list):
    if len(L) <= 1:
        return L
    L1 = L[:len(L)//2]
    L2 = L[len(L)//2:]
    return merge(mergeSort(L1), mergeSort(L2))

def merge(L1, L2):
    # merging the two lists
    i = 0
    j = 0
    L = []
    while i < len(L1) and j < len(L2):
        if L1[i] < L2[j]:
            L.append(L1[i])
            i += 1
        else:
            L.append(L2[j])
            j += 1
    while i < len(L1):
        L.append(L1[i])
        i += 1
    while j < len(L2):
        L.append(L2[j])
        j += 1
    return L

# example
L = [3,5,2,8,3,9,2,5]

print(merge([3,4,8,19,46,67],[5,7,10,40,42,50]))
print(mergeSort(L))