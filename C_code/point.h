typedef struct{
    float x;
    float y;
}point;
// Forward declaration of typedef
typedef struct {
    point A;
    point B;
    float Mx;
    float My;
} MILIEU;

// Function to calculate midpoint
void midpoint(MILIEU* M){
    M->Mx = (M->A.x + M->B.x) / 2.0;
    M->My = (M->A.y + M->B.y) / 2.0;
}
