// name: parenthesis_check
#include <stdbool.h>
#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <assert.h>

bool isValid(char* s) {
    int i = 0, pointer = 0;
    int *stack = malloc(strlen(s) * sizeof(int));
    assert(stack);
    // OR:
    // if (stack == NULL) {
    //     perror("Memory allocation failed");
    //     exit(EXIT_FAILURE);
    // }

    while(s[i]!=0){
        if (s[i] == '('){
            stack[pointer] = 1;
            pointer ++;
        }else if (s[i] == '['){
            stack[pointer] = 2;
            pointer ++;
        }else if (s[i] == '{'){
            stack[pointer] = 3;
            pointer ++;
        }else if (pointer > 0){
            if (s[i] == ')'){
                if (stack[pointer-1] == 1){
                    pointer --;
                }else goto out;
            }if (s[i] == ']'){
                if (stack[pointer-1] == 2){
                    pointer --;
                }else goto out;
            }if (s[i] == '}'){
                if (stack[pointer-1] == 3){
                    pointer --;
                }else goto out;
            }
        }else goto out;
        i++;
    }
    if (pointer == 0){
        free(stack);
        return true; 
    }else goto out;

out:
    free(stack);
    return false;
}
int main(){
    char *s = "{[]}[]{}[[(){({})}]]";

    if(isValid(s)){
        printf("correct");
    }
    else{
        printf("Wrong");
    }
}