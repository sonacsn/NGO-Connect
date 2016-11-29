    (function() {
        angular.module("FormBuilderApp")
            .controller("AdminController", AdminController);

        function AdminController($scope, UserService) {
            var vm = this;

            vm.adduser=adduser;
            vm.edituser=edituser;
            vm.deleteuser=deleteuser;
            vm.updateuser=updateuser;
            vm.sortsetter=sortsetter;

                function init()
                {
                     if(vm.sort==null)
                     {
                         console.log("sort in null")
                       vm.sort={by:'username',order:1}

                     }

                      UserService.findAllUsers(vm.sort)
                     .then(handleSuccess, handleError);
                }init();

            function edituser(user)
            {
                vm.newuser =user
            }


            function sortsetter(by,order)
            {

                console.log("sort setter pre"+by +order)
                vm.sort={by:by,order:order}
                console.log("sort setter post"+ vm.sort.by,vm.sort.order)
                init();
            }

            function adduser(user) {
                UserService.addUserByAdmin(user)
                    .then(function()
                    {
                        init();
                    });
            }
            function deleteuser(user) {
                UserService.deleteUserById(user._id)
                    .then(function()
                {
                    init();
                });
            }
            function updateuser(user) {
                UserService.updateUserByAdmin(user)
                    .then(function()
                    {
                        vm.newuser=null
                        init();
                    });
            }

            function handleSuccess(users) {
                vm.users= users;
            }

            function handleError(error) {
                $scope.error = error;
            }
    }})();


/*
 vm.users=
    function AdminController($scope, UserService)
    {
        $scope.remove = remove;
        $scope.update = update;
        $scope.add    = add;
        $scope.select = select;

        function init() {
            UserService
                .findAllUsers()
                .then(handleSuccess, handleError);
        }
        init();

        function remove(user)
        {
            UserService
                .deleteUser(user._id)
                .then(handleSuccess, handleError);
        }

        function update(user)
        {
            UserService
                .updateUser(user._id, user)
                .then(handleSuccess, handleError);
        }

        function add(user)
        {
            UserService
                .createUser(user)
                .then(handleSuccess, handleError);
        }

        function select(user)
        {
            $scope.user = angular.copy(user);
        }

        function handleSuccess(response) {
            $scope.users = response.data;
        }

        function handleError(error) {
            $scope.error = error;
        }
    }
    })();*/


/*

    function init(){
        if($rootScope.user)
        {
            FormService.findAllFormsForUser($rootScope.user).then(function(forms)
            {
                $scope.forms=forms
                console.log($scope.forms)
            });
        }

    }

    init();


    $scope.editForm = editForm
    $scope.updateForm = updateForm
    $scope.deleteForm = deleteForm
    $scope.addForm = addForm

    function editForm(index)
    {
        $scope.selectformindex = index;
        $scope.form = {
            _id: $scope.forms[index]._id,
            title: $scope.forms[index].title,
            userId: $scope.forms[index].userId

        }}

    function updateForm(form)
    {
        FormService.updateFormById(form._id,form)
            .then(function(Newform)
            {
                console.log(Newform)
                $scope.forms[$scope.selectformindex]=Newform
                $scope.selectformindex=-1;

            })

    }
    function deleteForm(form)
    {
        FormService.deleteFormById(form)
            .then(function(newforms)
            {
                $scope.forms=newforms
            });

    }
    function addForm(title)
    {
        FormService.createFormForUser($rootScope.user._id,title)
            .then(function(forms)
            {
                $scope.forms=forms
            });

    }
    }
*/
