#include <stdio.h>
#include <math.h>

typedef struct {
    char nom;
    double x;
    double y;
}point;

double distance(point p1, point p2);
double perimetre(point A, point B, point C);

int main() {
    point A, B, C;
	
	printf("name x y\n");
	
    scanf("%c %lf %lf", &A.nom, &A.x, &A.y);
    fflush(stdin);
    
	scanf("%c %lf %lf", &B.nom, &B.x, &B.y);
    fflush(stdin);
	
	scanf("%c %lf %lf", &C.nom, &C.x, &C.y);
	fflush(stdin);

    printf("Le perimetre du triangle %c%c%c est : %lf\n", A.nom, B.nom, C.nom, perimetre(A, B, C));

    return 0;
}

double distance(point p1, point p2) {return sqrt(pow(p2.x - p1.x, 2) + pow(p2.y - p1.y, 2));}

double perimetre(point A, point B, point C) {return distance(A, B) + distance(B, C) + distance(C, A);}
