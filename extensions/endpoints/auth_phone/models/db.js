const { Pool, Client } = require('pg');

const client = new Client({
    user: process.env.DB_USER,
    host:  process.env.DB_HOST,
    database:  process.env.DB_DATABASE,
    password:  process.env.DB_PASSWORD,
    port:  process.env.DB_POST,
});

console.log(process.env.DB_USER);


// client connection
client.connect(err => {
    if(!err)
    {
        console.log('DB Connected successfully.')
    }else{
        console.log('THERE was a problem in db connection.');
    }
});

module.exports = client;