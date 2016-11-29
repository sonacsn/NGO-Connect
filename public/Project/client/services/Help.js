
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



function updateUserByAdmin(user,id)
{

    console.log(user)
    var deferred = $q.defer();

    $http.put("/api/assignment/admin/user/" + id, user).success(function(response){
        deferred.resolve(response);
    });
    console.log(deferred.promise)
    return deferred.promise;

}