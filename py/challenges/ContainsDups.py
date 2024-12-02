nums = [925,467,318,353,-250,-707,-481,809,-718,982,-42,-550,530,951,-807,-184,813,-2,-666,368,705,-541,-669,447,-116,56,-172,-305,-137,-599,-269,-347,-811,479,-250,-960,-307,135,-60,-97,441,-962,-212,-321,60,278,-394,50,968,-868,-768,882,615,-531,991,795]

def Answer(nums):

    hash_table = {}

    for i in nums:
        if i in hash_table.keys():
            if hash_table[i] == 1:
                print(hash_table)
                return True,i
            else:
                return i
        else:
            hash_table[i] = 1
        
    print(hash_table)

    return False


def containsDuplicate(nums):
    hash_table = {}

    for i in nums:
        if i%100 in hash_table.keys() and i in hash_table[i%100].keys():
            if hash_table[i%100][i] == 1:
                return True,i
            else:
                return i
        else:
            if i%100 not in hash_table.keys():
                hash_table[i%100] = {}
            hash_table[i%100][i] = 1
    
    print(hash_table)

    return False
    

print(Answer(nums))
print("*************")
print(containsDuplicate(nums))