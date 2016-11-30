(function() {
    angular.module("FormBuilderApp")
        .controller("ProjectController", FormController);

    function FormController($scope,$rootScope, $routeParams,$location,UserService,FormService) {
        var vm = this;
        function init(){
          /* if($rootScope.user)
           {
            FormService.findAllFormsForUser($rootScope.user).then(function(forms)
        {
            $scope.forms=forms
            console.log($scope.forms)
        });
           }*/
            $scope.projects=[
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
        ]
        }

        init();


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
