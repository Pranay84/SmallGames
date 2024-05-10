const {Client} = require('pg')

const client = new Client({
    host: 'localhost',
    database: 'FirstTrial',
    user: 'postgres',
    password: 'Pranay',
    port: 5432
})

module.exports = client