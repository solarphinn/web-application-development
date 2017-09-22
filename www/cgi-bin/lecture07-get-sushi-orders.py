#!/usr/bin/env python

# Lecture 07 - jQuery and Ajax

import cgitb
import cgi
import sqlite3
import json  # used to send data back in JSON format

cgitb.enable()  # enable debugging output in some cases

print "Content-type: application/json"
# without printing a blank line, the "end of script output before headers"
# error will occur
print

form = cgi.FieldStorage()

customer_name = form['customer_name'].value # don't forget the .value

conn = sqlite3.connect('sushi.db')
cursor = conn.cursor()

# dictionary to store the response name/value pairs before JSON conversion
data = {}

for order in cursor.execute("SELECT * FROM orders WHERE name=?;",
                            [customer_name]):

    data['name'] = order[0]
    data['fries'] = order[1]
    data['rolls'] = order[2]
    data['phone'] = order[3]
    data['credit_card'] = order[4]

    print json.dumps(data)










