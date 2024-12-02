class Solution(object):
    def isValid(self, s):
        """
        :type s: str
        :rtype: bool
        """
        stack = [] 
        for i in s:
            if i == '(':
                stack.append(1)
            elif i == '[':
                stack.append(2)
            elif i == '{':
                stack.append(3)
            if len(stack) > 0:
                if i == ')':
                    if stack[-1] == 1:
                        stack.pop(-1)
                    else:
                        return False
                elif i == ']':
                    if stack[-1] == 2:
                        stack.pop(-1)
                    else:
                        return False
                elif i == '}':
                    if stack[-1] == 3:
                        stack.pop(-1)
                    else:
                        return False
            else:
                return False
        if len(stack) == 0:
            return True
        else:
            return False

            
        
