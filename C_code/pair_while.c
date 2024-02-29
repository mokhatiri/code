#include <stdio.h>
#include <math.h>

int pair(int start, int len){
    int pointer = start;
    int i = len;
    pointer = (pointer/2)*2 ;
    while(i  > 0){
        pointer += 2;
        printf("-  %d\n", pointer);
        i-- ;
    }
}
int impair(int start, int len){
    int pointer = start;
    int i = len;
    pointer = (pointer/2)*2 + 1;
    while(i  > 0){
        pointer += 2;
        printf("-  %d\n", pointer);
        i-- ;
    }
}
int switch_a_b(int a, int b){
    printf("%i %i\n",a,b); 
    a = a + b;
    b = a - b;
    a = a - b;
    printf("%i %i\n",a,b); 
}
int prime(int start, int len){
    int pointer = start;
    int i = len;
    while(i > 0){
        int num = sqrt(pointer);
        while(num){

        }
        i--;
    }
}
int main(){
}