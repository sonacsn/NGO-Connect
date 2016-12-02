var q = require("q");


// Require the bcrypt package
var bcrypt = require('bcrypt-nodejs');
// Create a password salt
var salt = bcrypt.genSaltSync(10);

module.exports = function(pool) {

  /*  var UserSchema = require("./user.schema.server.js")(mongoose);

    var UserModel = mongoose.model("UserModel", UserSchema);*/

    var api = {
        findUserByCredentials: findUserByCredentials,
        findAllProjects:findAllProjects,
        addUser: addUser,
        FindById: FindById,
        deleteProjectById:deleteProjectById,
        createProject:createProject,
        updateProject:updateProject,
       Update: Update,
        deleteVolunteerProjectById:deleteVolunteerProjectById,
        //--------------------------------------
        getVolunteers:getVolunteers,
        changeRequestStatus:changeRequestStatus,
        inviteVolunteers:inviteVolunteers,
        getProbProjects:getProbProjects,
        sendInvite:sendInvite,
        getAllInvitations:getAllInvitations,
        //--------- to be Modified ---------------
       Delete: Delete,
       findUserByUsername: findUserByUsername,
       FindAll: FindAll,
       Create: Create

    };

    return api;
    //----------------------------

    function getAllInvitations(user) {


        console.log("In sendInvite model.js");

        var deferred = q.defer();
        var mysql = require('mysql');

        if(Array.isArray(user)){
         console.log("ZZZZZZZZZZZZZ")

            var q2 = pool.query('Select pr.*,NGO.name as NGO_name,NGO.type,NGO.memberSize,NGO.causeDescription ' +
                ',req.status ' +
                'from Request req,Project as pr,NGO '+
                'where req.requestTo = NGO.id and req.requestedFor = pr.id and req.requestedBy =? '
                ,[user[1].id],
                function (err, res) {

                    if (err != null) {
                        console.log("error connecting")
                        console.log("ZZZZZZZZZZZZZ")
                        console.log(err)
                        deferred.reject(err);
                    }
                    else {
                        console.log('The ZZZZZZZZ solution is: ', res);
                        deferred.resolve(res)
                    }
                });
        }
        else{
            var q2 = pool.query('Select i.status, p.firstName,p.lastName,pr.name,pr.id as projectId,p.id as personId from Invitation i,Person p,Project pr '+
                'where i.invitedTo = p.id and i.invitedFor = pr.id and i.invitedBy =? '
                ,[user.id],
                function (err, res) {

                    if (err != null) {
                        console.log("error connecting")
                        console.log(q2)
                        console.log(err)
                        deferred.reject(err);
                    }
                    else {
                        console.log('The solution is: ', res);
                        deferred.resolve(res)
                    }
                });
        }
        return deferred.promise;
    }

    function sendInvite(vol) {

        console.log("In sendInvite model.js");

        var deferred = q.defer();
        var mysql = require('mysql');
        var status = 'pending';
        console.log(vol.ngoId,vol.id,vol.projectId,status,vol.type)

        if(vol.type=="NGO"){

            console.log("SEND INVITE NGO")
            var q2 = pool.query('INSERT INTO Invitation VALUES (?,?,?,?)',[vol.ngoId,vol.id,vol.projectId,status],
                function (err, res) {

                    if (err != null) {
                        console.log("error connecting SEND INVITE NGO")
                        console.log(err)
                        deferred.reject(err);
                    }
                    else {
                        console.log('The solution SEND INVITE NGO: ', res);
                        deferred.resolve(res)
                    }
                });
        }
        else
        {

            console.log("SEND INVITE VOLUNTEER")
            var q2 = pool.query('INSERT INTO Request VALUES (?,?,?,?)',[vol.id,vol.ngoId,vol.projectId,status],
                function (err, res) {

                    if (err != null) {
                        console.log("error connecting SEND INVITE VOLUNTEER")
                        console.log(err)
                        deferred.reject(err);
                    }
                    else {
                        console.log('The solution SEND INVITE VOLUNTEER: ', res);
                        deferred.resolve(res)
                    }
                });
        }


        return deferred.promise;
    }

    function getProbProjects(vol) {

        console.log("In getProbProjects model.js");

        var deferred = q.defer();
        var mysql = require('mysql');

        var q2 = pool.query('select * from Project pr'+
            ' where not exists'+
            ' (select * from Invitation where pr.id= invitedFor and '+
            ' invitedTo=? and status in (\'pending\',\'approved\'))'+
            ' and not exists'+
            ' (select * from Request where pr.id = requestedFor and '+
            ' requestedBy = ? and status in (\'pending\',\'approved\'))' +
            ' and ngo = ?',[vol.id,vol.id,vol.ngoId], function (err, res) {

            if (err != null) {
                console.log("error connecting")
                console.log(query)
                console.log(err)
                deferred.reject(err);
            }
            else {
                console.log('The solution is: ', res);
                deferred.resolve(res)
            }
        });
        return deferred.promise;
    }

    function inviteVolunteers(user) {
        console.log("In inviteVolunteers model.js");

        var deferred = q.defer();
        var mysql = require('mysql');

        if (Array.isArray(user)) {

            var query = pool.query("select p.*,NGO.name as NGO_name,NGO.type,NGO.memberSize,NGO.causeDescription " +
                "from Project p, Ngo " +
                "where p.ngo = Ngo.id " +
                "and not exists " +
                "(select * from Invitation where invitedFor = p.id " +
                "and invitedTo= ? and status in ('pending','approved')) " +
                "and not exists " +
                "(select * from Request  where requestedFor = p.id " +
                "and requestedBy = ? and status in ('pending','approved')) ",[user[1].id, user[1].id],
                function (err, res) {

                console.log("inviteVolunteers Volunteer",query)
                if (err != null) {
                    console.log("error connecting inviteVolunteers Volunteer")
                    console.log(err)
                    deferred.reject(err);
                }
                else {
                    console.log('The solution inviteVolunteers Volunteer: ', res);
                    deferred.resolve(res)
                }
            });


        }
        else {
            var query = pool.query('Select * from Person p, Volunteer v where p.id = v.id', function (err, res) {

                if (err != null) {
                    console.log("error connecting")
                    console.log(query)
                    console.log(err)
                    deferred.reject(err);
                }
                else {
                    console.log('The solution is: ', res);
                    deferred.resolve(res)
                }
            });


        }

        return deferred.promise;

    }


    function changeRequestStatus(volunteer){

        var deferred = q.defer();
        var mysql = require('mysql');

        if(volunteer.volunteerCount=== undefined)
        {

            var query = pool.query('Update Request SET status = ? WHERE requestedBy = ? and requestTo =  ? and requestedFor = ? ',
                [volunteer.status,volunteer.personId,volunteer.id,volunteer.projectId],function(err,res){

                    if(err!=null) {
                        console.log("error connecting")
                        console.log(err)
                        deferred.reject(err);
                    }
                    else {
                        console.log('The solution is: ', res);
                        if(volunteer.status=='approved'){

                            var participation = { participatesIn:volunteer.projectId,
                                participatedBy:volunteer.personId };
                            console.log("VVVVVVVV",participation)
                            pool.query({
                                sql:  'INSERT INTO Participation SET ?',
                                timeout: 4000 ,    //4 secs
                                values: [participation]
                            }, function (error, results, fields) {
                                if(error!=null) {
                                    console.log(" error VVVVVVVV",participation)
                                    console.log(error)
                                    deferred.reject(error);
                                }
                                else{
                                    console.log(" solution VVVVVVVV",results)
                                    deferred.resolve(results);
                                }
                            });
                        }
                        deferred.resolve(res)
                    }
                });



        }


        else{
            console.log("VVVVVVVVVVVVVVVV",volunteer.id)
            //var status = 'approved';
            //console.log("App req in model",volunteer.id,volunteer.personId,volunteer.projectId,status)
            var query = pool.query('Update Invitation SET status = ? WHERE invitedBy = ? and invitedTo =  ? and invitedFor = ? ',
                [volunteer.status,volunteer.ngo,volunteer.personId,volunteer.id],function(err,res){
                    console.log(query)
                    if(err!=null) {
                        console.log("error connecting")
                        console.log(query)
                        console.log(err)
                        deferred.reject(err);
                    }
                    else {
                        console.log('The solution is: ', res);
                        if(volunteer.status=='approved'){
                            var participation = { participatesIn:volunteer.id,
                                participatedBy:volunteer.personId };
                            pool.query({
                                sql:  'INSERT INTO Participation SET ?',
                                timeout: 4000 ,    //4 secs
                                values: [participation]
                            }, function (error, results, fields) {
                                if(error!=null) {
                                    console.log("error connecting")
                                    console.log(error)
                                    deferred.reject(error);
                                }
                                else{
                                    console.log('The solution is: ',results);
                                    console.log("length works",results.length)
                                    deferred.resolve(results);
                                }
                            });
                        }
                        deferred.resolve(res)
                    }
                });
        }

        return deferred.promise;
    }

    function getVolunteers(user) {
        var deferred = q.defer();
        var mysql = require('mysql');

        console.log("in get Volunteers model.js")
        console.log(user)

        if(Array.isArray(user)){

            console.log(user)
            // var status = 'Pending'
            var query = pool.query('select pr.*,NGO.name as NGO_name,NGO.type ' +
                ',NGO.memberSize,NGO.causeDescription,inv.invitedTo as personId ' +
                'from Project as pr,Invitation as inv,NGO ' +
                'where inv.invitedBy=NGO.id ' +
                'AND pr.id=inv.invitedFor ' +
                'AND inv.invitedTo = ? ' +
                'AND NGO.id=pr.ngo ' +
                'AND inv.status=? ',[user[1].id,'pending'],function(err,res){
                if(err!=null) {
                    console.log("error connecting")
                    console.log(err)
                    deferred.reject(err);
                }
                else {
                    console.log('The solution is: ', res);
                    deferred.resolve(res)
                }
            });

        }
        else{
            console.log(user)
            // var status = 'Pending'
            var query = pool.query('Select r.requestTo as id,p.id as personId,r.status,p.firstName,p.lastName,p.gender,p.email,p.age,p.occupation,v.interests,pr.name,pr.id as projectId'+
                ' from Request r,Person p ,Volunteer v,Project pr'+
                ' where r.requestedBy = p.id'+
                ' and p.id = v.id'+
                ' and pr.id = r.requestedFor'+
                ' and r.requestTo=?',[user.id],function(err,res){
                if(err!=null) {
                    console.log("error connecting")
                    console.log(query)
                    console.log(err)
                    deferred.reject(err);
                }
                else {
                    console.log('The solution is: ', res);
                    deferred.resolve(res)
                }
            });


        }
        return deferred.promise;
    }


    //---------------------------------
    function deleteVolunteerProjectById(userId,projectId) {

        var deferred = q.defer();
        console.log("userid in deleteVolunteerProjectById model :  ",projectId)
        var mysql = require('mysql');

        /*var sql = "SELECT * FROM ?? WHERE ?? = ? ";
         var inserts = [type, 'id', userId];
         console.log(" searcehd value:", inserts)
         sql = mysql.format(sql, inserts);*/

        // if(type=="NGO")
        {

            pool.query({
                sql: "DELETE FROM Participation WHERE participatesIn = ? AND participatedBy = ?",
                timeout: 4000 ,    //4 secs
                values: [projectId,userId]
            }, function (error, results, fields) {
                if(error!=null) {
                    console.log("error connecting")
                    console.log(error)
                    deferred.reject(error);
                }
                else{
                    console.log('The solution is: ',results);
                    console.log("length works",results.length)
                    deferred.resolve(results);
                }
            });
        }

        return deferred.promise;

    }


    function Update(user) {

        var deferred = q.defer();
        var mysql = require('mysql');
        if(Array.isArray(user)) {
            var id = user[0].id;
            var query = pool.query('Update Person SET ? WHERE id = ?',[user[0],id],function(err,res){
                if(err!=null) {
                    console.log("error connecting")
                    console.log(err)
                    deferred.reject(err);
                }
                else {
                    console.log('The solution is: ',res);

                    var q2 = pool.query('Update Volunteer SET ? WHERE id = ?',[user[1],id],function(err,result){
                        if(err!=null) {
                            console.log("error connecting")
                            console.log(err)
                            deferred.reject(err);
                        }
                        else {
                            console.log('The solution is: ', result);
                            deferred.resolve(user)
                        }
                    });
                }
            });
        }
        else{
            var id = user.id;
            var query = pool.query('Update NGO SET ? WHERE id = ?',[user,id],function(err,res){
                if(err!=null){
                    console.log("error connecting update user")
                    console.log(err)
                    deferred.reject(err);
                }
                else{
                    console.log('the solution is: ',res);
                    deferred.resolve(user)
                }
            });
        }
        return deferred.promise;


    }


    function updateProject(project){

        var deferred = q.defer();
        console.log("userid in createProject model :  ",project,project.id)
        var mysql = require('mysql');

        var id=project.id
        delete project.id;
        /*var sql = "SELECT * FROM ?? WHERE ?? = ? ";
         var inserts = [type, 'id', userId];
         console.log(" searcehd value:", inserts)
         sql = mysql.format(sql, inserts);*/

        // if(type=="NGO")
        {

            pool.query({
                sql:  'UPDATE Project SET ? WHERE id = ? ',
                timeout: 4000 ,    //4 secs
                values: [project,id]
            }, function (error, results, fields) {
                if(error!=null) {
                    console.log("error connecting")
                    console.log(error)
                    deferred.reject(error);
                }
                else{
                    console.log('The solution is: ',results);
                    console.log("length works",results.length)
                    deferred.resolve(results);
                }
            });
        }

        return deferred.promise;

    }



    function createProject(project) {

        var deferred = q.defer();
        console.log("userid in createProject model :  ",project)
        var mysql = require('mysql');

        /*var sql = "SELECT * FROM ?? WHERE ?? = ? ";
         var inserts = [type, 'id', userId];
         console.log(" searcehd value:", inserts)
         sql = mysql.format(sql, inserts);*/

        // if(type=="NGO")
        {

            pool.query({
                sql:  'INSERT INTO Project SET ?',
                timeout: 4000 ,    //4 secs
                values: [project]
            }, function (error, results, fields) {
                if(error!=null) {
                    console.log("error connecting")
                    console.log(error)
                    deferred.reject(error);
                }
                else{
                    console.log('The solution is: ',results);
                    console.log("length works",results.length)
                    deferred.resolve(results);
                }
            });
        }

        return deferred.promise;

    }



    function deleteProjectById(projectId)
    {

        var deferred = q.defer();
        console.log("userid in deleteProjectById model :  ",projectId)
        var mysql = require('mysql');

        /*var sql = "SELECT * FROM ?? WHERE ?? = ? ";
         var inserts = [type, 'id', userId];
         console.log(" searcehd value:", inserts)
         sql = mysql.format(sql, inserts);*/

       // if(type=="NGO")
        {

            pool.query({
                sql: "DELETE FROM Project WHERE id = ? ",
                timeout: 4000 ,    //4 secs
                values: [projectId]
            }, function (error, results, fields) {
                if(error!=null) {
                    console.log("error connecting")
                    deferred.reject(error);
                }
                else{
                    console.log('The solution is: ',results);
                    console.log("length works",results.length)
                    deferred.resolve(results);
                }
            });
        }

        return deferred.promise;

    }

function findAllProjects(userId,type){

    var deferred = q.defer();
    console.log("userid in findAllProjects model :"+userId,type)
    var mysql = require('mysql');

    /*var sql = "SELECT * FROM ?? WHERE ?? = ? ";
    var inserts = [type, 'id', userId];
    console.log(" searcehd value:", inserts)
    sql = mysql.format(sql, inserts);*/

    if(type=="NGO"){

        pool.query({
            sql: "SELECT * FROM Project WHERE ngo = ? ",
            timeout: 4000 ,    //4 secs
            values: [userId]
        }, function (error, results, fields) {
            if(error!=null) {
                console.log("error connecting")
                deferred.reject(error);
            }
            else{
                console.log('The solution is: ',results);
                console.log("length works",results.length)
                deferred.resolve(results);
            }
        });
    }
    else{

        pool.query({
            sql: "SELECT pr.*,ngo.name as NGO_name,ngo.type,ngo.memberSize,ngo.causeDescription FROM Participation as pa,Project as pr,NGO  " +
            "WHERE participatedBy = ? AND pa.participatesIn=pr.id AND NGO.id=pr.ngo",
            timeout: 4000 ,    //4 secs
            values: [userId]
        }, function (error, results, fields) {
            if(error!=null) {
                console.log("error connecting")
                console.log(error)
                 deferred.reject(error);
            }
            else{
                console.log('The ids of projects are: ',results);

                deferred.resolve(results);
            }
        });



    }

    return deferred.promise;

}


    function FindById(userId,type) {
        var deferred = q.defer();
        console.log("userid in model findbyid:"+userId,type)

        var mysql = require('mysql');
        console.log (userId,type)
        var sql = "SELECT * FROM ?? WHERE ?? = ? ";

        var inserts = [type, 'id', userId];
        console.log(" searcehd value:", inserts)

        sql = mysql.format(sql, inserts);

        if(type=="Volunteer"){

            pool.query({
                sql: sql,
                timeout: 40000
            }, function (error, results, fields) {
                console.log('The solution is: ',results);

                if(error!=null) {
                    console.log("error connecting")
                    deferred.reject(error);
                }
                else{
                    console.log("length works",results)
                    pool.query({
                        sql: 'SELECT * FROM `Person` WHERE `id` = ?',
                        timeout: 40000, // 40s
                        values: [userId]
                    }, function (error, results2, fields) {
                        if(error!=null) {
                            console.log("error connecting 2nd")
                            deferred.reject(error);
                        }
                        else{

                            console.log('The 2nd solution is: ',results2[0]);
                            console.log(results[0],results2[0])
                            var res=[results2[0],results[0]]
                            console.log(res)
                            deferred.resolve(res);
                        }

                    });


                }
            });


        }

        else{
            console.log("in else of findbyid")
            pool.query({
                sql: sql,
                timeout: 40000
            }, function (error, results, fields) {

                if(error!=null) {
                    console.log("error connecting")
                    deferred.reject(error);
                }
                else{
                    console.log("findbyId found result",results)

                    deferred.resolve(results[0]);
                }
            });

        }
        return deferred.promise;

    }




    function addUser(user) {
        //console.log("reached here...");
        var deferred = q.defer();
        var mysql = require('mysql');

        console.log(Array.isArray(user))


        if(Array.isArray(user))
        {
            pool.query({
                sql: 'SELECT * FROM `Volunteer` WHERE `username` = ?',
                timeout: 4000, // 40s
                values: user[1].username
            }, function (error, results, fields) {

                if(error!=null) {
                    console.log("error connecting add user ")

                    deferred.reject(error);
                }
                else if(results.length>0){
                    console.log('The solution is: ',results);
                    deferred.resolve(null);
                }
                else{

                    var query = pool.query('INSERT INTO Person SET ?', user[0], function(err, result) {

                        console.log('The insertion is: ',result);
                        if (result!=undefined) {
                            user[1].id=result.insertId;
                            user[0].id=result.insertId;
                            console.log(user[1])
                            var query1 = pool.query('INSERT INTO Volunteer SET ?', user[1],
                                function(err, result2) {


                                    if(err!=null) {
                                        console.log("error connecting")
                                        deferred.reject(error);
                                    }
                                    else{
                                        console.log('The insertion  is: ',result2);
                                        console.log('The returned value is: ',user);
                                        deferred.resolve(user);


                                    }

                                });
                        }

                        if(err!=null) {
                            console.log("error connecting")
                            deferred.reject(error);
                        }

                    });

                }
            });

        }

        else{
            console.log("NGO checking")
            pool.query({
                sql: 'SELECT * FROM `NGO` WHERE `username` = ?',
                timeout: 4000, // 40s
                values: user.username
            }, function (error, results, fields) {

                if(error!=null) {
                    console.log("error connecting")
                    console.log("error connecting")
                    deferred.reject(error);
                }
                else if(results.length>0){
                    console.log('The solution is: ',results);
                    deferred.resolve(null);
                }
                else{
                    console.log("NGO insert")
                    console.log(user)
                    var query = pool.query('INSERT INTO NGO SET ?', user, function(err, result) {

                        if(err!=null) {
                            console.log("error connecting")
                            console.log("error connecting")
                            deferred.reject(err);
                        }
                        else {
                            console.log('The solution is: ',result);
                            user.id=result.insertId;

                            console.log(user)
                            deferred.resolve(user);
                        }

                    });
                }
            });

        }


        return deferred.promise;

        //console.log(result.insertId);
    }



    function findUserByCredentials(username,password,type) {
        var deferred = q.defer();
        var mysql = require('mysql');
        console.log (username,password,type)
        var sql = "SELECT * FROM ?? WHERE ?? = ? AND ?? =?";

        var inserts = [type, 'username', username,'password',password];
        console.log("IN Volunteer", inserts)

        sql = mysql.format(sql, inserts);


        if(type=="Volunteer"){

            pool.query({
                sql: sql,
                timeout: 40000
            }, function (error, results, fields) {
                console.log('The solution is: ',results);

                if(error!=null) {
                    console.log("error connecting")
                    deferred.reject(error);
                }
                else{
                    console.log("length works",results)
                    pool.query({
                        sql: 'SELECT * FROM `Person` WHERE `id` = ?',
                        timeout: 40000, // 40s
                        values: [results[0].id]
                    }, function (error, results2, fields) {
                        if(error!=null) {
                            console.log("error connecting 2nd")
                            deferred.reject(error);
                        }
                        else{

                            console.log('The 2nd solution is: ',results2[0]);
                            console.log(results[0],results2[0])
                            var res=[results2[0],results[0]]
                            console.log(res)
                            deferred.resolve(res);
                        }

                    });


                }
            });


        }

        else{
            pool.query({
                sql: sql,
                timeout: 40000
            }, function (error, results, fields) {
                console.log('The solution is: ',results);

                if(error!=null) {
                    console.log("error connecting")
                    deferred.reject(error);
                }
                else{
                    console.log("length works",results)

                    deferred.resolve(results[0]);
                }
            });

        }
        return deferred.promise;

    }


















 //-------------------------------   old code ------------------------------------

     function isValidPassword(oldpassword, newpassword){
        return bcrypt.compareSync(newpassword,oldpassword);
    };
    // Generates hash using bCrypt
    var createHash = function(password){
        console.log("pass genrator")
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
    };




    function Create(user) {

        var deferred = q.defer();
        console.log("user in model"+ user)
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);

        UserModel.create(user, function(err,newuser) {
            if(err) {
                console.log("fassgaye")
                deferred.reject(err);
            }
            else{
                console.log(newuser)
                deferred.resolve(newuser);

            }
        });
        return deferred.promise;

    }


    function FindAll(sort) {


        var by=sort.by
        var order=sort.order

        console.log("in findall in model",by,order)
        var deferred = q.defer();

        if(by=='username'){
        UserModel.find().sort({ username: order }).exec(function(err, users){

            if(err) {
                console.log("its ans error")
                deferred.reject(err);
            }

            else{
                console.log("not an error")
                console.log(users)
                deferred.resolve(users);
            }

        });}
        if(by=='firstName'){
            UserModel.find().sort({ firstName: order }).exec(function(err, users){

                if(err) {
                    console.log("its ans error")
                    deferred.reject(err);
                }

                else{
                    console.log("not an error")
                    console.log(users)
                    deferred.resolve(users);
                }

            });}
        if(by=='lastName'){
            UserModel.find().sort({ lastName: order }).exec(function(err, users){

                if(err) {
                    console.log("its ans error")
                    deferred.reject(err);
                }

                else{
                    console.log("not an error")
                    console.log(users)
                    deferred.resolve(users);
                }

            });}




        return deferred.promise;

    }


    function findUserByUsername(username,password) {
        var deferred = q.defer();
        console.log("by user"+username)
        UserModel.findOne({username: username}, function(err, user) {

            if(err) {
                console.log("its an error")
                deferred.reject(err);
            }
            else{
                deferred.resolve(user);
            }
        })

        return deferred.promise;
    }


    function Delete(id)
    {
        var deferred = q.defer();
        UserModel.findByIdAndRemove(id, function(err, user) {
            if(err) {
                deferred.reject(err);
            }
            else{
                deferred.resolve(user);
            }
        });

        return deferred.promise;
        //OLD CODE
     /*   for (i = 0; i < users.length; i++)
        {
            if (users[i]._id == id)
            {
                users.splice(i,1)
            }
        }
        return users;*/

    }


};