module.exports = function(app, model) {

    app.get("/api/assignment/form/:formId/field", getAllFieldsForForm);
    app.post("/api/assignment/form/:formId/field", addFieldForForm);
    app.delete("/api/assignment/form/:formId/field/:fieldId",deleteField);
    app.put("/api/assignment/form/:formId/field/:fieldId",updateField);
    app.put("/api/assignment/form/changsposn/:formId",changeposn);


    function changeposn(req, res) {
        var formId = req.params["formId"];
        var start= req.body.start;
        var end = req.body.end;

        console.log("values in server service:",formId,start,end)

        model.changeFieldposnforForm(formId,start,end)
            .then(function(form){
                var fields=form.fields
                console.log(form)
                console.log("fields:"+fields)
                res.json(fields)
            });


    }
    function updateField(req, res) {
        var formId=req.params["formId"];
        var fieldId=req.params["fieldId"];
        var field=req.body;

        model.UpdateFieldforForm(formId,fieldId,field)
            .then(function(form){
            var fields=form.fields
            console.log(form)
            console.log("fields:"+fields)
            res.json(fields)
        });
    }

    function getAllFieldsForForm(req, res) {
        var formId = req.params["formId"];
        model.FindById(formId)
            .then(function(form){
                var fields=form.fields
                res.json(fields)
            });

    }

    function deleteField(req,res){
        var formId=req.params["formId"];
        var fieldId=req.params["fieldId"];
       model.deleteField(formId,fieldId)
           .then(function(form){
               var fields=form.fields
               console.log(form)
               console.log("fields:"+fields)

        res.json(fields)
           });

    }

    function addFieldForForm(req,res){
        var formId=req.params["formId"];
        var field=req.body;
       model.addFieldForForm(formId,field)
           .then(function(form){
               var fields=form.fields
               console.log(form)
               console.log("fields:"+fields)
               res.json(fields)
           });

    }


};