# this is a file for the functions predefined
from typing import Union


# fun functions
def greet(name: str) -> None:
    """
    name : greet
    desc : This function greets the given name in the console
    parameters : name - string
    Return : None
    """
    print(f"hello {name}, how are you?")


def fill_rectangle(m: int, n: int, k: str) -> str:
    """
    name : fill_rectangle
    desc : This function fills a rectangle with k character repeated m times horizontally and n times vertically.
    parameters : integer - lines , integer - rows , string - filling
    Return : string - A rectangle filled with k character repeated m times horizontally and n times vertically.
    """
    if not (isinstance(m, int) and isinstance(n, int) and isinstance(k, str)):
        raise TypeError("All arguments should be of correct data types")
    String = ""
    String += (k * m + "\n") * n
    return String

def combinations_coins(L , collection, fixed= [], __combinations = []):
    # to determine the combinations that a coin has to be made by a collection
    # we seperate them to combinations with the existance of the first element and without him
    if L == 0 :
        return [__combinations + fixed]
    elif L < 0 :
        return __combinations
    elif collection == []:
        return __combinations
    else: 
        value1 = combinations_coins(L-collection[0],collection[1:],fixed + [collection[0]],__combinations) 
        value2 = combinations_coins(L,collection[1:],fixed,__combinations=__combinations)
        return value1 + value2

def pascals_triangle(rows, printing = False):

    matrix = [[1]]
    result_rows = []

    for i in range(1,rows):

        new_list = [1,1]
        
        for j in range(1,i):
        
            new_element = matrix[i-1][j-1] + matrix[i-1][j]
            new_list.insert(j,new_element)
        
        matrix.append(new_list)

    # printing

    if printing:
        max_row = "" 
        for x in matrix[-1]:
            max_row += " " + str(x)
        max_width = len(max_row)


        for i in range(rows):
            row_str = "" 
            for x in matrix[i]:
                row_str += " " + str(x)
            space_difference = (max_width - len(row_str))
            space_len = space_difference //2 
            result_rows.append(" " * space_len + row_str)

        result_str = "\n".join(result_rows)
        print(result_str)

    return matrix

pascals_triangle(10,True)

# _T interactions
def my_sum(*iteratble: int | float | list[int | float]) -> int | float:
    """
    name : my_sum
    desc : This function returns the sum of all elements in an iterable object.
    parameters : iterable - any iterable object (list, tuple etc.)
    Return : int/float - The sum of all elements in the iterable object.
    """
    result = 0.0
    if len(iteratble) == 1 and isinstance(iteratble[0], list):
        result = arg_sum(*iteratble[0])
    else:
        result = arg_sum(*iteratble)
    return result

def arg_sum(*args : *tuple[int | float | list[int | float]]) -> int | float :
    """
    name : arg_sum
    desc : This function returns the sum of all elements in an argument list.
    parameters : args - variable number of arguments
    Return : int/float - The sum of all elements in the argument list.
    """
    result = 0.0
    for value in args:
        if not isinstance(value, (int, float)):
            raise TypeError("arg_sum: Input must be an iterator of integers or floats.")
        result = (
            result + value if isinstance(result, type(value)) else float(result) + value
        )
    return result

def factorial(integer: int) -> int:
    
    """
    name : factorial
    desc : This function calculates the factorial of a number and returns it.
    parameters : integer - positive integer
    Return : int - Factorial of the input integer
    """
    if integer < 0:
        raise ValueError("Factorial is undefined for negative numbers.")
    else:
        fact = 1
        if integer == 1:
            return 1
        else:
            return integer * factorial(integer - 1)


# strings interactions
def reverse_value(string: str) -> str:
    """
    name : reverse_value
    desc : This function reverses the order of characters in a string and returns it.
    parameters : string - input string
    Return : string - Reversed string
    """
    return string[::-1]


# input interactions
def multi_input(iterations: int, question: str) -> list:
    """
    name : multi_input
    desc : This function takes multiple inputs from user and returns them.
    parameters : iterations - Number of times to take input from user, question - question to ask the user
    Return : list - List containing the multiple inputs taken by the user
    """
    inputs = []
    print(question)
    for i in range(iterations):
        user_input = input()
        inputs.append(user_input)
    return inputs


