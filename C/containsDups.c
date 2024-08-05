#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int containsDuplicate(int* nums, int numsSize) {
    int array[numsSize];
    memset(array, 0, numsSize * sizeof(int));

    for(int i = 0; i < numsSize; i++){
        for(int i = 0; i < numsSize; i++){
        printf("%d,",array[i]);
        }
        printf("]\n");
        if (array[nums[i]] == 0) array[nums[i]] = 1;
        else if (array[nums[i]] == 1) return 1;
    }
    for(int i = 0; i < numsSize; i++){
        printf("%d,",array[i]);
    }
    free(array);
    return 0;
}

int main(){
    int nums[] = {1,1,1,3,3,4,3,2,4,2};
    int numsSize = sizeof(nums) / sizeof(nums[0]);
    printf("%d", containsDuplicate(nums, numsSize));
}