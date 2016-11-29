(function() {

    angular.module("FormBuilderApp")
        .factory("FieldService", FieldService);


    function FieldService($http,$q){

        var api={
            getFieldsForForm:getFieldsForForm,
            createFieldForForm:createFieldForForm,
            deleteFieldFromForm:deleteFieldFromForm,
            updateField:updateField,
            changefieldposition:changefieldposition
        };

        return api;


        function changefieldposition(formId,start,end){
            var deferred=$q.defer();
           /* var response=null;*/
            console.log("in service with fields and formid:"+formId,start,end)
            $http.put("/api/assignment/form/changsposn/"+formId,{start:start,end:end}).success(function(response){
                deferred.resolve(response);
            });

             console.log(deferred.promise)
              return deferred.promise;


        }

        function updateField(formId,field,fieldId)
        {

            var deferred=$q.defer();
            $http.put("/api/assignment/form/"+formId+"/field/"+fieldId,field).success(function(response){
                deferred.resolve(response);
            });
            console.log(deferred.promise)
            return deferred.promise;
        }


        function deleteFieldFromForm(fid,field)
        {
            var deferred=$q.defer();
            $http.delete("/api/assignment/form/"+fid+"/field/"+field).success(function(response){
                deferred.resolve(response);
            });
            console.log(deferred.promise)
            return deferred.promise;
        }

        function getFieldsForForm(formId)
        {
            var deferred=$q.defer();

            $http.get("/api/assignment/form/"+formId+"/field").success(function(response){

                deferred.resolve(response);

            });
           console.log(deferred.promise)
            return deferred.promise;
        }

        function createFieldForForm(fid,field){

            var deferred=$q.defer();
            $http.post("/api/assignment/form/"+fid+"/field",field).success(function(response){

                deferred.resolve(response);

            });
            console.log(deferred.promise)
            return deferred.promise;
        }
    }


})();