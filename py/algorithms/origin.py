import ctypes 
class DynamicArray:
    def __init__(self):
        self._n = 0
        self._c = 1
        self._A = self._Make_Array(self._c)

    def _Make_Array(self, c):
        return (c * ctypes.py_object)()
    
    def __len__(self):
        return self._n
    
    def __getitem__(self, k): 
        if not 0 <= k < self._n: 
            raise IndexError('index out of range')
        return self._A[k]

    def _resize(self, c, flag = False):
        # to be able to resize to less memory turn on the flag
        if c > self._c or flag == True:
            B = self._Make_Array(c)
            for i in range(self._n):
                B[i] = self._A[i]
            self._A = B
            self._c = c
        else:
            raise ValueError('using less capacity may result in loss of information')

    def append(self, obj):
        if self._n == self._c:
            self._resize(self._c*2)
        self._A[self._n] = obj
        self._n += 1

    def __str__(self):
        ret = "["
        for i in range(self._n):
            ret += f"({self._A[i]})"
        ret += "]"
        return ret
"""
var = DynamicArray()
var.append("hi")
var.append("hello")
var.append("joe")
print(var)
"""