(function() {
    angular.module("FormBuilderApp")
        .controller("ProjectController", ProjectController);

    function ProjectController($scope,$rootScope, $routeParams,$location,UserService,FormService) {
        var vm = this;
        function init(){
           if($rootScope.user)
           {
            FormService.findAllProjects()

                .then(function(projects)
        {
            console.log(projects)
            $scope.projects=projects
        });
           }
            /*$scope.projects=[
                {id: 1,
                    name:'Mine Ban Treaty',
                    location:'Wyoming',
                    description:'aims at eliminating anti-personnel landmines (AP-mines) around the world',
                    duration_months:15 ,
                startDate:'2016-11-30 05:00:00',
                volunteerCount:100 ,
                ngo:1} ,

            {id: 1,name:'Mine Ban Treaty',
                location:'Wyoming',
                description:'aims at eliminating anti-personnel landmines (AP-mines) around the world',
                duration_months:15 ,
                startDate:'2016-11-30 05:00:00',
                volunteerCount:100 ,
                ngo:1}
        ]*/

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



            console.log(vm.newproject,type)

           /* $scope.selectformindex = index;
            $scope.form = {
                _id: $scope.forms[index]._id,
                title: $scope.forms[index].title,
                userId: $scope.forms[index].userId

            }*/

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
