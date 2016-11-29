module.exports = function(app,pool) {
    console.log("In mySQL app.js")

    var modeluser = require("./models/user.model.js")(pool);
    require("./services/user.service.server.js")(app, modeluser);

/*
  /!*  pool.query('SELECT * FROM NGO', function(err, rows, fields) {
        if (err) throw err;
        console.log('The solution is: ',rows);
    });*!/
    pool.query({
        sql: 'SELECT * FROM `NGO` WHERE `location` = ?',
        timeout: 40000, // 40s
        values: ['New York']
    }, function (error, results, fields) {
        console.log('The solution is: ',results[0]);
    });
*/

};

/*
module.exports = function(app,mongoose,db) {

    var modeluser = require("./models/user.model.js")(mongoose, db);
    require("./services/user.service.server.js")(app, modeluser);

     var modelforms = require("./models/form.model.js")(mongoose, db);
    require("./services/form.service.server.js")(app, modelforms);

    require("./services/field.service.server.js")(app, modelforms);
};
*/

//-----------------------------------------------------

// HELP CODE


/*




 var options = {
 user:'root',
 password:'rahul',
 server:'localhost',
 port:3306,
 datatase:'project'
 };

 mysql.connect(options).then(function() {
 console.log("connection completed");

 }).catch(function(err) {
 console.log("connection error"+err);
 // ... connect error checks
 })

 "mssql://root:rahul@localhost:3306/project"

 var mssql = require('mssql');
 var options = {
 user:'root',
 password:'rahul',
 server:'localhost',
 port:3306,
 datatase:'project'
 };
 mssql.connect(options);
 */

/* var modeluser = require("./models/user.model.js")(mongoose, db);
 require("./services/user.service.server.js")(app, modeluser,otherusermodel);

 var modelforms = require("./models/form.model.js")(mongoose, db);
 require("./services/form.service.server.js")(app, modelforms);

 require("./services/field.service.server.js")(app, modelforms);*/







