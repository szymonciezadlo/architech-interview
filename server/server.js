const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const fs = require('fs');

const basePath = 'usersBase.txt';
const app = express();
const hostname = '127.0.0.1';
const port = 3001;
const saltRounds = 10;
var jsonParser = bodyParser.json()

app.use(cors())
app.post('/signin', jsonParser, (req, res) => {
    const { username, password } = req.body;
    if (username && password && checkCredentials(username, password)) {
        fs.readFile(basePath, 'utf-8', (err, data) => {
            if (err) {
                throw err;
            }
            if (!data.includes(username)) {
                createUser(username, password);
                res.status(201).json({ msg: "Account registered!" });
            }
            else {
                res.status(403).json({ msg: "Username already taken!" });
            }
        });

    } else {
        res.status(403).json({ msg: "Bad Credentials" });
    }
})

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

function createUser(username, password) {
    bcrypt.hash(password, saltRounds, function (err, hash) {
        writeUser(username, hash);
    });
}

function writeUser(username, hash) {
    users = fs.createWriteStream(basePath, {
        flags: 'a'
    });
    users.write(username + ":" + hash + "\n");
}

function checkCredentials(username, password) {
    for (i = 0; i < username.length; i++) {
        let code = username.charCodeAt(i);
        if (!(code > 47 && code < 58) && // numeric (0-9)
            !(code > 64 && code < 91) && // upper alpha (A-Z)
            !(code > 96 && code < 123)) { // lower alpha (a-z)
            return false;
        }
    }
    let isNumber, isCapital, isAlpha;
    for (i = 0; i < password.length; i++) {
        let code = password.charCodeAt(i);
        if (code > 47 && code < 58) {
            isNumber = true;
        }
        else if (code > 64 && code < 91) {
            isCapital = true;
        }
        else if (code > 96 && code < 123) {
            isAlpha = true;
        }
        else {
            return false;
        }
    }
    if (!isNumber || !isCapital || !isAlpha) {
        return false;
    }
    return true;
}