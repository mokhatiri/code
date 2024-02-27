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

print(pascals_triangle(5))