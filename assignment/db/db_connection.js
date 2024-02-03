const mysql = require('mysql2/promise');

const dbConfig = {
    host:'localhost',
    user:'root',
    password:"Kalash@123",
    database:'hotwax'
};

const db = mysql.createPool(dbConfig);

module.exports = { db };
