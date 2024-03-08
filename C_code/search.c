# include <stdio.h>

int search(int* increasingTable, int Size, int element, int sIndex){
    if(Size == 0){printf("not found!\n");return -1;}
    int Mid = increasingTable[Size/2];
    if(Mid == element){return Size/2 + sIndex;}
    if(Mid > element){return search(increasingTable, Size/2 + Size%2, element, sIndex);}
    else{return search(&increasingTable[Size/2], Size/2, element, sIndex + Size/2);}
}


int main() {
    int arr[] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    int size = sizeof(arr) / sizeof(arr[0]);
    int element, index;

    // Test case 1: Search for an existing element
    element = 7;
    index = search(arr, size, element, 0);
    if (index != -1) {
        printf("Element %d found at index %d\n", element, index);
    } else {
        printf("Element %d not found\n", element);
    }

    // Test case 2: Search for a non-existing element
    element = 15;
    index = search(arr, size, element, 0);
    if (index != -1) {
        printf("Element %d found at index %d\n", element, index);
    } else {
        printf("Element %d not found\n", element);
    }

    return 0;
}