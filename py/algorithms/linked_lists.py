class node:
    def __init__(self, value):
        self.value = value
        self.next = None

    def link(self, node):
        self.next = node

    def val(self):
        return self.value

class linked_list:
    def __init__(self):
        self.length = 0
        self.tail = node(None)
        self.head = self.tail

    def linkAppend(self, value):
        next = node(value)
        self.head.link(next)
        self.head = next
        self.length += 1

    def get(self, index):
        val = self.tail
        if self.length > index:
            for _ in range(0,index+((index<0)*self.length)+1):
                val = val.next
            return val
        else:
            raise IndexError
    
    def delete(self, index):
        if index != 0:
            prev = self.get(index-1)
            prev.next = prev.next.next
        else:
            self.tail = self.tail.next
        self.length -= 1

    def read(self, index):
        return self.get(index).val()

    def appendlist(self, list):
        for i in list:
            self.linkAppend(i)

    def __str__(self):
        ret_str = ""
        val = self.tail.next
        for _ in range(self.length):
            ret_str += f"{val.val()},"
            val = val.next
        ret_str = '[' + ret_str[:-1] + ']'
        return ret_str

med = linked_list()
med.appendlist([3,4,2,5,2,5])
print(med)
med.delete(-1)
print(med)