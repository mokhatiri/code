from time import time

def fast_exponentiation(a,n):

    # the stopping condition is the n == 0
    if n == 0:
        return 1

    # we calculate the exponential of z = (a*a)^k where k is n//2,
    #   if the rest of this division is 1 the result is the product z*a
    #   else we simply return z
    if n % 2 == 1:
        return a * fast_exponentiation(a * a , n//2)
    else:
        return fast_exponentiation(a * a , n//2)

def count_digits(n):

    # counting the digits of n is determining the highest power of 10 needed in the making of n 
    #   simply devise by 10 until you get 0
    a = n // 10
    
    if n%10 != 0:
        return count_digits(a) + 1
    else:
        return 0 # the end is when 0 is hit

def reverse_digits(n, result = 0):


    if n//10 != 0:
        return reverse_digits(n//10, 10*(n%10+ result))

    else:
        return result + n%10

def is_divisible_by_three( X , sum = 0):

    # to know if a number is divisible by 3, we must know if the sum of his numbers is divisible by 3
    #   this would be translated to summing the results of the division by 10
    if X == 0 and (sum == 3 or sum == 6 or sum == 9 or sum == 0):
        return True

    elif X == 0 and sum // 10 == 0:
        return False

    if X == 0:
        return is_divisible_by_three(sum)

    else:
        return is_divisible_by_three( X//10 , sum + X%10)

def are_amicable(X, Y, n = 1, A = 0 , B = 0):
    if A == Y and B == X:
        return True
    elif A <= Y and B <= X:
        return are_amicable(X,Y,n+1,A+(X%n==0)*n,B+(Y%n==0)*n)   
    else:
        return False

def towers_of_hanoi(n, source = 'source', target = 'target', auxiliary = 'auxiliary'):
    if n==1:
        print (f"Move disk {n} from {source} to {target}")
    else:
        towers_of_hanoi(n-1, source, auxiliary, target)
        print( f"Move disk {n} from {source} to {target}")
        towers_of_hanoi(n-1, auxiliary, target, source)

def zero_dichotomy(a, b, epsilon, f = 'x**3 - x + 1'):
    fa = eval(f, {'x' : a})
    fb = eval(f, {'x' : b})
    c = a + (b-a)/2
    fc = eval(f, {'x' : c})
    if fc == 0:
        return c
    elif fa*fc < 0:
        if abs(fa-fc) > epsilon:
            return zero_dichotomy(a, c, epsilon, f)
        else:
            return c
    elif fb*fc < 0:
        if abs(fb-fc) > epsilon:
            return zero_dichotomy(c, b, epsilon, f)
        else:
            return c
    else:
        # this will only be possible if the given fa and fb have the same sign and fc too
        print('dichotomy is not possible, f(a) and f(b) must have different signs')