"""
    this is a simple implementation of the heaps (min and max heaps) this implementation utilizes the 2n+1 and 2n+2 representations of a tree;
"""
import math

class MinHeap:
    def __init__(self):
        self.heap = []

    def heapify(self, arr):

        """Builds a heap from a given list of elements."""
        self.heap = arr[:]
        n = len(self.heap)
        # Start from the last non-leaf node and heapify each node up to the root.
        for i in range(n // 2 - 1, -1, -1):
            self._percolate_down(i)

    def _percolate_up(self, index):

        """Moves the node at index up to maintain the heap property."""
        parent_index = (index - 1) // 2
        while index > 0 and self.heap[index] < self.heap[parent_index]:
            self.heap[index], self.heap[parent_index] = self.heap[parent_index], self.heap[index]
            index = parent_index
            parent_index = (index - 1) // 2

    def _percolate_down(self, index):

        """Moves the node at index down to maintain the heap property."""
        n = len(self.heap)
        smallest = index
        left = 2 * index + 1
        right = 2 * index + 2

        if left < n and self.heap[left] < self.heap[smallest]:
            smallest = left
        if right < n and self.heap[right] < self.heap[smallest]:
            smallest = right

        if smallest != index:
            self.heap[index], self.heap[smallest] = self.heap[smallest], self.heap[index]
            self._percolate_down(smallest)

    def add(self, element):

        """Adds a new element to the heap."""
        self.heap.append(element)
        self._percolate_up(len(self.heap) - 1)

    def remove_min(self):

        """Removes the smallest element (root) from the heap and returns it."""
        if not self.heap:
            return None
        smallest = self.heap[0]
        last_item = self.heap.pop()
        if self.heap:
            self.heap[0] = last_item
            self._percolate_down(0)
        return smallest

    def heapSort(self):

        """Sorts the elements of the heap and returns them in ascending order."""
        result = []

        # We need to use a temporary copy of the heap to perform sorting without altering the original heap
        original_heap = self.heap[:]
        while self.heap:
            result.append(self.remove_min())

        self.heap = original_heap  # restore the original heap
        return result

    def __str__(self):
        return f"MinHeap: {self.heap}"
    
    def visualize(self):
        visualized = TreeVisualizer(self.heap)
        visualized.display()
    
class MaxHeap:
    def __init__(self):
        self.heap = []

    def heapify(self, arr):
        """Builds a heap from a given list of elements."""
        self.heap = arr[:]
        n = len(self.heap)
        # Start from the last non-leaf node and heapify each node up to the root.
        for i in range(n // 2 - 1, -1, -1):
            self._percolate_down(i)

    def _percolate_up(self, index):
        """Moves the node at index up to maintain the heap property."""
        parent_index = (index - 1) // 2
        while index > 0 and self.heap[index] > self.heap[parent_index]:
            self.heap[index], self.heap[parent_index] = self.heap[parent_index], self.heap[index]
            index = parent_index
            parent_index = (index - 1) // 2

    def _percolate_down(self, index):
        """Moves the node at index down to maintain the heap property."""
        n = len(self.heap)
        largest = index
        left = 2 * index + 1
        right = 2 * index + 2

        if left < n and self.heap[left] > self.heap[largest]:
            largest = left
        if right < n and self.heap[right] > self.heap[largest]:
            largest = right

        if largest != index:
            self.heap[index], self.heap[largest] = self.heap[largest], self.heap[index]
            self._percolate_down(largest)

    def add(self, element):
        """Adds a new element to the heap."""
        self.heap.append(element)
        self._percolate_up(len(self.heap) - 1)

    def remove_max(self):
        """Removes the largest element (root) from the heap and returns it."""
        if not self.heap:
            return None
        largest = self.heap[0]
        last_item = self.heap.pop()
        if self.heap:
            self.heap[0] = last_item
            self._percolate_down(0)
        return largest

    def heapSort(self):
        """Sorts the elements of the heap and returns them in descending order."""
        result = []
        # We need to use a temporary copy of the heap to perform sorting without altering the original heap
        original_heap = self.heap[:]
        while self.heap:
            result.append(self.remove_max())
        self.heap = original_heap  # restore the original heap
        return result

    def __str__(self):
        return f"MaxHeap: {self.heap}"
    
    def visualize(self):
        visualized = TreeVisualizer(self.heap)
        visualized.display()
class TreeVisualizer:
    def __init__(self, array):
        self.array = array
        self.height  = math.floor(math.log2(len(array)))
        self.digits = int(math.floor(math.log10(max(array)))//2)

    def display(self,height=0,A=3):
        C = self.digits
        B = 2*C+1
        U = (A+B)*2**(self.height-height)-B
        if(height!= self.height) : nextU = (A+B)*2**(self.height-height-1)-B
        else: nextU = 0
        i = 0 # a simple way to check wether it's the first element or not.

        if height != 0 : start = 2**(height) - 1
        else : start = 0
        if height < self.height : end = 2**(height+1) - 1 ; k = 0
        else: end = len(self.array); k = 1

        if height != 0:
            for index in range(start,end):
                number = self.array[index]
                if number!= 0 : C_r = int(C-(math.log10(number))//2); C_l = int(C-(math.log10(number))//2 - math.log10(number)%2); J = math.log10(number)
                else: C_r = C_l = C-1  ; J = 0
                if number == None :number = B*' '
                if (i != 0): print(f"{B * ' '}",end="") 
                print(f"{U * ' '}{' '*C_l}|{' '*(math.floor(J))}{' '*C_r}{' ' * U}",end='')
                i+=1
        print()
        i=0
        for index in range(start,end):
            number = self.array[index]
            if number!= 0 : C_r = int(C-(math.log10(number))//2); C_l = int(C-(math.log10(number))//2 - math.log10(number)%2)
            else: C_r = C_l = C-1
            if number == None : number = B*' '
            if (i != 0): print(f"{B * ' '}",end="")
            print(f"{(U-nextU) * ' '}{(nextU) * '_'}{' '*C_l}{self.array[index]}{' '*C_r}{'_' * (nextU)}{' ' * (U-nextU)}",end='')
            i+=1
        print()

        if k != 1: self.display(height+1)

if __name__ == "__main__":

    my_heap = MinHeap()
    arr = [4, 9, 3, 2, 5, 1, 1, 5, 6]
    my_heap.heapify(arr)
    print(my_heap)  # MinHeap: [1, 1, 2, 3, 5, 9, 4, 6, 5]
    my_heap.visualize()

    my_heap.add(0)
    print(my_heap)  # MinHeap: [0, 1, 2, 1, 5, 9, 4, 6, 5, 3]
    my_heap.visualize()

    print("Removed:", my_heap.remove_min())  # Removed: 0
    print(my_heap)  # MinHeap: [1, 1, 2, 3, 5, 9, 4, 6, 5]
    my_heap.visualize()

    sorted_array = my_heap.heapSort()
    print(sorted_array)  # [1, 1, 2, 3, 4, 5, 5, 6, 9]
    my_heap.visualize()

    my_heap1 = MaxHeap()
    my_heap1.heapify(arr)
    print(my_heap1)  # MaxHeap: [9, 6, 4, 5, 5, 3, 2, 1, 1] 
    my_heap1.visualize()

    my_heap1.add(0)
    print(my_heap1)  # MaxHeap: [9, 6, 4, 5, 5, 3, 2, 1, 1, 0] 
    my_heap1.visualize()

    print("Removed:", my_heap1.remove_max())  # Removed: 9
    print(my_heap1)  # MaxHeap: [6, 5, 4, 1, 5, 3, 2, 0, 1]
    my_heap1.visualize()

    sorted_array = my_heap1.heapSort()
    print(sorted_array)  # [6, 5, 5, 4, 3, 2, 1, 1, 0]
    my_heap1.visualize()
