#include<vector>
#include<iostream>

using namespace std;

class Solution {
public:
    int maxTurbulenceSize(vector<int>& arr) {
        int calc = -1;
        int maxcount = 0;
        int count = 0;
        if (arr.size() == 1) return 1;
        for(int i = 1; i< arr.size(); i++)
        {
            if (arr[i-1] < arr[i])
            {
                if (calc == 0) count += 1;
                else count = 1;
                calc = 1;
            }
            else if (arr[i-1] > arr[i]) 
            {
                if (calc == 1) count += 1;
                else count = 1;
                calc = 0;
            }
            else
            {
                count = -1;
                calc = -1;
            }

            if (count > maxcount) maxcount = count;
        }
        if (maxcount == -1) return 1;
        return maxcount+1;
    }
};


int main(){
    //testing
    Solution s;
    vector<int> arr = {9,4,2,10,7,8,8,1,9};
    cout << s.maxTurbulenceSize(arr);
    return 0;
}