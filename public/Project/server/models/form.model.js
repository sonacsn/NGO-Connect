var q = require("q");
module.exports = function(mongoose, db) {

    var FormSchema = require("./form.schema.server.js")(mongoose);
    var FormModel = mongoose.model("FormModel", FormSchema);

    var api = {
        FindAll: FindAll,
        addFieldForForm: addFieldForForm,
        deleteField: deleteField,
        getFormByUser: getFormByUser,
        Update: Update,
        Delete: Delete,
        FindById: FindById,
        findFormByTitle:findFormByTitle,
        Create: Create,
        UpdateFieldforForm:UpdateFieldforForm,
        changeFieldposnforForm:changeFieldposnforForm

    };

    return api;

    function changeFieldposnforForm(formId,start,end){

        var deferred = q.defer();
        FormModel.findById(formId,function(err, form) {


            if(err)
            {
                console.log("err")
                return deferred.reject(err);
            }
            else{

                form.fields.splice(end, 0,form.fields.splice(start, 1)[0]);

                                     // notify mongoose 'pages' field changed
                form.markModified("fields");

                form.save();
                deferred.resolve(form);
            }




        });

        return deferred.promise;

    }
    function UpdateFieldforForm(formId,fieldId,field){
        var deferred = q.defer();
        FormModel.findById(formId, function(err, form) {

            for (j = 0; j < form.fields.length; j++) {
                if (form.fields[j]._id == fieldId) {
                    console.log("field found")
                        form.fields[j].type= field.type
                        form.fields[j].label = field.label
                        form.fields[j].placeholder = field.placeholder
                        form.fields[j].options= field.options
                    console.log("Inside Model Form:"+form)
                    break
                }}
            form.save(function(err, form) {
                deferred.resolve(form);
            });
        });

        return deferred.promise;
    }

    function deleteField(formID, fieldID)
    {
        var deferred = q.defer();
        FormModel.findById(formID, function(err, form) {

            for (j = 0; j < form.fields.length; j++) {
                if (form.fields[j]._id == fieldID) {
                    console.log("field found")
                    form.fields.splice(j, 1)
                    console.log("Inside Model Form:"+form)
                    break
                }}
                    form.save(function(err, form) {
                deferred.resolve(form);
            });
        });

        return deferred.promise;

    }


    function addFieldForForm(formID, field) {

        var deferred = q.defer();

        FormModel.findById(formID, function(err, form) {
            form.fields.push(field);
            form.save(function(err, form) {

                deferred.resolve(form);
            });
        });


        return deferred.promise;


    /*  for (i = 0; i < forms.length; i++) {
     if (forms[i]._id == formID) {
     forms[i].fields.push(field)
     break
     }
     }
     return forms[i]*/
}



function FindById(fid) {

        var deferred = q.defer();
        FormModel.findOne({
            _id: fid
        }, function(err, form) {

            if (err) console.log(err);
            console.log("ModelForm:"+form)
            deferred.resolve(form);

        })

        return deferred.promise;

        //OLD CODE
    /*    var form=null
        for (i = 0; i < forms.length; i++) {

            if (forms[i]._id == fid) {
                form=forms[i]
            }
        }
        return form*/

    }

    function Delete(fid,uid)
    {

        var deferred = q.defer();

        FormModel.findByIdAndRemove(fid, function(err, form) {
         getFormByUser(uid).then(function(forms){
             deferred.resolve(forms)});
        });

        return deferred.promise;

        //OLD CODE
        /*  for (i = 0; i < forms.length; i++)
         {
         if (forms[i].userId == uid)
         {
         forms.splice(i, 1)
         }

         }
         return forms*/
    }

    function Update(fid, form) {
        var deferred = q.defer();

        FormModel.findById(fid, function(err, newform) {
            newform.title=form.title
            newform.save(function(err, changeform)
            {
                if(err) {
                    deferred.reject(err);
                }
                else{
                    console.log(changeform)
                    deferred.resolve(changeform);
                }
            });
        });

        return deferred.promise;



        //OLD CODE
        /*   for (i = 0; i < forms.length; i++) {

         if (forms[i]._id == fid) {

         forms[i] = {
         _id: form._id,
         title: form.title,
         userId: form.userId


         };

         return forms[i]
         break

         }
         }
         */
    }



    function FindAll() {
        var deferred = q.defer();
        FormModel.find( function(err, forms) {
            if (err) console.log(err);
            deferred.resolve(forms);
        })
        return deferred.promise;
    }



    function findFormByTitle(title) {

        var deferred = q.defer();
        FormModel.findOne({
            title: title
        }, function(err, form) {
            if (err) console.log(err);

            deferred.resolve(form);

        })

        return deferred.promise;
  //OLD CODE
        /*   var form=null
        for (i = 0; i < forms.length; i++) {

            if (forms[i].title == title) {
                form=forms[i]
            }
        }
        console.log(form)
        return form*/
    }
    function Create(form)
    {
        var deferred = q.defer();
        var uid = form.userId;
        FormModel.create(form, function(err, form) {
            if (err)
            {
                console.log(err);
            }
             else{

            FormModel.find({
                userId: uid
            }, function(err, forms) {

                if (err) {
                    console.log(err)
                }
                else {
                    deferred.resolve(forms);
                }
            });
            }
        });

        return deferred.promise;



      //OLD CODE
      /*  var userforms=getFormByUser(form.userId)
        userforms.push(form)
        forms.push(form)
        return userforms*/
    }


    function getFormByUser(uid) {

        var deferred = q.defer();
        console.log(uid)
        FormModel.find({
            userId: uid
        }, function(err, forms) {
            console.log("forms:"+forms)
            deferred.resolve(forms);

        });

        return deferred.promise;

        //OLD CODE
     /*   var userforms=[]

        for (i = 0; i < forms.length; i++) {

            if (forms[i].userId == uid) {
                userforms.push(forms[i])
            }
        }

        return userforms*/

    }





};