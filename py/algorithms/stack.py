import sys
class MinStack(object):

    def __init__(self):
        self.min = [sys.maxsize]
        self.elements = []

    def push(self, val):
        """
        :type val: int
        :rtype: None
        """
        self.elements.append(val)
        if val <= self.min[-1]:
            self.min.append(val)

    def pop(self):
        """
        :rtype: None
        """
        if self.elements[-1] == self.min[-1]:
            self.min.pop()
        self.elements.pop()

    def top(self):
        """
        :rtype: int
        """
        if len(self.elements) > 0:   
            return self.elements[-1]
        else:
            raise LookupError

    def getMin(self):
        """
        :rtype: int
        """
        if len(self.elements) > 0:
            return self.min[-1]
        else:
            raise LookupError

minStack = MinStack()
print(minStack.push(-2))
print(minStack.push(0))
print(minStack.push(-3))
print(minStack.getMin())
print(minStack.pop())
print(minStack.top())
print(minStack.getMin())
print(minStack.elements)