#include <stdio.h>

int main(){

    // two names
    char name1 ,name2;
    printf("the first name :");
    name1 =getchar();
    fflush(stdin);

    printf("the second name :");
    name2 =getchar();
    fflush(stdin);

    if (name1 >= 97){
        name1 -= 32;
    }
    if (name2 >= 97){
        name2 -= 32;
    }

 if (name1 > name2){
        printf("Order is NOT alphabetic\n");
    }
    else {
        printf("Order is alphabetic\n");      
    }

    //three names
    char name_1,name_2,name_3 ;
    printf("Enter the first name :");
    name_1=getchar();
    fflush(stdin);

    printf("Enter the second name :");
    name_2=getchar();
    fflush(stdin);

    printf("Enter the third name :");
    name_3=getchar();
    fflush(stdin);


    if (name_1 >= 97){
        name_1 -= 32;
    }
    if (name_2 >= 97){
        name_2 -= 32;
    }
    if (name_3 >= 97){
        name_3 -= 32;
    }
    
    if ((name_3> name_2) && (name_2>name_1)){
        printf("The order is alphabetic");
    }
    else{
        printf("the order is NOT alphabetic\n");
    }

    return 0;
}