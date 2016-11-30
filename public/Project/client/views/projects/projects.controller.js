(function() {
    angular.module("FormBuilderApp")
        .controller("ProjectController", FormController);

    function FormController($scope,$rootScope, $routeParams,$location,UserService,FormService) {

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
                startDate:'2016-10-21',
                volunteerCount:100 ,
                ngo:1} ,

            {id: 1,name:'Mine Ban Treaty',
                location:'Wyoming',
                description:'aims at eliminating anti-personnel landmines (AP-mines) around the world',
                duration_months:15 ,
                startDate:'2016-10-21',
                volunteerCount:100 ,
                ngo:1}
        ]
        }

        init();


        $scope.editForm = editForm
        $scope.updateForm = updateForm
        $scope.deleteForm = deleteForm
        $scope.addProject = addProject

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
        function addProject(project)
        {

            console.log(project)
            /*FormService.createFormForUser($rootScope.user._id,title)
                .then(function(forms)
            {
            $scope.forms=forms
            });*/


        }
    }
})();
