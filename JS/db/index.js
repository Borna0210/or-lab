const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'LAB_OR',
    password: 'bazepodataka',
    port: 5433,
});

pool.connect(function (err) {
    if (err) throw err;
    console.log('Database is connected successfully !');
});


module.exports = pool;

