const { Client } = require("pg");
let dbopt = {
    user: "sdnspf",
    password: "$SdnsPf",
    host: "localhost",
    port: "5432",
    database: "sdnspf-vvtdb"
}
const pg = new Client(dbopt);

let network_id = 'e9dfbcf5-553a-4866-b04a-ecba568c8f49';

const aptask_query = "INSERT INTO vtm_approval_check_task (group_id) values ($1)";

pg.connect()
    .catch(e => {
        console.log(e);
        pg.end();
    });

pg.query(aptask_query, [ network_id ])
    .cache(e => console.log(e));

const query = "SELECT DISTINCT c.vm_ip_address AS vm_ip_address " +
    "FROM common_customer_master AS c, sdns_group_master AS g " +
    "WHERE c.customer_id = g.customer_id AND g.group_id=$1";
pg.query(query, [ network_id ])
    .then(dbresult => {
//		  console.log("DB result=", dbresult);
        if (dbresult.rowCount <= 0) {
            console.log("customer_id or vm_ip_address not found.")
            return;
        }
        const vm_ip_address = dbresult.rows[0].vm_ip_address;
        if (!vm_ip_address) {
            console.log("customer_id or vm_ip_address not found.")
            return;
        }
        console.log("Triggerring VM(" + vm_ip_address + ")'s API");
    })
    .catch(err => {
        console.error('Query error.', err.stack);
        pg.end();
    })
    .then(() => {
        pg.end();
    });
