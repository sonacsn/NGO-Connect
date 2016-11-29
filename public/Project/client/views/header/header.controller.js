(function() {
    angular.module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $rootScope, $location,UserService) {
        $scope.$location = $location;

        $scope.logout = function () {
            UserService
                .logout()
                .then(function (response) {
                   console.log("NOW LOGOUT SCENE IS" +response+ response.data)

                    $rootScope.user = response;
                    $location.path("/home");
                })
        }

    }
})();