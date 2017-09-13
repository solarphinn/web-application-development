import sqlite3


conn = sqlite3.connect("superheroes.db")

cursor = conn.cursor()

cursor.execute('DROP TABLE IF EXISTS superheroes')

cursor.execute('CREATE TABLE IF NOT EXISTS superheroes(last_name varchar(100),first_name varchar(100),hero_name varchar(100))')

cursor.execute('INSERT INTO superheroes VALUES("Parker", "Peter","Spider-Man")')
cursor.execute('INSERT INTO superheroes values("Wayne", "Bruce","Batman")')
cursor.execute('INSERT INTO superheroes values("Curry", "Arthur", "Aquaman")')

rows = cursor.execute('SELECT * FROM superheroes')

for row in rows:
  print row
  print ''

conn.commit()
conn.close()
