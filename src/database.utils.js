
var mysql = require("mysql");

function queryNightLifeDatabase(queryString, queryParams, callBackFunction) {
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : '****',
        password : '****',
        database : '******',
        multipleStatements : true
    });

    connection.query(queryString, queryParams, (err, rows) => {
        if (err) {
            console.error(err);
            callBackFunction();
        } else {
            callBackFunction(rows);
        }
        connection.end();
    });
}

module.exports = {
    queryDatabase: queryNightLifeDatabase
};