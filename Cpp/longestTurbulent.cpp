#include <iostream>
#include <vector>
#include <climits>
using namespace std;

class Solution {
public:
    int maxTurbulenceSize(vector<int>& arr) {
        int n = arr.size();
        if(n==1){
            return 1;
        }
        vector<int>v; int x=-1; int mx=INT_MIN;
        for(int i=1;i<n;i++){
            if(arr[i-1]>arr[i]){
                if(x==1){
                    v.push_back(1);
                }
                else if(x==0){
                    v.push_back(v.back()+1);
                }
                else{
                    v.push_back(1);
                }
                x=1;
            }
            else if(arr[i-1]<arr[i]){
                if(x==0){
                    v.push_back(1);
                }
                else if(x==1){
                    v.push_back(v.back()+1);
                }
                else{
                    v.push_back(1);
                }
                x=0;
            }
            else{
                v.push_back(-1);
                x=-1;
            }
            mx=max(mx,v.back());
        }
        if(mx==-1){
            return 1;
        }
        return mx+1;
    }
};

// testing 
int main()
{
    Solution sol;
    vector<int> arr = {9,4,2,10,7,8,8,1,9};
    cout << sol.maxTurbulenceSize(arr) << endl;
    return 0;
}