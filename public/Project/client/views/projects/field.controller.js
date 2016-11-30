(function() {

    angular.module("FormBuilderApp")
        .controller("FieldController", FieldController);
    function FieldController($scope, $location, $rootScope, $routeParams,FieldService) {
        var vm = this;
        vm.formId = $routeParams["formId"];
        vm.addField=addField;
        vm.deleteField=deleteField;
        vm.selectfield=selectfield;
        vm.updatefield=updatefield;
        vm.checker=checker;

        function checker (start,end){


            console.log(start,end)
     if((start!=end)&&(start>=0)&&(end>=0))
     {FieldService.changefieldposition(vm.formId,start,end)
                .then(function(fields){
                    console.log(fields)
                    vm.fields=fields
                });


        }


        }




        function updatefield(field)
        {

            if(field.type== "OPTIONS"||field.type== "CHECKBOXES"||field.type== "RADIOS")
            {
                for (i = 0; i < field.options.length ; i++) {
                    var options=vm.options[i]
                    field.options[i].label=options.substring(0,options.indexOf(":"));
                    field.options[i].value=options.substring(options.indexOf(":") + 1);
                }
                console.log(field.options)

            }

            FieldService.updateField(vm.formId,field,field._id)
                .then(function(fields){
                    console.log(fields)
                    vm.fields=fields
                });

        }


        function init()
        {
            FieldService.getFieldsForForm(vm.formId)
                .then(function(fields){
                    console.log(fields)
                    vm.fields=fields
                });


        }
        init();

      function selectfield(field)
        {
           vm.field=field;

            if(field.type== "OPTIONS"||field.type== "CHECKBOXES"||field.type== "RADIOS")
           {
               vm.options=[]
               for (i = 0; i < field.options.length ; i++) {
                   console.log(field.options[i])
                   vm.options.push(field.options[i].label+  ":" +field.options[i].value )
               }
               console.log(vm.options)

           }



        }
        function deleteField(field)
        {
            console.log(field)
            FieldService.deleteFieldFromForm(vm.formId,field)
                .then(function(fields){
                    vm.fields=fields
                });
        }

        function addField(field){

            if(field.type=== "TEXT")
            {
                field.label="New Text Field";
                field.placeholder="New field";

            }
            else if(field.type=== "TEXTAREA")
            {
                field.label="New Text Field";
                field.placeholder="New field";
            }
            else if(field.type=== "DATE")
            {
                field.label="New Date Field";

            }
            else if(field.type=== "RADIOS")
            {
                field.label="New Radio Buttons";
                field.options= [
                    {"label": "Option X", "value": "OPTION_X"},
                    {"label": "Option Y", "value": "OPTION_Y"},
                    {"label": "Option Z", "value": "OPTION_Z"}
                ]
            }
            else if(field.type=== "CHECKBOXES")
            {
                field.label="New Check Boxes";
                field.options=[
                    {"label": "Option A", "value": "OPTION_A"},
                    {"label": "Option B", "value": "OPTION_B"},
                    {"label": "Option C", "value": "OPTION_C"}
                ]
            }
            else if(field.type=== "OPTIONS")
            {
                field.label="New Dropdown";
                field.options=[
                    {"label": "Option 1", "value": "OPTION_1"},
                    {"label": "Option 2", "value": "OPTION_2"},
                    {"label": "Option 3", "value": "OPTION_3"}
                ]
            }
            console.log(field)

            FieldService.createFieldForForm(vm.formId,field)
                .then(function(fields){
                    console.log(fields)
                    vm.fields=fields
                });

        }

    }
})();
