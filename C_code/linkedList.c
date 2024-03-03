#include <stdlib.h>
#include <assert.h>
#include <stdio.h>

typedef struct node
{
    int value;
    struct node* next;

}node;

node* nodeCreate(int val){
    node* node = malloc(sizeof(node));
    assert(node);
    node->value = val;
    node->next = NULL;
    return node;
}

void link(node* prev,node* next){
    prev->next = next;
}

typedef struct linkedList
{
    int length;
    node* tail;
    node* head;

}linkedList;

linkedList* linkedListCreate(){
    linkedList* self = malloc(sizeof(linkedList));
    assert(self);
    self->length = 0;
    self->tail = nodeCreate(0);
    self->head = self->tail;
    return self;
}

void append(linkedList *self, int value){
    node *next = nodeCreate(value);
    link(self->head,next);
    self->head = next;
    self->length++;
}

node* get(linkedList* self, int index){
    node* val = self->tail;
    if(self->length > index){
        int k = 0;
        for(;k < (index+((index < 0)*self->length)+1);k++){
            val = val->next;
        }
        return val;
    }else{
        printf("error 1 : index : %d : index out of range", index); exit(1);
    }
}

void delete(linkedList* self, int index){
    if(index != 0){
        node* prev = get(self,index-1);
        prev->next = prev->next->next;
    }else{
        self->tail = self->tail->next;
    }
    self->length--;
}

int read(linkedList* self, int index){
    return get(self, index)->value;
}

void appendArray(linkedList* self, int* array, int arrayLength){
    int i = 0;
    for(; i<arrayLength;i++){
        append(self, array[i]);
    }
}

void printA(linkedList* self){
    printf("[");
    node* val = self->tail->next;
    int i = 0;
    int len = self->length;
    for(;i<len;i++){
        printf("%d",val->value);
        if (i != len-1){printf(",");}
        val = val->next;
    }
    printf("]");
}

void freeList(linkedList* self){
    for(int i = 0; i < self->length; i++){
        free(get(self, self->length-1-i));
    }
}

// int main() {
//     // Create a new linked list
//     linkedList* list = linkedListCreate();

//     // Append some elements to the linked list
//     append(list, 10);
//     append(list, 20);
//     append(list, 30);

//     // Print the contents of the linked list
//     printf("Initial list: --");
//     printA(list);
//     printf("--\n");

//     // Append an array of elements to the linked list
//     int array[] = {40, 50, 60};
//     int arrayLength = sizeof(array) / sizeof(array[0]);
//     appendArray(list, array, arrayLength);

//     // Print the contents of the linked list after appending the array
//     printf("List after appending array: ");
//     printA(list);
//     printf("\n");

//     // Delete an element from the linked list
//     delete(list, 1); // Delete the element at index 1 (value 20)
//     delete(list, -1); // Delete the element at index -1 (value 60)

//     // Print the contents of the linked list after deletion
//     printf("List after deletion: ");
//     printA(list);
//     printf("\n");

//     // Read an element from the linked list
//     int value = read(list, 1); // Read the element at index 1 (value 30)
//     printf("Value at index 1: %d\n", value);

//     // Free memory allocated for the linked list
//     // (Not implemented in the provided code)
//     // You should write a function to free the memory for nodes and the linked list itself.

//     return 0;
// }
