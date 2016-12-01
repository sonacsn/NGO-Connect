(function() {
    angular.module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope,$rootScope, $routeParams,$location,UserService) {
        var vm = this;
        function init()
        {

            /*
             console.log($rootScope.user)
             console.log($rootScope.user.emails)
             // console.log($rootScope.user.emails[0])
             var emails = []
             emails.push($rootScope.user.emails[0])
             for (i = 1; i < $rootScope.user.emails.length; i++) {
             emails.push(',' + $rootScope.user.emails[i])
             }
             vm.emails = emails*/

        }init();

        vm.update = function (user,some) {
            // console.log(vm.emails)
            // var emails=vm.emails
            // if(emails.indexOf(',')>0)
            // newuser.emails=emails.split(',')
            // console.log(newuser.emails)

            if(Array.isArray(user)){

                console.log("in profile controller")
                console.log($rootScope.user._id)

                UserService.updateUser(user, user[0].id).then(
                    function(newuser)
                    {
                        console.log(newuser)
                        $rootScope.user=newuser;
                        alert("Profile Fields Updated")
                    })


            }
            else{
                if(user.name!== undefined && user.username !== undefined &&
                    user.password !== undefined && user.type!== undefined &&
                    user.location!== undefined && user.causeDescription!== undefined){

                    UserService.updateUser(user, $rootScope.user._id).then(
                        function(user)
                        {
                            console.log(user)
                            $rootScope.user=user;
                            alert("Profile Fields Updated")
                        })
                }
            }



        }
    }
})();
