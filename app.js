const mysql = require("mysql2");
const express = require("express");
const bodyParser = require("body-parser");
const Connection = require("mysql2/typings/mysql/lib/Connection");
const router = express.Router();

const port = 3000;

//express server setup
const app = express();
app.use(express.static(__dirname + "/client"));

app.get("/", function (req, res) {
    res.sendFile("client/index.html");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//handle login attempts server side
// eslint-disable-next-line no-unused-vars
router.post("/login", (req, res) => {
    let data = req.body;
    
    let pattern = /\W/; //Checks if character is a non word character ignors A-Z a-z and _
    if (pattern.test(data.username)) {
        res.sendStatus(422); //not sure what response code to use here
        return;
    }

    Connection.createQuery( "SELECT * FROM logins WHERE `name` = ? AND `password` = ?",
        [data.username, data.password],
        function(err, results) {
            console.log(results);
            res.sendStatus(200);
        });
    
});

app.use("/", router);

app.listen(port);
console.log(`Server listening on port ${port}`);

//mysql server connection

const con = mysql.createConnection({
    host: "localhost",
    user: "test",
    password: "testing",
    database: "authentification2"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected");
});