#include <stdio.h>
#include <stdlib.h>

int* getConcatenation(int* nums, int numsSize, int* returnSize) {
    *returnSize = 2 * numsSize;
    int* ans = (int*)malloc(*returnSize * sizeof(int));
    int i = 0;int j = *returnSize;
    for(; i < numsSize ; i++){
        ans[i] = nums[i];
        ans[j-i-1] = nums[numsSize-i-1];
        }
    return ans;
}

int main() {
    int nums[] = {0, 1, 2, 3, 4};
    int numsSize = 5;
    int returnSize;
    int *result = getConcatenation(nums, numsSize, &returnSize);
    
    printf("%d\n", returnSize);
    for(int i = 0; i < returnSize; i++) {printf("%d ", result[i]);}
    printf("\n");
    
    free(result);
    
    return 0;
}
