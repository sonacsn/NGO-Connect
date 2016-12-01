(function(){
    angular
        .module("FormBuilderApp")
        .config(Configure);

    function Configure($routeProvider) {
        $routeProvider
            .when("/home/:userId",{
                templateUrl:"views/home/home.view.html",
                resolve: {
                    loggedin: checkCurrentUser
                }
            })
            .when("/register",{
                templateUrl:"views/users/register.view.html",
                controller:"RegisterController",
                controllerAs:"vm"
            })
            .when("/profile",{
                templateUrl:"views/users/profile.view.html",
                controller:"ProfileController",
                controllerAs:"vm"
                ,
                resolve: {
                    loggedin: checkLoggedin
                }
            })

            .when("/login",{
                templateUrl:"views/users/login.view.html",
                controller:"LoginController",
                controllerAs:"vm"
            })
            .when("/projects",{
                templateUrl:"views/projects/projects.view.html",
                controller:"ProjectController",
                controllerAs:"vm",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/invites-requests",{
                templateUrl:"views/invites-requests/invites-requests.view.html",
                controller:"invreqController",
                controllerAs:"vm",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
      //  invites-requests
            .when("/admin",{
                templateUrl:"views/admin/admin.view.html",
                controller:"AdminController",
                controllerAs:"vm",
                resolve: {
                    loggedin: checkAdmin
                }

            })
            .when("/forms",{
                templateUrl:"views/forms/forms.view.html",
                controller:"FormController",
                controllerAs:"vm",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/form/:formId/fields",{
                templateUrl:"views/forms/field.view.html",
                controller:"FieldController",
                controllerAs:"vm",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .otherwise({
                templateUrl:"views/home/home.view.html"
        });

    }

    //--------------------------------------------------
    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/assignment/loggedin').success(function(user)
        {
            console.log("In checking")
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.user = user;

                console.log("found user in path")

                if(Array.isArray(user)){
                    $rootScope.type="Volunteer"
                    $rootScope.id = user[1].id;
                }

                else{
                    $rootScope.type="NGO"
                    $rootScope.id = user.id;
                }


                console.log($rootScope.type,$rootScope.id,user)
                deferred.resolve();
            }
            // User is Not Authenticated
            else
            {
                $rootScope.errorMessage = 'You need to log in.';
                console.log("not checking")
                deferred.reject();
                $location.url('/login');
            }
        });

        return deferred.promise;
    };



    var checkCurrentUser = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/assignment/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.user = user;
            }
            else
                $rootScope.user =null

                    deferred.resolve();
        });

        return deferred.promise;
    };

    //--------------------
    var checkAdmin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/assignment/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0' && user.roles.indexOf('admin') != -1)
            {
                $rootScope.user = user;
                deferred.resolve();
            }
            else
            {
                $rootScope.errorMessage = 'You need to log in.';
                console.log("Not Admin")
                deferred.reject();
                $location.url('/home');
            }
        });

        return deferred.promise;
    };


})();
