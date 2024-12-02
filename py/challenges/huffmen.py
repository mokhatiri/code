Arbre=[4,[2,[0,None,[1,None,None]],[3,None,None]],[7,[6,None,None],[9,None,None]]]
def frequence(S):
    dict={}
    for i in S:
        if i not in dict:
            dict[i]=0
        dict[i]+=1
    return dict
def char_tries(S):
    fr=frequence(S);L=list(fr.keys())
    for j in range(len(L)-1):
        for i in range(len(L)-1):
            if fr[L[i]]<fr[L[i+1]]:
                L[i], L[i+1]=L[i+1],L[i]
    return L
def Huffman(S):
    if len(S)==0: return
    fr=frequence(S)
    tri=char_tries(S)
    str2=""
    if len(tri)==1:
        return [tri[0],None,None]
    elif len(tri)==2:
        return ["",[tri[1],None,None],[tri[0],None,None]]
    else:
        for i in S:
            if i!=tri[0]:
                str2+=i
    return ["",Huffman(str2),[tri[0],None,None]]
print(Huffman("AABBCCD"))
def decomp(C):
    a=[]
    for i in C:
        a.append(int(i)+1)
    return a

def decoder(C,H):
    s=decomp(C)
    a=''

    st=H
    while s != []:

        while s!= [] and st[s[0]]:
            st=st[s[0]]
            s = s[1:]

        a+=f"{st[0]}"        
        st=H
    return a
