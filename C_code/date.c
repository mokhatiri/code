#include <stdio.h>

typedef struct {
    int jour;
    int mois;
    int annee;
}date;

int main() {
    date d1 = {22, 5, 2024};

    printf("Date: %d/%d/%d\n", d1.jour, d1.mois, d1.annee);

    date *Pdat = &d1;
    printf("Date pointer: %d/%d/%d\n", Pdat->jour, Pdat->mois, Pdat->annee);

    date dates[3] = {
        {1, 1, 2024},
        {2, 2, 2024},
        {3, 3, 2024}
	};

    date *Pdats = dates;

    printf("Contenu du tableau de dates :\n");
    int i = 0;
    for (; i < 3; i++) {
        printf("Date %d : %d/%d/%d\n", i+1, Pdats[i].jour, Pdats[i].mois, Pdats[i].annee);
    }

    return 0;
}

