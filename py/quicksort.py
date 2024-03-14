def find(L, k, start=0, end=-1):
    if end == -1:
        end = len(L) - 1

    if start <= end:
        pivot_index = partition(L, start, end)

        if pivot_index == k:
            return L[k]
        elif pivot_index < k:
            return find(L, k, pivot_index + 1, end)
        else:
            return find(L, k, start, pivot_index - 1)

def partition(L, start, end):
    pivot_index = (start + end) // 2
    pivot = L[pivot_index]

    i = start
    j = end

    while i <= j:
        while L[i] < pivot:
            i += 1
        while L[j] > pivot:
            j -= 1
        if i <= j:
            L[i], L[j] = L[j], L[i]
            i += 1
            j -= 1

    return i - 1

def main():
    L = [1, 0, 2, 1]
    k = 3
    print(find(L, k))

if __name__ == '__main__':
    main()
