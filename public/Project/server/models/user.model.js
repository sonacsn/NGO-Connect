var q = require("q");


// Require the bcrypt package
var bcrypt = require('bcrypt-nodejs');
// Create a password salt
var salt = bcrypt.genSaltSync(10);

module.exports = function(pool) {

  /*  var UserSchema = require("./user.schema.server.js")(mongoose);

    var UserModel = mongoose.model("UserModel", UserSchema);*/

    var api = {

       Delete: Delete,
       Update: Update,
       findUserByUsername: findUserByUsername,
       FindById: FindById,
       FindAll: FindAll,
       Create: Create,
       findUserByCredentials: findUserByCredentials
    };

    return api;

     function isValidPassword(oldpassword, newpassword){
        return bcrypt.compareSync(newpassword,oldpassword);
    };
    // Generates hash using bCrypt
    var createHash = function(password){
        console.log("pass genrator")
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
    };




    function findUserByCredentials(username,type) {
        var deferred = q.defer();
        var mysql = require('mysql');

        var sql = "SELECT * FROM ?? WHERE ?? = ?";
        if(type==="Volunteer"){

            var inserts = ['Person', 'firstname', username];
            console.log("IN Volunteer")
        }
            else
        {
            var inserts = [type, 'name', username];
            console.log("IN NGO")
        }
        sql = mysql.format(sql, inserts);

        pool.query({
            sql: sql,
            timeout: 40000
        }, function (error, results, fields) {
            console.log('The solution is: ',results);

            if(error!=null) {
                console.log("error connecting")
                deferred.reject(error);
            }
            else if(results.length==1){
                console.log("length works")
                deferred.resolve(results[0]);
            }
            else{
                console.log("more or less users found")
                deferred.reject(0);
            }

        });
        return deferred.promise;
/*

        pool.query({
            sql: 'SELECT * FROM `NGO` WHERE `location` = ?',
            timeout: 40000, // 40s
            values: ['New York']
        }, function (error, results, fields) {
            console.log('The solution is: ',results[0]);
        });
*/

        /*UserModel.findOne({
            username: newuser.username
        }, function(err, founduser) {

            if(err) {
                deferred.reject(err);
            }
            else{
                console.log("found user"+founduser)
                if (bcrypt.compareSync(newuser.password, founduser.password))
                {
                deferred.resolve(founduser);
                    console.log("password match")
                }
                else
                    deferred.reject(err);
            }
        });*/


    }


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


    function FindById(userId) {
        var deferred = q.defer();
        console.log("userid in model findbyid:"+userId)
        UserModel.findById({
            _id: userId
        }, function(err, user) {

            if(err) {
                console.log("kuch na labya")
                deferred.reject(err);
            }
            else{
                console.log("labgaya")
                deferred.resolve(user);
            }
        });

        return deferred.promise;

    }

    function findUserByUsername(username) {
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

    function Update(id, user) {
        var deferred = q.defer();
        var uname = user.username;
        var pass = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
       /* bcrypt.hash(user.password, 10, function(err, hash) {
            // Store hash in your password DB.
            var pass = hash
        });*/
        //var pass = bcrypt.hashSync(user.password, salt);
        var fname = user.firstName;
        var lname = user.lastName;
        var e = user.emails;
        var roles=user.roles

        UserModel.findById(id, function(err, user) {
            user.username = uname;
            user.password = pass;
            user.firstName = fname;
            user.lastName = lname;
            user.email =user.emails.push(e);
            user.roles=roles
            user.save(function(err, user)
            {
                if(err) {
                    deferred.reject(err);
                }
                else{
                    deferred.resolve(user);
                }
            });
        });

        return deferred.promise;


        //OLD CODE
     /*   for (i = 0; i < users.length; i++) {
            if (users[i]._id == id)
            {
                users[i].firstName=user.firstName;
                users[i].lastName=user.lastName;
                users[i].username=user.username;
                users[i].password=user.password;
                break;
            }
        }
       return users[i];*/
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