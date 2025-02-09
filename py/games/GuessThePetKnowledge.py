# this is an algorithm based on knowledge engineering
# this is also going to reference a database using SQL
# the library to do so is called sqlite3
import sqlite3
import sys
import os
# connect to the database
# the database is called pets.db
# the database is in the directory Databases in C:\Users\moham\Desktop\code\Databases\PetsGame
creating = True
if (os.path.exists('C:/Users/moham/Desktop/code/Databases/PetsGame/pets.db')):
    creating = False

conn = sqlite3.connect('C:/Users/moham/Desktop/code/Databases/PetsGame/pets.db')
# create a cursor
cursor = conn.cursor()

if(creating):
    # the database has 3 tables : pets, questions, and questions_pets
    # the pets table has 2 columns : id, name
    # the questions table has 2 columns : id, question
    # the questions_pets table has 2 columns : question_id, pet_id
    query = ["CREATE TABLE IF NOT EXISTS pets (id INTEGER PRIMARY KEY, name TEXT);", "CREATE TABLE IF NOT EXISTS questions (id INTEGER PRIMARY KEY, question TEXT);", "CREATE TABLE IF NOT EXISTS questions_pets (question_id INTEGER, pet_id INTEGER, FOREIGN KEY (question_id) REFERENCES questions(id), FOREIGN KEY (pet_id) REFERENCES pets(id));"]

    # execute the query
    for q in query:
        cursor.execute(q)
        conn.commit()
    # start the game
    # let's preset the table with some data if no data is present
    # the data is fror the pet game

    query = {
        "pets(id, name)": [
            [1, "dog"],
            [2, "cat"],
            [3, "bird"],
            [4, "fish"],
            [5, "hamster"],
            [6, "rabbit"],
            [7, "turtle"],
            [8, "snake"],
            [9, "lizard"],
            [10, "chicken"],
            [11, "pig"],
            [12, "cow"],
            [13, "horse"],
            [14, "sheep"],
            [15, "goat"],
            [16, "duck"],
            [17, "turkey"]
        ],
        "questions(id, question)": [
            [1,"Does it have fur?"],
            [2,"Does it have wings?"],
            [3,"Does it have scales?"],
            [4,"Does it have fins?"],
            [5,"Does it have legs?"],
            [6,"Does it have a tail?"],
            [7,"Does it have a shell?"],
            [8,"Does it have a mane?"],
            [9,"Does it have a horn?"]
        ],
        "questions_pets(question_id, pet_id)": [
            [1, 1],[1, 2],[1, 3],[1, 5],[1, 6],[1, 10],[1, 12],[1, 13],[1, 14],[1, 15],[1, 16],[1, 17],
            [2, 3],[2, 10],[2, 16],[2, 17],
            [3, 4],[3, 8],[3, 9],
            [4, 4],
            [5, 1],[5, 2],[5, 3],[5, 5],[5, 6],[5, 7],[5, 9],[5, 10],[5, 11],[5, 12],[5, 13],[5, 14],[5, 15],[5, 16],[5, 17],
            [6, 1],[6, 2],[6, 3],[6, 5],[6, 6],[6, 7],[6, 9],[6, 10],[6, 11],[6, 12],[6, 13],[6, 14],[6, 15],[6, 16],[6, 17],
            [7, 7],
            [8, 2],[8, 13],[8, 14],[8, 15],
            [9, 14],[9, 15]
        ]
    }
    # insert the data into the database
    for table_name, data in query.items():
        try:
            insert_query = f"INSERT INTO {table_name} VALUES ({', '.join(['?'] * len(data[0]))});"
            cursor.executemany(insert_query, data)
            conn.commit()
        except Exception as e:
            print(f"Error inserting the data into {table_name} reason: {sys.exc_info()[0]}, {e}")
            conn.rollback()

# let's start by getting the question with the average number of answers per question
# this will be the question that we will ask the user

# let's get all the current pets and their ids
query = "Select id, name from pets"
cursor.execute(query)
pets = cursor.fetchall()

pets_ids = [i[0] for i in pets]
prev_questions_ids = []
answers = []

while True:
    # ask one of the questions at random
    query = "Select question, id from questions where id not in ({});".format(", ".join(str(id) for id in prev_questions_ids))
    cursor.execute(query)
    question = cursor.fetchone()    

    if question is None:
        break
    # ask the question
    print(question[0], end=", ")
    # get the answer
    answer = input("y/n: ")
    # add the answer to the list of answers
    answers.append(answer)
    # check the answer
    
    query = f"Select pet_id from questions_pets where question_id = {question[1]} AND pet_id in ({', '.join(str(id) for id in pets_ids)});"
    cursor.execute(query)
    new_pets_ids = [i[0] for i in cursor.fetchall()]
    if answer == "y":
        # get the pets that have the answer
        pets_ids = new_pets_ids
    else:
        # get the pets that don't have the answer
        pets_ids = [i for i in pets_ids if i not in new_pets_ids]

    # add the question to the list of previous questions
    prev_questions_ids.append(question[1])
    # check if the list of pets is empty
    if len(pets_ids) == 0:
        break

# print the pets that are left
print("The pet is in: ")
query = "Select name from pets where id in ({});".format(", ".join(str(id) for id in pets_ids))
cursor.execute(query)
verifying_pets = cursor.fetchall()
for pet in verifying_pets:
    print(pet[0])
    # ask the user if the pet is in the list
answer = input("Is the pet in the list? y/n: ")

if answer == "y":
    if len(verifying_pets) == 1:
        print("I guessed the pet!")
    else: 
        print("what question could i ask to know the pet?")
        question = input("question: ")
        # add the question to the database
        query = "INSERT INTO questions (question) VALUES (?);"
        cursor.execute(query, (question,))
        conn.commit()
        # get the question id
        query = "Select id from questions where question = ?;"
        cursor.execute(query, (question,))
        question_id = cursor.fetchone()[0]
        # get the pet id
        pet_id = input("What is the pet id? ")
        # add the questions that the pet has to the database
        query = "INSERT INTO questions_pets (question_id, pet_id) VALUES ({},{}) ON CONFLICT DO NOTHING;".format(question_id, pet_id)
        cursor.execute(query)
        conn.commit()
else:
    print("I didn't guess the pet!")
    print("is your pet in the list? {}".format(pets))
    answer = input("y/n: ")
    if answer == "y":
        # get the pet id
        pet_id = input("What is the pet id? ")
        # add the questions that the pet has to the database
        for question_id in prev_questions_ids:
            query = "INSERT INTO questions_pets (question_id, pet_id) VALUES ({},{}) ON CONFLICT DO NOTHING;".format(question_id, pet_id)
            cursor.execute(query)
            conn.commit()
    else:
        print("what's the pet name?")
        pet_name = input("pet name: ")
        # add the pet to the database
        query = "INSERT INTO pets (name) VALUES ('{}');".format(pet_name)
        cursor.execute(query)
        conn.commit()
        # get the pet id
        query = "Select id from pets where name = '{}';".format(pet_name)
        cursor.execute(query)
        pet_id = cursor.fetchone()[0]
        # add the questions that the pet has to the database
        for i in range(len(prev_questions_ids)):
            question_id = prev_questions_ids[i]
            if answers[i] == "y":
                query = "INSERT INTO questions_pets (question_id, pet_id) VALUES ({},{}) ON CONFLICT DO NOTHING;".format(question_id, pet_id)
                cursor.execute(query)
                conn.commit()
