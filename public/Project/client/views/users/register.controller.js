(function() {
    angular.module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $location, $rootScope, UserService) {
        var vm = this;
            vm.register = adduser;

        function adduser(user) {
            console.log(user)
            if (user.username !== undefined && user.password !== undefined
                && user.verifypassword !== undefined && user.password == user.verifypassword
                && user.emails !== undefined)
            {
                UserService.addUser(user)
                    .then(function (user) {

                        if(user!=null)
                        {
                        $rootScope.user =user
                        console.log($rootScope.user)
                        $location.path("/profile");
                        }
                        else
                            alert("User Exists")
                    } )
            }
            else
            {
                alert("Enter proper Credentials")
            }
        }
    }
})();

/*
var model=this;
model.addUser=addUser;

function init(){
    model.users=UserService.findAllUsers();

}
init();

function addUser(user){
    // console.log("User id:"+user.username);
    if(user!==undefined)
    {
        if(user.username!==undefined && user.password!==undefined && user.verify_password!==undefined && user.password==user.verify_password && user.email!==undefined)
        {

            UserService
                .addUser(user)
                .then(function(users){

                    model.users=users;
                    var c= users[users.length-1];
                    $rootScope.user=c;
                    var data_id=c._id;
                    $location.path("/profile/"+data_id);

                });
        }

        else {
            alert("Enter proper user credentials");
        }
    }
    else {
        alert("User is undefined");
    }





}*/
