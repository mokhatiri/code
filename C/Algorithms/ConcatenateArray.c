#include <stdio.h>  // Include standard input/output library
#include <stdlib.h> // Include standard library for memory management functions

// Function to concatenate an array with itself
int* getConcatenation(int* nums, int numsSize, int* returnSize) {
    *returnSize = 2 * numsSize; // Calculate the size of the resulting array
    int* ans = (int*)malloc(*returnSize * sizeof(int)); // Allocate memory for the result array
    int i = 0; int j = *returnSize; // Initialize indices for copying elements
    for(; i < numsSize ; i++) {
        ans[i] = nums[i]; // Copy the first part of the array
        ans[j-i-1] = nums[numsSize-i-1]; // Copy the second part in reverse order
    }
    return ans; // Return the concatenated array
}

int main() {
    int nums[] = {0, 1, 2, 3, 4}; // Input array
    int numsSize = 5; // Size of the input array
    int returnSize; // Variable to store the size of the resulting array
    int *result = getConcatenation(nums, numsSize, &returnSize); // Call the function

    printf("%d\n", returnSize); // Print the size of the resulting array
    for(int i = 0; i < returnSize; i++) { // Loop through the resulting array
        printf("%d ", result[i]); // Print each element of the array
    }
    printf("\n");

    free(result); // Free the allocated memory

    return 0; // End of the program
}
