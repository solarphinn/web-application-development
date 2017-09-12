#!/usr/bin/python

import cgitb
import cgi

cgitb.enable()

print "Content-type: text/html"
print ""

the_form = cgi.FieldStorage()

print "<!--"

for key in the_form.keys():
  value = the_form[key]
  if isinstance(value, list):
    print key + "=[" 
    for element in value:
      print element.value + " "
    print "]"
  else:
    print key + " " + the_form[key].value

print "-->"

name = the_form["name"].value
fries = the_form["fries"].value
rolls_list = the_form["roll_type"]
rolls = []
for element in rolls_list:
  rolls.append(element.value)

print '''<html>
  <head>
    <title>Tasty Sushi Company Order Record</title>
  </head>
  <body>
    <h1>Order Recieved!</h1>

    <p>'''

print name

print ''', your tasty order of'''

print str(rolls)

print '''is on its way. And don't worry, we didn't forget the fries ('''

print fries 

print ''').</p></body></html>'''  
