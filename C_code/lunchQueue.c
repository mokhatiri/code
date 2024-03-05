int countOnes(int* arr, int arr_len) {
    int count = 0;
    for (int i = 0; i < arr_len ; i++) {
        if (arr[i] == 1) {
            count++;
        }
    }
    return count;
}

int countStudents(int* students, int studentsSize, int* sandwiches, int sandwichesSize) {
    
    int ones = countOnes(students , studentsSize);
    int zeros = studentsSize - ones;

    while(sandwichesSize > 0 && ((1-sandwiches[0])*(zeros))+((sandwiches[0])*(ones))){
        printf("%i",sandwiches[0]);
        if (students[0] == sandwiches[0] ){
            if (sandwiches[0] == 1) ones--;
            else zeros--;

            for (int i = 0; i < studentsSize - 1; i++) {
            students[i] = students[i + 1];
            }
            studentsSize--;
            for (int i = 0; i < sandwichesSize - 1; i++) {
            sandwiches[i] = sandwiches[i + 1];
            }
            sandwichesSize--;

        }else{
            int temp = students[0];
            for (int i = 0; i < studentsSize - 1; i++) {
            students[i] = students[i + 1];
            }
            students[studentsSize-1] = temp;
        }
    }

    return studentsSize;
}