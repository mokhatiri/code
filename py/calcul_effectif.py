
def scan_famille():
    """
    name: scan_famille.
    desc: transformer les vecteurs donnée à une matrice.
    """
    n = int(input("le nombre d'elements de votre famille dans E: "))
    p = int(input("la dimension de E: "))
    matrix = []
    for i in range(n):
        vecteur = []
        matrix.append(vecteur)
        print(f"V_{str(i+1)} = (")
        for j in range(p):
            k = 0
            while k == 0: 
                element = input()
                try:
                    element = float(element)
                    k = 1
                except:
                    pass
            vecteur.append(element)
        print(")")
    return matrix, p


def echlonage(M):
    """
    name: echelonage.
    desc: utiliser l'algo de gauss pour echelonnée une matrice donnée.
    """
    j = 0
    f = 0
    while f < len(M[0]):
    
        pivot = j
        # si c'est un 0 il faut swaper avec la ligne suivante
        while pivot < len(M) and M[pivot][f] == 0 : pivot += 1

        # le cas de tout les vecteurs on un 0
        if pivot == len(M) : f += 1; continue
        
        # sinon on swap les lignes
        M[j], M[pivot] = M[pivot], M[j]
        
        
        # on ferra l'iteration sur les collones
        for i in range(j + 1, len(M)):

            # si M_ij est un 0 on passe,
            if M[i][f] == 0:    continue

            coe = (M[i][f] / M[j][f])
            for k in range(len(M[0])):
                M[i][k] -= coe * M[j][k]
        
        j+= 1; f+= 1

    return M

def base(M):
    base = []
    for ligne in echlonage(M):
        if not all([ v == 0 for v in ligne]): base.append(ligne)
    return base

def main():
    famille, dimension = scan_famille()

    print('\n\n')
    print('la famille V: ')
    for vector in famille: print(f" - {vector}")
    
    V_base = base(famille)
    print('\n\n')
    print('****')
    print(f"le rang de la famille V est : {len(V_base)}")
    
    print('*****')
    print("une base du sous espace engendré par la famille V est:")
    for vector in V_base: print(f"{vector}")
    
    print('\n\n')
    print("choisir le vecteur pour tester son appartenance :")
    v = []
    print("v = ")
    for i in range(dimension):
        k = 0
        while k == 0: 
            v_ = input()
            try:
                v_ = float(v_)
                k = 1
            except:
                pass
        v.append(v_)
    
    print('\n')
    print('*****')
    print(f"le vecteur v= {v} ",end='')
    v_inclue = V_base + [v.copy()]
    if not all([_ for _ in echlonage(v_inclue)[-1]]): test = "appartient"
    else : test = "n'appartient pas"
    print(f"{test} au Vect(V)")
    print('*****')

if __name__ == '__main__':
    main()