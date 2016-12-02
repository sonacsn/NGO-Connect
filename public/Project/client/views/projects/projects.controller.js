(function() {
    angular.module("FormBuilderApp")
        .controller("ProjectController", ProjectController);

    function ProjectController($scope,$rootScope, $routeParams,$location,UserService,FormService) {
        var vm = this;
        function init(){


           // $scope.projects=[{name:"A",X:"AA"},{name:"B",X:"BB"}]

           if($rootScope.user)
           {
            FormService.findAllProjects()

                .then(function(projects)
        {
            console.log(projects)
            $scope.projects=projects
        });
           }

        }
        init();


        $scope.editProject = editProject
        $scope.updateProject = updateProject
        $scope.deleteProject = deleteProject
        $scope.addProject = addProject

        function editProject(project,type)
        {
            vm.newproject=project
            $scope.selection=type;

            if(type=='edit' &&  !(vm.newproject.startDate instanceof Date)){
               console.log(vm.newproject.startDate)
                vm.newproject.startDate=sqlToJsDate(vm.newproject.startDate)
                console.log(vm.newproject.startDate)
            }
            console.log(vm.newproject)


        }

        function updateProject(project)
        {
            var cloneProject=JSON.parse(JSON.stringify(project));

            cloneProject.startDate = cloneProject.startDate.split("T")[0];
            console.log(cloneProject.startDate)

            console.log(cloneProject)

            FormService.updateProject(cloneProject)
                .then(function(status)
                {
                    console.log(status)

                    if(status=="OK")
                        init();
                    else
                        alert("Problem with updating the Project")
                });

        }

        function sqlDate(date) {

           // var sqlDate=date.getFullYear()+'-'+date.getMonth() +'-'+date.getDate();
            date = date.getUTCFullYear() + '-' +
                ('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' +
                ('00' + date.getUTCDate()).slice(-2) + ' ' +
                ('00' + date.getUTCHours()).slice(-2) + ':' +
                ('00' + date.getUTCMinutes()).slice(-2) + ':' +
                ('00' + date.getUTCSeconds()).slice(-2);

            return date
        }


        function deleteProject(project)
        {
            console.log(project.id)
            FormService.deleteProjectById(project.id)
                .then(function(status)
            {
                console.log(status)

                if(status=="OK")
                  init();
                else
                    alert("Problem with Deleting the Project")
             });

        }
        function addProject(project)
        {
            var cloneProject=JSON.parse(JSON.stringify(project));
            cloneProject.startDate = cloneProject.startDate.split("T")[0];
            console.log(cloneProject.startDate)
            cloneProject.ngo=$rootScope.id
            console.log(cloneProject)
            FormService.createProject(cloneProject)
                .then(function(status)
                {
                    console.log(status)
                    if(status=="OK")
                        init();
                    else
                        alert("Problem with adding the Project")
                });
        }




        function sqlToJsDate(sqlDate){

            //sqlDate in SQL DATETIME format ("yyyy-mm-dd hh:mm:ss.ms")
            var sqlDateArr1 = sqlDate.split("-");

            //format of sqlDateArr1[] = ['yyyy','mm','dd hh:mm:ms']
            var sYear = sqlDateArr1[0];
            var sMonth = (Number(sqlDateArr1[1])).toString();
            var sqlDateArr2 = sqlDateArr1[2].split("T");
            //format of sqlDateArr2[] = ['dd', 'hh:mm:ss.ms']
            var sDay = sqlDateArr2[0];
          //,sHour,sMinute,sSecond
            console.log (sYear,sMonth,sDay);
           var date= new Date(sYear,sMonth,sDay);
            console.log(date)
            return date;

        }



    }
})();
