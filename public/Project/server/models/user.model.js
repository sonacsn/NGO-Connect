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
        //--------- to be Modified ---------------
       Delete: Delete,
       findUserByUsername: findUserByUsername,
       FindAll: FindAll,
       Create: Create

    };

    return api;


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