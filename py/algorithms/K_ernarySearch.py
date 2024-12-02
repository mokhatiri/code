# K-ary search
# a generalization of binary search

def K_ernarySearch(List, key, K):
    if len(List) == 0:
        return -1
    if len(List) == 1:
        if List[0] == key:
            return 0
        else:
            return -1
        
    # we divide the List into K parts
    # we search in the first part then the second part and so on
    # if we find the key in one of the parts, we return the index
    # if we don't find the key in any of the parts, we return -1
    # we do this recursively
    Divisions = [i*len(List)//K for i in range(K)]
    for i in range(K):

        if key >= List[Divisions[i]] and key < List[Divisions[i+1]]:
            if i == K-1:
                res = K_ernarySearch(List[Divisions[i]:], key, K)
                if res == -1:
                    continue
                else:
                    return res + Divisions[i]
            
            res =  K_ernarySearch(List[Divisions[i]:Divisions[i+1]], key, K)
            if res == -1:
                continue
            else:
                return res + Divisions[i]

    return -1

# example:
List = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
key = 5
print(K_ernarySearch(List, key, 3))