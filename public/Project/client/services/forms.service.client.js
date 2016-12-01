(function() {
    angular.module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($http,$q,$rootScope){
        var service={
            findAllProjects:findAllProjects,
            deleteProjectById:deleteProjectById,
            //To be Modified.....
            createFormForUser:createFormForUser,
            deleteFormById:deleteFormById,
            updateFormById:updateFormById
        };
        return service;

        function findAllProjects()
        {
            var userId=$rootScope.id,type=$rootScope.type
            console.log(userId,type)
            var deferred = $q.defer();

            $http.get("/api/project/user/projects/" + userId + "/type/"+type).success(function(response) {
                deferred.resolve(response);
            });
            console.log(deferred.promise)
            return deferred.promise;
        }

        function deleteProjectById(id)
        {

            console.log(id)
            var deferred = $q.defer();

            $http.put("/api/project/NgoProject/" +id).success(function(response) {
                deferred.resolve(response);
            });
            console.log(deferred.promise)
            return deferred.promise;
        }

        function updateFormById(id, form) {
            var deferred = $q.defer();
            $http.put("/api/assignment/form/" + id, form).success(function(response){

                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function deleteFormById(form) {
            var deferred=$q.defer();
            var formId=form._id
            var userid=form.userId;

            $http.delete("/api/assignment/user/"+userid+"/form/" + formId).success(function(response) {
                deferred.resolve(response);
            });

            return deferred.promise;
        }

        function createFormForUser(userId, form) {
            var newform= {
                title: form,
                userId: userId,
                fields:[]
            };
            var deferred = $q.defer();
            $http.post("/api/assignment/user/form", newform).success(function(response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        }
    }
})();
