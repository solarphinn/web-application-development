#!/usr/bin/env python

import cgitb
import cgi
import sqlite3

cgitb.enable()

sushi_form = cgi.FieldStorage()

print 'Content-Type: text/html'
print

print '''<html>
  <head>
    <title>Lecture 4 Demo Python Script</title>

    <style type="text/css">
      h1 {
          font-size: 100px;
          font-family: monospace;
      }

      .red_text {
          color: red;
      }
    </style>

  </head>
  <body>
'''

# this is here for debugging
print '<!--'
for key in sushi_form.keys():
    value = sushi_form[key]
    if isinstance(value, list):
        print key + ' '
        for element in value:
            print element.value + ' '
    else:
        print key + "=" + sushi_form[key].value + "<BR/>"
print '-->'

name = sushi_form['name'].value
fries = sushi_form['fries'].value
rolls = []
if sushi_form.has_key('roll_type'):
    for roll in sushi_form['roll_type']:
        rolls.append(roll.value)

ccn = sushi_form['credit_card'].value
phone = sushi_form['phone'].value

conn = sqlite3.connect('sushi.db')
c = conn.cursor()

c.execute('insert into orders values (?,?,?,?,?)', (name, fries, str(rolls), phone, ccn))

conn.commit()
conn.close()

print '<h1>You Ordered Some Sushi!!!!'

print '<h2>Your <span class="red_text">' + str(rolls) + '</span> sushi <span class="red_text">'

if fries == 'yes':
    print 'WITH'
else:
    print 'without D:'

print '</span> fries will be carefully crafted by our chefs soon.  Your credit card with number <span class="red_text">' + ccn + '</span>'
print ' will be charged.  If there is a problem, we\'ll call you at <span class="red_text">' + phone + '</span>!'

print '''
  </body>
</html>

'''





