import sqlite3 as sql
import os
import sys

# Adding relative path to the sys.path for logic module
base_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
sys.path.append(os.path.join(base_path,'py' , 'algorithms'))

import logic

# Use relative path for the database file
db_path = os.path.join(base_path, 'Databases', 'Clue', 'Clue.db')
connection = sql.connect(db_path)
cursor = connection.cursor()

# Use relative path for SQL scripts
tables_path = os.path.join(base_path, 'SQL', 'TablesForClue.sql')
with open(tables_path, 'r') as file:
    cursor.executescript(file.read())
connection.commit()

data_path = os.path.join(base_path, 'SQL', 'DataForClue.sql')
with open(data_path, 'r') as file:
    cursor.executescript(file.read())
connection.commit()

def Combination(List, count):
    Ret = []
    def recurse(List, count, index, comb):
        if count == 0:
            Ret.append(comb)
            return
        for i in range(index, len(List)):
            recurse(List, count-1, i+1, comb+[List[i]])

    recurse(List, count, 0, [])
    return Ret
        

# Let's first add the current infos to the Knowledge Base 'KB'
# 1. Let's make the symbols
Peoples = ['Joe','Bob','Alice','Drake','Jeff','Cameron']
Peoples_symbols = {person: logic.Symbol(person) for person in Peoples}
# Person : True => person is lying

KB = logic.Xor(*[Peoples_symbols[prs] for prs in Peoples_symbols])
# The KB knows that someone is lying but no more than 1
statements = {person: [] for person in Peoples}
# and the set statements tracks the statement made by a person

# 2. Input the infos from the database

# Starting by the Places:
cursor.execute("SELECT * FROM Places")
# Places has the place name and the *highest* (OR) number of people in it
Places = cursor.fetchall()

# A dictionary that has the name of the place and the names of the person in there
Name_Place = {place[0]: {name : logic.Symbol(name+"_"+place[0]) for name in Peoples} for place in Places}

for place in Places:
    # The number of people in the place
    num = place[1]
    # The symbols of the people in the place
    Names = [Name_Place[place[0]][person] for person in Name_Place[place[0]]]
    # Let's make the KB know that there are num people in the place
    # We'll be using the Combination function to get all the combinations of people in the place
    combinations = []
    for i in range(1,num+1):
        combinations += Combination(Names, i) # this is since the number of people is maximal

    KB = logic.And(KB, logic.Xor(*[logic.And(*combination) for combination in combinations]))
    # only one of the combinations is true

for person in Peoples:
    # a person can only state that he is in one place at a time
    statements[person].append(logic.Xor(*[Name_Place[place[0]][person] for place in Places]))

# The next part is much harder
# A person can be in a place doing an activity
cursor.execute("SELECT * FROM Activity")
# Activities has the activity name and the number of people doing it (AND)
Activities = cursor.fetchall()

# Let's get the places where the activity is happening
cursor.execute("SELECT * FROM Activity_Places")
# Activities_Places has the activity name and the place name
Activities_Places = {}
for place,activity in cursor.fetchall():
    if activity not in Activities_Places:
        Activities_Places[activity] = []
    Activities_Places[activity].append(place)

Activities_People = {activity[0]: {person : logic.Symbol(person+"_"+activity[0]) for person in Peoples} for activity in Activities}
for activity in Activities:
    # The number of people doing the activity
    num = activity[1]
    # The names of the people doing the activity
    Names = [Activities_People[activity[0]][person] for person in Activities_People[activity[0]]]

    # Let's make the KB know that there are num people doing the activity
    # We'll be using the Combination function to get all the combinations of people doing the activity
    combinations = Combination(Names, num) # this is since the number is fix
    KB = logic.And(KB, logic.Xor(*[logic.And(*combination) for combination in combinations]))

for person in Peoples:
    # a person can only be doing one activity
    statements[person].append(logic.Xor(*[Activities_People[activity[0]][person] for activity in Activities]))
    
    # if a person is doing an activity he can only be in one of the places where he can be doing it
    for activity in Activities_Places:
        # if a person is really doing an activity he can only be in one of the places where that activity is done
        KB = logic.And(KB, logic.Implication(Activities_People[activity][person], logic.Xor(*[Name_Place[place][person] for place in Activities_Places[activity]])))

# a person is lying if one of their statements is false:
for person in Peoples:
    # so if every statement is true then he is not lying
    KB = logic.And(KB, logic.Implication(logic.And(*statements[person]),Peoples_symbols[person]))

# let's try an example fast with what he have made till now
print(logic.model_check(KB, logic.And(Activities_People["Reading"]["Joe"],Activities_People["Exercising"]["Joe"],Peoples_symbols["Joe"])))
# this is taking a long time to run idk if it's working
# i'll get back to it later