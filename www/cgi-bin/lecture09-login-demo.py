#!/usr/bin/env python

import cgitb
import cgi
import sqlite3
import hashlib

def authenticate(username, password):
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()

    print '<!-- username: ' + username + ', password: ' + password + '-->'
    cursor.execute('SELECT * FROM users WHERE username=?;',
                             [username])
    # fetchone will return one 
    row = cursor.fetchone()

    if row:
        encrypted = row[1]
        salt = row[2]

        hasher = hashlib.md5()
        hasher.update(password)
        hasher.update(salt)

        digest = hasher.hexdigest()

        conn.close()

        return digest == encrypted
    else:

        results = cursor.execute("SELECT username FROM users;")
        for row in results:
            print '<!--' + str(row) + '-->'

        print '<!-- wrong number of rows returned -->'
        return False


cgitb.enable()

login_form = cgi.FieldStorage()

print 'Content-Type: text/html'
print # don't forget required blank line
print '''<html>
    <head>
        <title>Login Results</title>
    </head>
    <body>'''

username = login_form['username'].value
password = login_form['password'].value

if authenticate(username, password):
    print '<h1>User ' + username + ' has been successfully authenticated!</h1>'
else:
    print '<h1>Authentication failed!</h1>'

print '''
    </body>
</html>'''

