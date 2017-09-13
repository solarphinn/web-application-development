#!/usr/bin/env python

import sqlite3

conn = sqlite3.connect('sushi.db')

c = conn.cursor()



c.execute('DROP TABLE IF EXISTS orders')

c.execute('CREATE TABLE IF NOT EXISTS orders(name varchar(100) primary key, fries varchar(10), rolls varchar(100), phone varchar(100), credit_card varchar(100))')

c.execute('INSERT INTO orders VALUES("Bobby", "yes", "Ice Cream,California", "123-456-7890", "1234-5678-9012-3456")')


conn.commit()

conn.close()

print 'Content-Type: text/html'
print
print '''<html>
    <head>
        <title>Created Database</title>
    </head>
    <body>
        Database created successfully.
    </body>
</html>'''

