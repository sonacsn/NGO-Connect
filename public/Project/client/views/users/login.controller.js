(function() {
    angular.module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $location, $rootScope, UserService) {

        $scope.login = function (user) {
            if(user.type == undefined)
            {
                alert("Please Select one of the User Type")
            }
        else {
                //user.password="X";

                console.log(user);
                  UserService.findUserByCredentials(user)
                 .then(function (user) {

                 if(user.length!=0)
                 {
                     console.log(user)
                 $rootScope.user =user;
                 $location.path("/profile");
                 }
                 else
                 {
                 alert("Wrong Credentials. Please Try Again...")
                 }
                 })
            }



        }
    }
})();