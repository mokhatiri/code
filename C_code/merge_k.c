#include <stdio.h>
#include <stdlib.h>
#include <assert.h>

typedef struct ListNode {
  int val;
  struct ListNode *next;
};


struct ListNode* mergeLists(struct ListNode* a, struct ListNode* b) {
    // merged is the return list (not a pointer)
    // outPointer is the pointer changing merged
    // ?inPointer is the pointer tracking the two lists nodes

    struct ListNode mergedList; // we make a dummy list 
    mergedList.next = NULL; // if both a and b are NULL, the return value would also be
    
    struct ListNode* outPointer = &mergedList;
    struct ListNode* AinPointer = a;
    struct ListNode* BinPointer = b;

    while(AinPointer!=NULL && BinPointer!=NULL){
        // the changes applique to the smallest
        if(AinPointer->val < BinPointer->val){
            // we point the out to the smallest
            outPointer->next = AinPointer;
            // we point to the next value to check it next
            printf("A: %d\n",AinPointer->val);
            AinPointer = AinPointer->next;
        }

        else{// same thing with B
            outPointer->next = BinPointer;
            printf("B: %d\n",BinPointer->val);
            BinPointer = BinPointer->next;
        }
        outPointer = outPointer->next;
    }

    if(AinPointer!=NULL) outPointer->next = AinPointer;
    if(BinPointer!=NULL) outPointer->next = BinPointer;

    return mergedList.next;
}

struct ListNode* mergeKLists(struct ListNode** lists, int listsSize) {
    if (listsSize == 0) return NULL;
    if (listsSize == 1) return lists[0];


    struct ListNode* right = mergeKLists(lists, listsSize/2);
    struct ListNode* left = mergeKLists(lists + (listsSize/2),listsSize - (listsSize/2));
    
    return mergeLists(right, left);
}