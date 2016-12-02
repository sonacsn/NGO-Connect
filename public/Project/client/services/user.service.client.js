(function()
{
    angular
        .module("FormBuilderApp")
        .factory("UserService", userService);

    function userService($q,$http,$rootScope)
    {
        var service = {

            findUserByCredentials:findUserByCredentials,
            findAllUsers:findAllUsers,
            getUserById:getUserById,
            addUser:addUser,
            addUserByAdmin:addUserByAdmin,
            deleteUserById:deleteUserById,
            updateUserByAdmin:updateUserByAdmin,
            updateUser:updateUser,
            logout:logout,
            getVolunteers:getVolunteers,
            changeRequestStatus: changeRequestStatus,
            inviteVolunteers:inviteVolunteers,
            getProbProjects:getProbProjects,
            sendInvite:sendInvite,
            getAllInvitations:getAllInvitations

        };
        return service;
        //----------------------------------------------------------------------
        function getAllInvitations(user) {
            console.log("sendInvite Client server")
            var deferred = $q.defer();

            $http.post("/api/project/NGO/getAllInvitations",user).success(function (response) {
                deferred.resolve(response);

            });
            console.log(deferred.promise)
            return deferred.promise;
        }

        function sendInvite(project,volId,ngoId) {
            console.log("sendInvite Client server",project,volId,ngoId)
            var deferred = $q.defer();

            var invitation = {projectId:project.id,id:volId,ngoId:ngoId,type:$rootScope.type}

            console.log("VERMA CHECK")
            console.log(invitation)
            $http.put("/api/project/NGO/sendInvite",invitation).success(function (response) {
                deferred.resolve(response);

            });
            console.log(deferred.promise)
            return deferred.promise;
        }

        function getProbProjects(id,vol) {

            console.log("getProbProjects Client server")
            var deferred = $q.defer();

            vol.ngoId = id

            $http.post("/api/project/NGO/probProjects",vol).success(function (response) {
                deferred.resolve(response);

            });
            console.log(deferred.promise)
            return deferred.promise;
        }

        function inviteVolunteers(user) {

            console.log(user.name)
            var deferred = $q.defer();

            $http.post("/api/project/NGO/invite",user).success(function (response) {
                deferred.resolve(response);

            });
            console.log(deferred.promise)
            return deferred.promise;
        }

        function changeRequestStatus(volunteer,status){

            var deferred = $q.defer();
            volunteer.status = status;
            //console.log(volunteer)
            $http.put("/api/project/NGO/request",volunteer).success(function (response) {
                deferred.resolve(response);

            });
            console.log(deferred.promise)
            return deferred.promise;
        }

        function getVolunteers(user){

            console.log(user.name)
            var deferred = $q.defer();

            $http.post("/api/project/user",user).success(function (response) {
                deferred.resolve(response);

            });
            console.log(deferred.promise)
            return deferred.promise;
        }


//---------------------------------------------------
        function updateUser(user,id)
        {

            console.log(user)
            var deferred = $q.defer();

            $http.put("/api/project/user/" + id, user).success(function(response){
                deferred.resolve(response);
            });
            console.log(deferred.promise)
            return deferred.promise;

        }




        function logout() {

            var deferred = $q.defer();
            $http.post("/api/assignment/logout").success(function(response){
                deferred.resolve(response);
            });
            return deferred.promise;

        }
        function findUserByCredentials(user)
        {
            var deferred = $q.defer();
            /* var user={username:username,
             password:password }*/
            console.log(user)

            //$http.get("/api/assignment/user?username=" + username + "&password=" + password)

            $http.post("/api/project/login", user) .success(function(response){
                deferred.resolve(response);
            });

            return deferred.promise;
        }

        function addUser(user,type)
        {
            if(type=='Volunteer') {
                var person = [{
                    "firstName": user.firstName,
                    "lastName": user.lastName,
                    "email": user.emails,
                    "gender": user.gender,
                    "age": user.age,
                    "occupation":user.occupation
                },
                    {"username": user.username, "password": user.password,
                        "interests":user.interests}];
                console.log(user)
                var deferred = $q.defer();
                $http.post("/api/project/register", person).success(function (response) {
                    deferred.resolve(response);
                });
            }
            else if(type=='NGO') {


                console.log("client.serive.NGO")
                var ngo = {
                    "name": user.name, "username": user.username, "password": user.password, "type": user.type,
                    "memberSize": user.memberSize, "location": user.location, "causeDescription": user.causeDescription
                };
                console.log(ngo)
                var deferred = $q.defer();
                $http.post("/api/project/register", ngo).success(function (response) {
                    deferred.resolve(response);
                });
            }
            console.log(deferred.promise)
            return deferred.promise;

        }






   //-------------------- OLD CODE ------------------------------






        function addUserByAdmin(user)
        {

            console.log(user)
            var deferred = $q.defer();
            $http.post("/api/assignment/admin/user",user).success(function(response){
                deferred.resolve(response);


            });
            console.log(deferred.promise)
            return deferred.promise;

        }



        function updateUserByAdmin(user)
        {

            console.log(user)
            var deferred = $q.defer();

            $http.put("/api/assignment/admin/user/" + user._id, user).success(function(response){
                deferred.resolve(response);
            });
            console.log(deferred.promise)
            return deferred.promise;

        }

        function findAllUsers(sort)
        {
            /* var sort={by:'username',order:1}*/
            console.log("inside find all",sort.by,sort.order)
            var deferred = $q.defer();
            $http.put("/api/assignment/admin/user",sort).success(function(response){
                deferred.resolve(response);
            });
            return deferred.promise;
        }
        function getUserById(id)
        {
            var deferred=$q.defer();
            $http.get("/api/assignment/user/"+id).success(function(response){
                deferred.resolve(response);
            });

            return deferred.promise;
        }

        function deleteUserById(id)
        {
            var deferred = $q.defer();
            $http.delete("/api/assignment/admin/user/" + id).success(function(response){
                deferred.resolve(response);
            });
            return deferred.promise;
        }

    }
})();