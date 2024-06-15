#include <stdio.h>
#include <stdlib.h>
typedef struct node
{
    int value;
    struct node *next;
} node;
typedef struct 
{
    node * head;
} likedList;

node* create_from_list(int* list) {
    node* head = NULL;
    int i = 0; // Start from the first element
    while (list[i] != -1) {
        node* new_node = malloc(sizeof(node));
        if (!new_node) {
            return NULL;
        }
        new_node->value = list[i];
        new_node->next = head;
        head = new_node;
        i++; // Move to the next element in the list
    }
    return head;
}

char* show_list(likedList* list) {
    node* ptr = list->head;
    int len = 0;
    while (ptr != NULL) {
        len++;
        ptr = ptr->next;
    }

    char* res = malloc((len + 1) * sizeof(char)); // Allocate space for the characters and the null terminator
    if (res == NULL) {
        return NULL; // Allocation failed
    }

    ptr = list->head; // Resetting ptr to the beginning of the list
    int i = len - 1;
    res[len] = '\0'; // Null-terminate the string

    while (ptr != NULL) {
        res[i] = (char)(ptr->value);
        i -= 1;
        ptr = ptr->next;
    }
    return res;
}

int main() {
    int list[] = {72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 32, 33, -1};
    likedList* l = malloc(sizeof(likedList));
    l->head = create_from_list(list);
    if (l->head != NULL) {
        printf("the head is %d\n", l->head->value);
        char* str = show_list(l);
        if (str != NULL) {
            printf("%s\n", str); // Print the list as a string
            free(str); // Free the allocated memory for the string
        } else {
            printf("Memory allocation failed for string.\n");
        }
    } else {
        printf("List creation failed.\n");
    }
    free(l->head); // Free the allocated memory for the linked list nodes
    free(l); // Free the allocated memory for the linked list itself
    return 0;
}
