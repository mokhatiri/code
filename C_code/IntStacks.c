// this is an int_stack; the values inside are of type int
// changes will be made the arrays in here are all going to be changed to dynamic
#include <stdio.h>
#include <stdlib.h>
#include <assert.h>
#include <stdbool.h>

typedef struct {

    int size;
    int capacity;
    int *value;

} MyStack;


MyStack* myStackCreate() {

    MyStack* stack = malloc(sizeof(MyStack));
    stack->size = 0; // this will always keep track of the size
    stack->capacity = 1; // according to the implementation
    
    int* values = malloc(sizeof(int));// tip case 1 : here in a different implementation you can give any maximum size you want, in mind of the maximum value possibly used
    stack->value = values;

    return stack;
}

void myStackPush(MyStack* obj, int x) {
    
    int C = obj->capacity;
    int S = obj->size;

    if(C == S){ // if tip case 1 is used, this will change according to the implementation choice, checking if the capacity is hit will stay always crucial
        obj->value = realloc(obj->value, 2*C*sizeof(int));
        obj->capacity *= 2;
    }

    obj->value[obj->size++] = x;
    
}

int myStackPop(MyStack* obj) {
 
    int C = obj->capacity;
    int S = obj->size;

    if(C == 4*(S-1)){ // in case of tip case 1, this will not be needed
        obj->value = realloc(obj->value, C/2*sizeof(int));
        obj->capacity = C/2;
    }

    if (S) return obj->value[--obj->size];
    else return NULL;
}

int myStackTop(MyStack* obj) {
    return obj->value[obj->size-1];
}


bool myStackEmpty(MyStack* obj) {
    return !(obj->size);
}

void myStackFree(MyStack* obj) {
    free(obj->value);
    free(obj);
}

void MyStackPrint(MyStack* obj) {
    printf("[");
    for(int i = 0; i<obj->size;i++){
        printf("%d,",obj->value[i]);
    }
    printf("]\n");
}

int main(){

    MyStack* obj = myStackCreate();
    myStackPush(obj, 5);
    myStackPush(obj, 6);

    
    MyStackPrint(obj);
    int param_2 = myStackPop(obj);
    printf("%d\n",param_2);
    MyStackPrint(obj);
    
    int param_3 = myStackTop(obj);
    printf("%d\n",param_3);
    
    bool param_4 = myStackEmpty(obj);
    printf("%s\n", param_4 ? "false" : "true");
    
    myStackFree(obj);
}