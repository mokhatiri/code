# from heapq import _heapify_max,_heappop_max,_siftdown_max
# L = [7,6,7,6,9]

# def stones(stones):
#     _heapify_max(stones)
#     while len(stones) > 1:
#         print(stones)
#         val = abs(_heappop_max(stones) - _heappop_max(stones))
#         if val:
#             stones.append(val)
#             _siftdown_max(stones, 0, len(stones)-1)
#     return _heappop_max(stones)

# print(stones(L))