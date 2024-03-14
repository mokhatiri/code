#include <stdio.h>

// Function to swap two elements in an array
void swap(int* array, int i, int j) {
    int temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

// Quick sort algorithm
void quickSort(int* array, int left, int right) {
    if (left >= right) return;

    int pivot = array[(left + right) / 2];
    int L = left;
    int R = right;

    while (L < R) {
        while (array[R] > pivot) R--;
        while (array[L] < pivot) L++;
        if (L <= R) {
            swap(array, L, R);
            R--;
            L++;
        }
    }

    // Recursively sort the two partitions
    quickSort(array, left, R);
    quickSort(array, L, right);
}

int main() {
    int array[] = {14,25,25,15,74,78,123,7,35,865,74,32,64,24,85,24,7}; // Sample array

    printf("Initial array: ");
    for (int i = 0; i < sizeof(array) / sizeof(array[0]); i++) {
        printf("%d ", array[i]);
    }
    printf("\n");

    // Call quickSort function
    quickSort(array, 0, sizeof(array) / sizeof(array[0]) - 1);

    printf("Sorted array: ");
    for (int i = 0; i < sizeof(array) / sizeof(array[0]); i++) {
        printf("%d ", array[i]);
    }
    printf("\n");

    return 0;
}
