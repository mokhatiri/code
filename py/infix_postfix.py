# infix to postfix expression
# take the expression : (1+2)+3*4+(2+3) = str : 12+34*23+++

def postfix(infix):
    sym = "^*/-+"; stack = []; Str = []; num = ""; k=0
    while k < len(infix):
        i = infix[k]
        if i.isdecimal(): num += i; k+=1; continue
        elif num != "": Str.append(int(num)); num = ""
        if i == '(': o = infix[k+1:].index(")")+1; Str+=postfix(infix[k+1:k+o]); k += o+1; continue
        if stack: last = sym.index(stack[-1])
        else: last = 1000
        if last < sym.index(i): Str.append(stack.pop())
        stack.append(i)
        k+=1
    if num != "": Str.append(int(num))
    for i in stack[::-1]: Str.append(i)

    return Str

def evaluation(postfix):
    ops = {"+" : lambda x , y: x+y , "*" : lambda x , y: x*y ,
           "/" : lambda x , y: x/y ,"-" : lambda x , y: x-y ,
           "^" : lambda x , y: x^y }
    stack = []
    for i in postfix:
        if isinstance(i,int): stack.append(i)
        else:val1 = stack.pop(); val2 = stack.pop(); stack.append(ops[i](val2,val1))
    if len(stack) != 1: raise Exception("invalid syntax")
    return stack[-1]

            
print(eval("3*(43-2)/(5)"))
print(evaluation(postfix("3*(43-2)/(5)")))
