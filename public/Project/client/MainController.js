(function(){
    angular
        .module("FormBuilderApp")
        .controller("MainController", MainController);

    function MainController($scope, $location,$rootScope) {
        $scope.$location = $location;
    }
})();
