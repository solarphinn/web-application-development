#!/usr/bin/env python

'''
This is a modified version of the script from Lecture 04 that is hard coded to
query the orders table in the sushi.db database.
'''

import cgitb
import cgi
import sqlite3

cgitb.enable()

print 'Content-Type: text/html'
print


# does not use form data; these values are hard coded
database_name = 'sushi.db'
table_name = 'orders'

conn = sqlite3.connect(database_name)
c = conn.cursor()

for r in c.execute('select * from ' + table_name + ';'):
    print r
    print "<BR/>"
print

conn.close()


