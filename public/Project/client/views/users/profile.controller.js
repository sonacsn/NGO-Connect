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

        vm.update = function (newuser) {
            console.log(vm.emails)
            var emails=vm.emails
            if(emails.indexOf(',')>0)
            newuser.emails=emails.split(',')
            console.log(newuser.emails)
            UserService.updateUser(newuser, $rootScope.user._id).then(
                function(newuser)
            {
                console.log(newuser)
                $rootScope.user=newuser;
                    alert("Profile Fields Updated")
            })

        }
    }
})();
