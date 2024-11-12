case = [-1,0,1,2,-1,-4,-2,-3,3,0,4]

class Solution(object):
    def threeSum(self, nums):
        """
        :type nums: List[int]
        :rtype: List[List[int]]
        """
        nums.sort()
        i = 0
        j = len(nums)-1
        k = 1
        ret = []
        while i < j-1:
            if nums[i] + nums[j] + nums[k] == 0:
                ret.append([nums[i],nums[j],nums[k]])
                while nums[i] == nums[i+1] and k > i+1:
                    i += 1
                while nums[j] == nums[j-1] and k < j-1:
                    j -= 1
                while nums[k] == nums[k+1] and k < j-1:
                    k += 1
                if j > k+1:
                    k += 1
                elif i < k-1:
                    i += 1
                    k = i+1
                else:
                    break
            elif nums[i] + nums[j] + nums[k] < 0:
                if nums[i] <= 0:
                    if j > k + 1:
                        k += 1
                    elif i < k - 1 and nums[i+1] <= 0:
                        i += 1
                        k = i+1
                    else:
                        break
                else:
                    break
            elif nums[i] + nums[j] + nums[k] > 0:
                if nums[j] >= 0:
                    if j > k + 1 and nums[j-1] >= 0:
                        j -= 1
                    elif i < k-1:
                        i+=1
                        k = i+1
                    else:
                        break
                else:
                    break
        return ret

print(Solution().threeSum(case))
