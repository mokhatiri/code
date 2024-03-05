#include <stdio.h>
#include <stdlib.h>
#include <assert.h>
#include <ctype.h>  // Include ctype.h for isdigit function

int calPoints(char **operations, int operationsSize) {
    int *record = malloc(sizeof(int)*1000);
    assert(record);
    int pointer = 0;
    int sum = 0;

    for (int i = 0; i < operationsSize; i++)
    {
        char *c = operations[i];
        char op = *c;

        if (isdigit(op) || (op == '-' && isdigit(*(c + 1))))
        {
            
            record[pointer] = atoi(c + (op == '-' ? 1 : 0));
            if (op == '-') {
                record[pointer] *= -1;
            }
            pointer++;
        }

        else if (op == 'D')
        {
            
            record[pointer] = record[pointer - 1] * 2;
            pointer++;
        }

        else if (op == '+')
        {
            record[pointer] = record[pointer - 1] + record[pointer - 2];
            pointer++;
        }

        else if (op == 'C')
        {
            pointer--;
        }
    }
    printf("the record is : [ ");
    for (int k = 0; k < pointer; k++)
    {
        sum += record[k];
        printf("%d,",record[k]);
    }
    printf("]\n");
    free(record);
    return sum;
}

int main()
{
    char *operations[] = {"5", "-2", "D", "C", "+"};
    int sum = calPoints(operations, 5);
    printf("%d\n", sum);
    return 0;
}
