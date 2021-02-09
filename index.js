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

const aptask_query = "INSERT INTO vtm_approval_check_task (group_id) values ($1)";

pg.connect()
    .then(() => pg.query(aptask_query, [ network_id ]))
    .then("select * from vtm_approval_check_task")
    .then(results => console.table(results.rows))
    .catch((e => console.log(e)))
    .finally((() => pg.end()));
