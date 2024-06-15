#include <stdlib.h>
#include <assert.h>
#include <stdio.h>

typedef struct doubleNode{
    int value;
    struct doubleNode *next;
    struct doubleNode *prev;
}doubleNode;

doubleNode* makeNode(int value){
    // this will malloc supposing future freeing
    doubleNode* myNode = malloc(sizeof(doubleNode));
    assert(myNode);

    myNode->next = NULL;
    myNode->prev = NULL;
    myNode->value = value;
    return myNode;
}

typedef struct MyLinkedList{
    int counter;
    doubleNode* head;
    doubleNode* tail;
}MyLinkedList;


MyLinkedList* myLinkedListCreate() {
    // this will malloc supposing future freeing
    MyLinkedList* myList = malloc(sizeof(MyLinkedList));
    assert(myList);

    myList->head = NULL;
    myList->tail = myList->head;
    myList->counter = 0;
    return myList;
}

doubleNode* myLinkedListAccess(MyLinkedList* obj, int index) {
    int i = index + (index < 0) * obj->counter;
    if (i < 0 || i >= obj->counter) {printf("Error: Index out of bounds.\n"); return NULL;}

    doubleNode* element;
    int k = 0;

    if (i < (obj->counter / 2)) {
        element = obj->head;
        while (k < i) {
            element = element->next;
            k++;
        }
    } else {
        element = obj->tail;
        while (k < obj->counter - i - 1) {
            element = element->prev;
            k++;
        }
    }

    return element;
}

int myLinkedListGet(MyLinkedList* obj, int index) {

    doubleNode* node = myLinkedListAccess(obj, index);
    if (node == NULL) {printf("Error: Node not found.\n"); return -1;}

    int value = node->value;
    return value;
}


void myLinkedListAddAtHead(MyLinkedList* obj, int val) {
    doubleNode* new = makeNode(val);
    new->next = obj->head;
    if(obj->counter == 0){
        obj->tail = new;
    }else{obj->head->prev = new;}
    obj->head = new;
    obj->counter ++;
}

void myLinkedListAddAtTail(MyLinkedList* obj, int val) {
    doubleNode* new = makeNode(val);
    new->prev = obj->tail;
    if(obj->counter == 0){
        obj->head = new;
    }else{obj->tail->next = new;}
    obj->tail = new;
    obj->counter ++;
}
void myLinkedListAddAtIndex(MyLinkedList* obj, int index, int val) {
    if (index < 0 || index > obj->counter) {printf("Error: Invalid index.\n"); return;}

    if (index == 0) {myLinkedListAddAtHead(obj, val); return;}
    if (index == obj->counter) {myLinkedListAddAtTail(obj, val); return;}

    int k = 0;
    if (index < 0) {index += 1; k++;}

    doubleNode* new = makeNode(val);
    doubleNode* togo = myLinkedListAccess(obj, index);

    if (togo == NULL) {printf("Error: Index out of bounds.\n"); free(new); return;}

    if (togo->prev != NULL) {togo->prev->next = new;} else {obj->head = new;}
    new->prev = togo->prev;
    togo->prev = new;
    new->next = togo;

    obj->counter++;
}

void myLinkedListDeleteAtIndex(MyLinkedList* obj, int index) {
    doubleNode* togo = myLinkedListAccess(obj, index);
    if (togo == NULL) {printf("Error: Node not found.\n"); return;}
    
    else {
        if(togo->prev != NULL)
            togo->prev->next = togo->next;
        else
            obj->head = togo->next;
        if(togo->next != NULL)
            togo->next->prev = togo->prev;
        else
            obj->tail = togo->prev;
    }
    free(togo);
    obj->counter--;
}

void myLinkedListFree(MyLinkedList* obj) {
    doubleNode* current = obj->head;
    while (current != NULL) {
        doubleNode* next = current->next;
        free(current);
        current = next;
    }
    free(obj);
}


// int main(){
//     //[[],[7],[2],[1],[3,0],[2],[6],[4],[4],[4],[5,0],[6]]
//     MyLinkedList* obj = myLinkedListCreate();
    
//     myLinkedListAddAtHead(obj, 7);
//     myLinkedListAddAtHead(obj, 2);
//     myLinkedListAddAtHead(obj, 1);

//     myLinkedListAddAtIndex(obj, 3,0);
//     myLinkedListDeleteAtIndex(obj, 2);

//     myLinkedListAddAtHead(obj, 6);
//     myLinkedListAddAtTail(obj, 4);

//     myLinkedListGet(obj, 4);

//     myLinkedListAddAtHead(obj, 4);
//     myLinkedListAddAtIndex(obj, 5,0);
//     myLinkedListAddAtHead(obj, 6);

//     myLinkedListFree(obj);
// }