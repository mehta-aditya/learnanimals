
import sqlite3

# Connect to an sqlite database file
conn = sqlite3.connect('../assets/database/animals.db')

# Create a cursor object
cursor = conn.cursor()

def custom_input(arg):
    user_input = input(arg)
    if user_input == "Q":
        return ""
    else: 
        return user_input

#main loop
while True:
    animal = custom_input("Animal Name: ")
    if animal == "": break
    uri = custom_input("URI: ")
    if uri == "": break
    family = custom_input("Family: ")
    if family == "": break
    difficulty = custom_input("Difficulty: ")
    if difficulty == "": break
    
    # Execute an INSERT statement
    cursor.execute("INSERT INTO Animal (animal, uri, family, difficulty) VALUES (?, ?, ?, ?)", (animal, uri, int(family), difficulty))

    # Commit the changes to the database
    conn.commit()
    print("ADDED TO DATABASE")
    print("________________________")

# Close the connection
conn.close()




