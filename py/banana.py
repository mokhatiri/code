# Koko loves to eat bananas. There are n piles of bananas, the ith pile has piles[i] bananas. The guards have gone and will come back in h hours.

# Koko can decide her bananas-per-hour eating speed of k. Each hour, she chooses some pile of bananas and eats k bananas from that pile.
# If the pile has less than k bananas, she eats all of them instead and will not eat any more bananas during this hour.

# Koko likes to eat slowly but still wants to finish eating all the bananas before the guards return.

# Return the minimum integer k such that she can eat all the bananas within h hours.

# Example 1:

# Input: piles = [3,6,7,11], h = 8
# Output: 4
# Example 2:

# Input: piles = [30,11,23,4,20], h = 5
# Output: 30
# Example 3:

# Input: piles = [30,11,23,4,20], h = 6
# Output: 23

# piles =
# [312884470]
# h =
# 312884469
# output = 2
from math import ceil, floor

def eating_bananas(piles, h):
    return findmin_(max(piles),floor(sum(piles)/h),piles,h)

def findmin_(max,min,pile,h):
    if max <= min:
        return max
    if min == 0:
        min = 1
    mid_point = ceil((max+min)/2)
    time = 0
    max_time = 0
    for value in pile:
        time += ceil(value/mid_point)
        max_time += ceil(value/min)

    if time > h:
        return findmin_(max,mid_point+1,pile,h)
    
    if max_time > h:
        return findmin_(mid_point,min+1,pile,h)

    if time == h or max_time <= h:
        return min


print(eating_bananas([3,6,7,11], 8))
print(eating_bananas([30,11,23,4,20],5))
print(eating_bananas([30,11,23,4,20], 6))

# this works but needs a lot more work to make it efficient
# reminder : code not full product