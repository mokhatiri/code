#include <stdio.h>
#include <stdlib.h>
#include <ctype.h>  // Include ctype.h for isdigit function

int calPoints(char **operations, int operationsSize) {
    int *record[1000];
    int pointer = 0;
    int sum = 0;

    for (int i = 0; i < operationsSize; i++)
    {
        char *c = operations[i];
        char op = *c;

        if (isdigit(op) || (op == '-' && isdigit(*(c + 1))))
        {
            record[pointer] = malloc(sizeof(int));
            // just a good thing to do
            if (record[pointer] == NULL) {
                printf("Memory allocation failed");
                exit(EXIT_FAILURE);
            }
            
            *record[pointer] = atoi(c + (op == '-' ? 1 : 0));
            
            if (op == '-') {
                *record[pointer] *= -1;
            }
            
            pointer++;
        }

        else if (op == 'D')
        {
            record[pointer] = malloc(sizeof(int));
            if (record[pointer] == NULL) {
                printf("Memory allocation failed");
                exit(EXIT_FAILURE);
            }
            *record[pointer] = *record[pointer - 1] * 2;
            pointer++;
        }

        else if (op == '+')
        {
            record[pointer] = malloc(sizeof(int));
            if (record[pointer] == NULL) {
                printf("Memory allocation failed");
                exit(EXIT_FAILURE);
            }
            *record[pointer] = *record[pointer - 1] + *record[pointer - 2];
            pointer++;
        }

        else
        {
            free(record[pointer - 1]);
            pointer--;
        }
    }

    for (int k = 0; k < pointer; k++)
    {
        sum += *record[k];
        printf("%d\n",sum);
        free(record[k]);
    }

    return sum;
}

int main()
{
    char *operations[] = {"5", "-2", "D", "C", "+"};
    int sum = calPoints(operations, 5);
    printf("%d\n", sum);
    return 0;
}