# variable interactions
def swap(a, b) -> None:
    """
    name : swap
    desc : This function swaps two variables
    parameters : a & b - Variables whose values need to be swapped
    Return : None
    """
    temp = a
    a = b
    b = temp


def MS(L: list, start1: int, end1: int, start2: int, end2: int) -> None:
    """
    Name : MS
    Desc : a function to sort two ascending parts of a list
    Parameters : list L , starting index start1 & start2 , ending index end1 & end2
    Return : None
    """
    left_index = start1
    right_index = start2
    temp_index = start1
    temp_list = L[:]

    while left_index <= end1 and right_index <= end2:
        if temp_list[left_index] <= temp_list[right_index]:
            L[temp_index] = temp_list[left_index]
            left_index += 1
        else:
            L[temp_index] = temp_list[right_index]
            right_index += 1
        if temp_index != end1:
            temp_index += 1
        else:
            temp_index = start2

    while left_index <= end1:
        L[temp_index] = temp_list[left_index]
        left_index += 1
        temp_index += 1


def merge_sort(L: list, start: int = 0, end: int = -1000) -> None:
    """
    Name : sorting
    Desc : A recursive function that sorts a list from a start to an end
    Parameters : list L - unsorted list , a : starting point, b : end point
    Return : None
    """
    if end == -1000:
        end = len(L) - 1

    if start < end:
        midpoint = (start + end) // 2
        merge_sort(L, start=start, end=midpoint)
        merge_sort(L, start=midpoint + 1, end=end)
        MS(L, start1=start, end1=midpoint, start2=midpoint + 1, end2=end)


def swap_index(L: list, indx1: int, indx2: int) -> None:
    """
    Name : swap_index
    Desc : Swaps the elements at indices index1 and index2 in list L
    Parameters : List L , Indices index1 and index2
    Returns : None
    """
    temp = L[indx1]
    L[indx1] = L[indx2]
    L[indx2] = temp

def QS(L: list, start: int, end: int)  -> int:
    """
    Name : QS
    Desc : QuickSort Function
    Parameters : List L , Starting Index Start , Ending Index End
    Return : Pivot Point Index
    """
    pivot = end
    right_index = start
    left_index = start
    while right_index <= pivot:
        if L[right_index] <= L[pivot]:
            swap_index(L,right_index,left_index)
            left_index += 1
        right_index += 1
    pivot = left_index -1

    return pivot

def quick_sort(L: list, start: int = 0, end: int = -1000) ->  None:
    """
    Name : quick_sort
    Desc : A recursive function that sorts a list from a start to an end using the Quick Sort algorithm
    Parameters : list L - unsorted list , start : starting point, end : end point
    Return : None
    """
    if end == -1000:
        end = len(L) - 1

    if start < end:
        pivot = QS(L,start,end)
        quick_sort(L,start,pivot-1)
        quick_sort(L,pivot+1,end)

def get_List(*numbers , sep : str = '\'') -> list:
    """
    Name : get_list
    Desc : Takes any number of arguments and returns them as a list
    Parameters : Any Number of Arguments
    Return : List with all the input parameters
    """
    List = [x for x in numbers]
    return List

def findMin_args(*iterable : int | float) -> int | float:
    """
    Name : findMin
    Desc : Finds the minimum value in iterable
    Parameters : Iterable Object
    Return : Minimum Value in Iterable
    """
    minVal = float('inf')
    for i in iterable:
        if i < minVal:
            minVal = i

    return minVal

def findMax_args(*iterable: int | float) -> int | float:
    """
    Name : findMax
    Desc : Finds the maximum value in iterable
    Parameters : Iterable Object
    Return : Maximum Value in Iterable
    """
    maxVal = float('-inf')
    for i in iterable:
        if i > maxVal:
            maxVal = i
    
    return maxVal


def comptAvg(Iterable : list) -> int | float:
    """
    Name : comptAvg
    Desc : Computes the average of an iterable object
    Parameters : Iterable Object
    Return : Average of Iterable
    """
    sum = 0
    count = 0
    for i in Iterable:
        sum += i
        count += 1
        avg = sum / count
    return avg

def writer(file, txt: str) -> None:
    """
    Name : writer
    Desc : Writes a string to file
    Parameters : File Path and Text String
    Return : None
    """
    file_a = open(file,'a')
    file_a.write(txt)
    file_a.close()

if __name__ == '__main__':
    ...
    