#include <stdlib.h>
#include <stdio.h>
#include <assert.h>

typedef struct MinStack {
    int pointer;
    int min_pointer;
    int *array_of_values;
    int *array_of_min_value;
    size_t capacity_values;
    size_t capacity_min_values;
} MinStack;

MinStack* minStackCreate() {
    MinStack *_min_stack = malloc(sizeof(MinStack));
    assert(_min_stack);

    _min_stack->pointer = 0;
    _min_stack->min_pointer = 0;
    _min_stack->capacity_values = 10;
    _min_stack->capacity_min_values = 10;

    _min_stack->array_of_values = malloc(_min_stack->capacity_values * sizeof(int));
    assert(_min_stack->array_of_values);

    _min_stack->array_of_min_value = malloc(_min_stack->capacity_min_values * sizeof(int));
    assert(_min_stack->array_of_min_value);

    return _min_stack;
}

void minStackPush(MinStack* obj, int val) {
    if (obj->pointer >= obj->capacity_values) {
        obj->capacity_values *= 2;
        obj->array_of_values = realloc(obj->array_of_values, obj->capacity_values * sizeof(int));
        assert(obj->array_of_values);
    }
    obj->array_of_values[obj->pointer++] = val;
    if (!obj->min_pointer || val <= obj->array_of_min_value[obj->min_pointer - 1]){
        if (obj->min_pointer >= obj->capacity_min_values) {
            obj->capacity_min_values *= 2;
            obj->array_of_min_value = realloc(obj->array_of_min_value, obj->capacity_min_values * sizeof(int));
            assert(obj->array_of_min_value);
        }
        obj->array_of_min_value[obj->min_pointer++] = val;
    }
}

void minStackPop(MinStack* obj) {
    if(obj->pointer){
        if(obj->min_pointer && obj->array_of_values[obj->pointer - 1] == obj->array_of_min_value[obj->min_pointer - 1]){
            obj->min_pointer--;
        }
        obj->pointer--;
    }
    else {
        printf("error 1 , minStackPop , pointer == 0, no values in the stack");
        exit(1);
    }
}

int minStackTop(MinStack* obj) {
    if(obj->pointer){
        return obj->array_of_values[obj->pointer - 1];
    }
    else {
        printf("error 2 , minStackTop , pointer == 0, no values in the stack");
        exit(1);
    }
}

int minStackGetMin(MinStack* obj) {
    if(obj->min_pointer){
        return obj->array_of_min_value[obj->min_pointer - 1];
    }
    else {
        printf("error3 , minStackGetMin , min_pointer == 0, no values in the min_stack");
        exit(1);
    }
}

void minStackFree(MinStack* obj) {
    free(obj->array_of_values);
    free(obj->array_of_min_value);
    free(obj);
}

int main(){
    MinStack *obj = minStackCreate();
    printf("1\n");
    minStackPush(obj, 2147483646);
    printf("1\n");
    minStackPush(obj, 2147483646);
    printf("1\n");
    minStackPush(obj, 2147483647);
    printf("1\n");
    printf("%d\n",minStackTop(obj));
    printf("1\n");
    minStackPop(obj);
    printf("1\n");
    printf("%d",minStackGetMin(obj));
    printf("1\n");
    minStackPop(obj);
    printf("1\n");
    printf("%d\n",minStackGetMin(obj));
    printf("1\n");
    minStackPop(obj);
    printf("1\n");
    minStackPush(obj, 2147483647);
    printf("1\n");
    printf("%d\n",minStackTop(obj));
    printf("1\n");
    printf("%d\n",minStackGetMin(obj));
    printf("1\n");
    minStackPush(obj, -2147483648);
    printf("1\n");
    printf("%d\n",minStackTop(obj));
    printf("1\n");
    printf("%d\n",minStackGetMin(obj));
    printf("1\n");
    minStackPop(obj);
    printf("1\n");
    printf("%d\n",minStackGetMin(obj));
    printf("1\n");
}