var mysql = require('mysql');
// npm install mysql-migrations
var migration = require('mysql-migrations');


var connection = mysql.createPool({
    connectionLimit : 10,
    host : "localhost",
    user : "root",
    password : process.env.PASSWORD,
    database : "BlogAppDB"

})


migration.init(connection, __dirname + "/migrations",function(){
    console.log("finished running migrations");
})


// Run in terminal for create tabal in db
// node migration.js add migration create_table_users


module.exports = connection;