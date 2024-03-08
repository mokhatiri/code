/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     struct ListNode *next;
 * };
 */

struct ListNode* mergeLists(struct ListNode* a, struct ListNode* b) {
    struct ListNode* result_head = NULL;
    struct ListNode** c = &result_head;
    while (a && b){
        if (a->val < b->val){
            *c = a;
            a = a->next;
            c = &((*c)->next);
        }
        else {
            *c = b;
            b = b->next;
            c = &((*c)->next);
        }
    }
    while (a){
            *c = a;
            a = a->next;
            c = &((*c)->next);
    }
    while (b){
            *c = b;
            b = b->next;
            c = &((*c)->next);
        }
    return result_head;
}

struct ListNode* mergeKLists(struct ListNode** lists, int listsSize) {
    if (listsSize == 0) return NULL;
    if (listsSize == 1) return lists[0];


    struct ListNode* a = mergeKLists(lists, listsSize/2);
    struct ListNode* b = mergeKLists(lists + (listsSize/2),listsSize - (listsSize/2));
    
    return mergeLists(a, b);
}