const { Client } = require("pg");
var dbopt = {
    user: "sdnspf",
    password: "$SdnsPf",
    host: "localhost",
    port: "5432",
    database: "sdnspf-vvtdb"
}
const pg = new Client(dbopt);

var network_id = 'aaa'

pg.connect()
    .cache((e => console.log(e)));

const aptask_query = "INSERT INTO vtm_approval_check_task (group_id) values ($1)";
pg.query(aptask_query, [ network_id ])
    .then("select * from vtm_approval_check_task")
    .then(results => console.table(results.rows))
    .cache(err => {
        console.log(err);
        pg.end();
    })
    .then(() => {
        pg.end();
    });
