#include <vector>
#include <iostream>
using namespace std;

class Solution {
public:
    double findMaxAverage(vector<int>& nums, int k) {
        int sum = 0;
        int max = 0;
        for(int i = 0; i < k;i++){
            cout << nums[i] << endl;
            sum += nums[i];
        }
        max = sum;
        for(int i = k-1; i < nums.size()-1 ;i++){
            cout << nums[i] << endl;
            sum = sum - nums[i-k+1] + nums[i+1];
            max = sum > max ? max : sum;
        }

        return max/k;
    }
};

// test 
int main(){
    Solution s;
    vector<int> nums = {1,12,-5,-6,50,3};
    cout << s.findMaxAverage(nums,4) << endl;
    return 0;
}