const express = require("express");
const app = express();
const pg = require("pg");

var pgPool = new pg.Pool({
    database: "database_development",
    user: "postgres",
    password: "postgres",
    host: "localhost",
    port: 5432,
});

app.get("/", function (req, res) {
    res.send("Hello World!");
});

app.post("/create", function (req, res) {
    var query = {
        text:
            'INSERT INTO public."TestClasses" (id, attr1, "createdAt", "updatedAt") VALUES($1, $2, current_timestamp, current_timestamp)',
        values: [10000, "test"],
    };

    pgPool.connect(function (err, client) {
        if (err) {
            console.log(err);
        } else {
            client
                .query(query)
                .then(() => {
                    res.send("Data Created.");
                })
                .catch((e) => {
                    console.error(e.stack);
                });
        }
    });
});

app.listen(3000, () => console.log("Example app listening on port 3000!"));