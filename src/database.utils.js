
var mysql = require("mysql");

function queryNightLifeDatabase(queryString, queryParams, res, callBackFunction, queryErrorReturnCode) {
    try{
        var connection = mysql.createConnection({
          host     : 'localhost',
          user     : '****',
          password : '****',
          database : '******',
          multipleStatements : true
        });

        connection.query(queryString, queryParams, function(err, rows, fieldsData) {
            try{
                if (err) {
                  connection.end();
                  res.status(queryErrorReturnCode || 404).send();
                }
                callBackFunction(rows);
                connection.end();
            } catch(err){
                console.log(err);
                res.status(queryErrorReturnCode || 404).send();
            }
        });
    } catch(err){
        console.log(err);
        res.status(503).send();
    }
}

module.exports = {
    queryDatabase: queryNightLifeDatabase
};