#include <stdio.h>
#include <stdlib.h>
#include <assert.h>

int* sortArray(int* nums, int numsSize, int* returnSize) {
    int arr[100001] = {0};
    int max = INT_MIN, min = INT_MAX;
    int x = 0;
    for (int i = 0; i < numsSize; i++) {
        x = 50000 + nums[i];
        arr[x]++;
        if (min > x)
            min = x;
        if (max < x)
            max = x;
    }
    int k = numsSize - 1;
    for (int i = max; i >= min; i--) {
        if (arr[i] == 0)
            continue;
        int len = arr[i];
        while (len-- > 0)
            nums[k--] = i - 50000;
    }
    *returnSize = numsSize;
    return nums;
}


int main(){
    int num[14] = {1,2,3,4,2,3,2,5,4,2,3,2,4,2};
    //must be : 5,4,4,4,3,3,3,2,2,2,2,2,2,1,
    //is :      5,4,4,4,3,3,3,2,2,2,2,2,2,1,
    int numsSize = 14;
    int returnSize;
    int* nums = sortArray((int*)&num, numsSize, &returnSize);
    while(returnSize!=0){
        printf("%d,",nums[returnSize-1]);
        returnSize--;
    }
}