#include <stdio.h>

typedef struct{
    char nom[30];
    int age;
    float taille;
}Personne;

void Creer_Personne(Personne *p) {
    printf("name : ");
    scanf("%s", p->nom);
    printf("age : ");
    scanf("%d", &p->age);
    printf("height : ");
    scanf("%f", &p->taille);
}

void Afficher_Personne(Personne p) {
    printf("Name : %s\n", p.nom);
    printf("Age : %d years\n", p.age);
    printf("height : %.2f m\n", p.taille);
}

int main() {
    Personne p;
    Creer_Personne(&p);
    printf("*****\n");
    Afficher_Personne(p);

    return 0;
}

