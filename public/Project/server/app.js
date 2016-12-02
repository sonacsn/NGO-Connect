module.exports = function(app,pool) {
    console.log("In mySQL app.js")


    var modeluser = require("./models/user.model.js")(pool);
    require("./services/user.service.server.js")(app, modeluser);









    /*pool.query({
        sql: "SELECT pr.*,ngo.name as NGO_name,ngo.type,ngo.memberSize,ngo.causeDescription FROM Participation as pa,Project as pr,NGO  " +
        "WHERE participatedBy = ? AND pa.participatesIn=pr.id AND NGO.id=pr.ngo",
        timeout: 4000 ,    //4 secs
        values: [1]
    }, function (error, results, fields) {
        if(error!=null) {
            console.log("error connecting")
            console.log(error)
           // deferred.reject(error);
        }
        else{
            console.log('The ids of projects are: ',results);

           // deferred.resolve(results);
        }
    });*/



/*

   var user= { name: 'ssss',
        username: 'ssss',
        password: 'ssss',
        type: 'CommunityBased',
        location: 'ssss',
        causeDescription: 'ssssssssssssssssssssssssssss' }


    var query = pool.query('INSERT INTO NGO SET ?', user, function(err, result) {

        if(err!=null) {
            console.log(err)
        }
        else {
            console.log('The solution is: ',result);
            user.id=result.insertId;
            console.log(user)

        }

    });*/

  /*  pool.query('SELECT * FROM NGO', function(err, rows, fields) {
        if (err) throw err;
        console.log('The solution is: ',rows);
    });*/
  /*  pool.query({
        sql: 'SELECT * FROM `NGO` WHERE `location` = ?',
        timeout: 40000, // 40s
        values: ['New York']
    }, function (error, results, fields) {
        console.log('The solution is: ',results[0]);
    });*/

    /*var post  = {id: 4, firstname: 'shiva', lastname: 'singh', gender: 'Male',
        age: '54', email: 'shiva@cool.com',occupation:'freedomfighter'};
    var query = pool.query('INSERT INTO Person SET ?', post, function(err, result) {

        console.log('The insertion is: ',result);
    });*/

   /* pool.query({
        sql: 'SELECT * FROM `Person` WHERE `firstName`=?',
        timeout: 40000,
        values: ['shiva']
    }, function (error, results, fields) {

        results[0].type='Volunteer';
        console.log('The solution is: ',results[0]);
    });*/

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







