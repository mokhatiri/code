class Solution(object):
    def isMatch(self, s, p):
        """
        :type s: str
        :type p: str
        :rtype: bool
        """
        def Match(i,j):
            if len(p) <= j and len(s) <= i:
                return True
            elif len(p) <= j:
                return False
            elif len(p) > j+1 and p[j+1] == "*":
                st_v = p[j]
                j += 2
                while len(p) > j+2 and p[j] == st_v:
                    if p[j+1] ==  "*":
                        j += 2
                    else:
                        break
                return Match(i,j) or (len(s) > i and (s[i] == st_v or st_v == ".") and Match(i+1, j-2))
            elif len(s) > i and (p[j] == s[i] or p[j] =="."):
                return Match(i+1, j+1)
            else:
                return False
        return Match(0,0)

txt = "cbaacacaaccbaabcb"
p = "c*b*b*.*ac*.*bc*a*"
test = Solution()
print(test.isMatch(s=txt, p=p))