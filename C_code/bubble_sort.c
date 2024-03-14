#include <stdio.h>

int main(){
    int len = 13;
    int array[] = {1,2,3,4,5,6,7,8,9,10,11,12,13};

    printf("before : ");
    for (int i = 0; i < len; i++){
        printf("%d ", array[i]);
    }
    printf("\n");


    for (int i = 0; i < len-1; i++){
        for (int j = 0; j < len-i; j++){
            if(array[j] < array[j+1]){
                printf("|%d, %d|", array[j], array[j+1]);
                int temp = array[j];
                array[j] = array[j+1];
                array[j+1]= temp;
                printf("__ ");
                for (int i = 0; i < len; i++){
                    printf("%d ", array[i]);
                }
                printf("\n");
            }
        }
    }

    printf("after : ");
    for (int i = 0; i < len; i++){
        printf("%d ", array[i]);
    }
    printf("\n");

}