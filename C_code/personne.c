#include <stdio.h>
#include <string.h>

typedef  struct{
    char nom[30];
    char prenom[30];
    int age;
}personne ;

void inserer_personne(personne tab[], int *taille, personne nouvelle_personne, int position) {
	int i = *taille;
	
    for (; i > position; i--) {
        tab[i] = tab[i-1];
	}
    
	tab[position] = nouvelle_personne;
    (*taille)++;
}

int main() {
    personne tab[100];
    int n;

    printf("nmbr de personne: ");
    scanf("%d", &n);
    printf("*********\n");

    printf("nom, prenom et age :\n");
    int i = 0;
    for (; i < n; i++) {
        scanf("%s %s %d", tab[i].nom, tab[i].prenom, &tab[i].age);
        fflush(stdin);
    }
    printf("*********\n");

     personne new_person;
    printf("nom, prenom et age de new_person:\n");
    scanf("%s %s %d", new_person.nom, new_person.prenom, &new_person.age);

    int position;
    printf("la position (de 0 a %d):", n);
    scanf("%d", &position);
    printf("*********\n");
    
    inserer_personne(tab, &n, new_person, position);

    printf("Liste des personnes apres insertion :\n");
    i = 0;
    for (; i < n; i++) {
        printf("Personne %d: %s %s, %d ans\n", i+1, tab[i].nom, tab[i].prenom, tab[i].age);
    }

    return 0;
}

