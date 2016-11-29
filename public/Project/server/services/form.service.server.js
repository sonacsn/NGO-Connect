module.exports = function(app, model) {

    app.get("/api/assignment/user/:userId/form", getFormsForUser);
    app.get("/api/assignment/form/:formId", get);
    app.get("/api/assignment/form", getAllForms);
    app.post("/api/assignment/user/form", addForm);
    app.delete("/api/assignment/user/:userId/form/:formId", deleteForm);
    app.delete("/api/assignment/form/:formId", deleteData);
    app.put("/api/assignment/form/:formId",updateForm);



    function addForm(req, res) {

         var form = req.body;
         model.Create(form)
             .then(function(forms){
                 res.json(forms)});


    }


    function getFormsForUser(req, res)
    {
          var userId = req.params["userId"];
        console.log(userId)
        model.getFormByUser(userId).then(function(form){
            res.json(form)});

    }

    function updateForm(req,res){

        var form = req.body;
        var fid = req.params.formId;

      model.Update(fid,form).then(function(form){
          console.log("updatedform:"+form)
          res.json(form)});


    }

    function deleteForm(req, res) {
           var fid = req.params["formId"];
         var uid = req.params["userId"];

       model.Delete(fid, uid).then(function(forms){
           console.log(forms)
           res.json(forms)});


    }


    function deleteData(req, res) {

        /* var fid = req.params["formId"];
         model
         .del(fid)
         .then(function(form) {
         res.json(form);

         })*/

    }



    function get(req, res) {
        /*  var fid = req.params["formId"];
         model
         .get(fid)
         .then(function(form) {
         res.json(form);

         })*/
    }

    function getAllForms(req, res) {
        /*  model
         .findAllForms()
         .then(function(form) {
         res.json(form);
         })*/

    }

}
