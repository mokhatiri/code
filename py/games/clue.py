"""
this is no the real game, just a game to practice sql and knowledge engineering
the goal of this: make a program that can spot the lier / suspects
it will be using the premade python file logic.py
"""

# let's first make the database
import sqlite3 as sql
import os
import sys

sys.path.append("C:/Users/moham/Desktop/code/py/algorithms")
import logic

connection = sql.connect("C:/Users/moham/Desktop/code/Databases/Clue/Clue.db")
cursor = connection.cursor()

file = open("C:/Users/moham/Desktop/code/SQL/TablesForClue.sql", "r")
cursor.executescript(file.read())
connection.commit()
file.close()

file = open("C:/Users/moham/Desktop/code/SQL/DataForClue.sql", "r")
cursor.executescript(file.read())
connection.commit()
file.close()

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
        

# let's first add the current infos to the Knowledge Base 'KB'
# 1. let's make the symbols
Peoples = ['Joe','Bob','Alice','Drake','Jeff','Cameron']
Peoples_symbols = [logic.Symbol(person) for person in Peoples]

KB = logic.Xor(*[logic.Not(prs) for prs in Peoples_symbols])
# the KB know that someone is lying but no more then 1

# 2. input the infos from the database

# starting by the Places:
cursor.execute("SELECT * FROM Places")
# Places has the place name and the *highest*(OR) number of people in it
Places = cursor.fetchall()

# a dictionary that has the name of the place and the names of the person in there
Name_Place = {place[0]: [name+"_"+place[0] for name in Peoples] for place in Places}

for place in Places:
    # the number of people in the place
    num = place[1]
    # the names of the people in the place
    names = Name_Place[place[0]]
    # let's make the KB know that there are num people in the place
    # we'll be using Combination function to get all the combinations of people in the place
    combinations = Combination(names, num)

    KB = logic.And(KB, logic.Xor(*[logic.Or(*combination) for combination in combinations]))

# the next part is much harder
# a person can be in a place doing an activity
cursor.execute("SELECT * FROM Activities")
# Activities has the activity name and the number of people doing it (AND)
Activities = cursor.fetchall()

# let's get the places where the activity is happening
cursor.execute("SELECT * FROM Activities_Places")
# Activities_Places has the activity name and the place name
Activities_Places = cursor.fetchall()

Activity_Place_people = {place[0] : {activity[0] : [name+"_"+place[0]+"_"+activity[0] for name in Peoples] for activity in Activities} for place in Places}

for place in Places:
    # the number of people in the place
    num = place[1]

    for activity in Activities:
        # the number of people doing the activity
        num = activity[1]
        # the names of the people doing the activity
        names = Activity_Place_people[place[0]][activity[0]]