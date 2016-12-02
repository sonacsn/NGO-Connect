(function() {
    angular.module("FormBuilderApp")
        .controller("invreqController", invreqController);

    function invreqController($scope,$rootScope, $routeParams,$location,UserService,FormService) {
        var vm = this;
        vm.acceptRequest = approveRequest;
        vm.declineRequest = declineRequest;
        vm.inviteVolunteers = inviteVolunteers;
        vm.sendInvite=sendInvite;
        vm.getProbProjects=getProbProjects;
        vm.getAllInvitations = getAllInvitations;
        vm.sendRequest=sendRequest


        function sendRequest(vol) {

            console.log("send Request controller.js")
            console.log(vol,vol.ngo,$rootScope.user[1].id)

            UserService.sendInvite(vol,vol.ngo,$rootScope.user[1].id)
                .then(function(status)
                {
                    console.log(status)

                    if(status=="OK") {
                        alert("The Volunteer has been invited")
                        inviteVolunteers($rootScope.user);
                    }
                    else
                        alert("Problem with inviting")
                });
        }


        function getAllInvitations(user) {
            console.log(user);
            $scope.selected=3;

            UserService.getAllInvitations(user)
                .then(function (invitations) {
                    console.log("Priniting all getAllInvitations...")
                    console.log(invitations)
                    vm.invitations = invitations
                });
        }

        function getProbProjects (vol){
            console.log(vol)
            // $scope.selected=1;
            $scope.selectedUserId=vol.id
            console.log($scope.selectedUserId)
            UserService.getProbProjects($rootScope.user.id,vol)
                .then(function (Projects) {
                    console.log("Priniting all Projects...")
                    console.log(Projects)
                    vm.userProjects = Projects
                });
        }

        function sendInvite(Project){

            console.log("send Invite controller.js")

            UserService.sendInvite(Project,$scope.selectedUserId,$rootScope.user.id)
                .then(function(status)
                {
                    console.log(status)

                    if(status=="OK") {
                        alert("The Volunteer has been invited")
                        inviteVolunteers($rootScope.user);
                    }
                    else
                        alert("Problem with inviting")
                });
        }


        function init() {

            // vm.userProjects=[{name:"A"},{name:"B"},{name:"C"},{name:"D"}]

            $scope.selected = 1;
            console.log("init")

            if ($rootScope.user) {
                UserService.getVolunteers($rootScope.user)
                    .then(function (volunteers) {
                        console.log(volunteers)
                        $scope.volunteers = volunteers
                    });
            }

        }

        init();

        function approveRequest(volunteer){

                console.log("In approve req controller.js");
                console.log(volunteer)
                UserService.changeRequestStatus(volunteer,'approved')
                    .then(function(status)
                    {
                        console.log(status)

                        if(status=="OK") {
                            alert("The Request has been approved")
                            init();
                        }
                        else
                            alert("Problem with approving request")
                    });
        }

        function declineRequest(volunteer) {

            UserService.changeRequestStatus(volunteer,'declined')
                .then(function(status)
                {
                    console.log(status)

                    if(status=="OK") {
                        alert("The Request has been denied")
                        init();
                    }
                    else
                        alert("Problem with declining request")
                });
        }


        $scope.editProject = editProject
        $scope.updateProject = updateProject
        $scope.deleteForm = deleteForm
        $scope.addProject = addProject

        function editProject(project,type)
        {
            vm.newproject=project
            $scope.selection=type;




            if(type=='edit')
                vm.newproject.startDate=sqlToJsDate(vm.newproject.startDate)


            console.log(vm.newproject,type)

            /* $scope.selectformindex = index;
             $scope.form = {
             _id: $scope.forms[index]._id,
             title: $scope.forms[index].title,
             userId: $scope.forms[index].userId

             }*/

        }

        function inviteVolunteers(user){

            console.log("in Invite volunteer controller")
            //console.log(user)
            $scope.selected=2;

                UserService.inviteVolunteers(user)
                    .then(function (volunteers) {
                        console.log(volunteers)
                        $scope.allVolunteers = volunteers
                    });

        }

        function updateProject(project)
        {
            console.log(project)
            /*FormService.updateFormById(form._id,form)
             .then(function(Newform)
             {
             console.log(Newform)
             $scope.forms[$scope.selectformindex]=Newform
             $scope.selectformindex=-1;

             })*/

        }
        function deleteForm(form)
        {
            FormService.deleteFormById(form)
                .then(function(newforms)
                {
                    $scope.forms=newforms
                });

        }
        function addProject(project)
        {
            console.log(project)
            var date = project.startDate
            project.startDate=sqlDate(date)

            console.log(project.startDate)
            /*FormService.createFormForUser($rootScope.user._id,title)
             .then(function(forms)
             {
             $scope.forms=forms
             });*/


        }


        function sqlDate(date) {

            date = date.getUTCFullYear() + '-' +
                ('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' +
                ('00' + date.getUTCDate()).slice(-2) + ' ' +
                ('00' + date.getUTCHours()).slice(-2) + ':' +
                ('00' + date.getUTCMinutes()).slice(-2) + ':' +
                ('00' + date.getUTCSeconds()).slice(-2);

        }


        function sqlToJsDate(sqlDate){

            //sqlDate in SQL DATETIME format ("yyyy-mm-dd hh:mm:ss.ms")
            var sqlDateArr1 = sqlDate.split("-");
            //format of sqlDateArr1[] = ['yyyy','mm','dd hh:mm:ms']
            var sYear = sqlDateArr1[0];
            var sMonth = (Number(sqlDateArr1[1]) - 1).toString();
            var sqlDateArr2 = sqlDateArr1[2].split(" ");
            //format of sqlDateArr2[] = ['dd', 'hh:mm:ss.ms']
            var sDay = sqlDateArr2[0];
            var sqlDateArr3 = sqlDateArr2[1].split(":");
            //format of sqlDateArr3[] = ['hh','mm','ss.ms']
            var sHour = sqlDateArr3[0];
            var sMinute = sqlDateArr3[1];
            var sqlDateArr4 = sqlDateArr3[2].split(".");
            //format of sqlDateArr4[] = ['ss','ms']
            var sSecond = sqlDateArr4[0];
            var date= new Date(sYear,sMonth,sDay,sHour,sMinute,sSecond);

            return date;
        }



    }
})();