typedef struct ListNode {
    int val;
    struct ListNode *next;
}; 

void insert(struct ListNode* list, int index, int value);

struct ListNode* mergeKLists(struct ListNode** lists, int listsSize) {
    for(int i = 1; i< listsSize-1, i++){

        struct *ListNode init = lists[0];
        int j = 0
        struct *ListNode list = lists[i];

        int k = 0;
        while(init != NULL && list != NULL){
            if(list->val > init->val){
                insert(init,j,list->val);
                list = list->next;
                }
            j++;
        }
        while(list != NULL){
            insert(init,j,list->value);
            j++;
        }

    }
}