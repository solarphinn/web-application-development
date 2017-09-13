import sqlite3


conn = sqlite3.connect("superheroes.db")

cursor = conn.cursor()

cursor.execute('DROP TABLE IF EXISTS superheroes')

cursor.execute('CREATE TABLE IF NOT EXISTS superheroes(last_name varchar(100),first_name varchar(100),hero_name varchar(100))')

go = "y"
while go == "y":
  last = raw_input("Enter last name: ")
  first = raw_input("Enter first name: ")
  super = raw_input("Enter super hero name: ")
  cursor.execute('INSERT INTO superheroes VALUES(?,?,?)',(last,first,super))
  go = raw_input("Enter 'y' to continue: ")


rows = cursor.execute('SELECT * FROM superheroes')

for row in rows:
  print row
  print ''

conn.commit()
conn.close()
