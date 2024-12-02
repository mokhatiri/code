def MS(L1,L2):
    # Name : MS
    # Desc : a function to sort two ascending lists
    # Parameters : list L1 , list L2 - already ascending-sorted lists
    # Return : a sorted merge of the two lists
    merged_list = []  # the return variable
    i = 0
    j = 0
    while i < len(L1) and j < len(L2):  # iterating through the elements of L1
        if L1[i] < L2[j]:
            merged_list += [L1[i]]
            i += 1
            print(i,"+i")
        elif L1[i] > L2[j]:
            merged_list += [L2[j]]
            j += 1
            print(j, "+j")
        else:
            merged_list += [L1[i],L2[j]]
            i += 1
            j += 1
            print(i,j,"+ij")
    if i < len(L1) and j >= len(L2):
        print(i,'all i')
        merged_list += L1[i:]
    elif i >= len(L1) and j < len(L2):
        print(j,'all j')
        merged_list += L2[j:]
    print('fin')
    return merged_list

print(MS([1,2,3,4],[1,2,3,4]))
