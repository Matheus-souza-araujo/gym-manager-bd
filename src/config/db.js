const { Pool } = require("pg")// com o pool não precisa ficar fazer login e senha

module.exports = new Pool({
    user:"postgres",
    password: "postgres",
    host: "localhost",
    port: 5432,
    database: "gymmanager"

})