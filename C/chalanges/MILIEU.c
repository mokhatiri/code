#include <stdio.h>
#include "point.h"

// Main function
int main(){
    // Define points A and B
    point A = {1, 2};
    point B = {3, 4};
    
    // Create a MILIEU structure with points A and B
    MILIEU M = {A, B};
    
    // Calculate midpoint
    midpoint(&M);
    
    // Print midpoint coordinates
    printf("%.1f,%.1f\n", M.Mx, M.My);
    
    return 0;
}
