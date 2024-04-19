def removeval(nums, val):
    """
    :type nums: List[int]
    :rtype: int
    """
    num_c = []
    for i in nums:
        if i != val:
            num_c += [i]
    nums [:] = num_c[:]

L= [1,1,2,4]

removeval(L,1)

print(L)
