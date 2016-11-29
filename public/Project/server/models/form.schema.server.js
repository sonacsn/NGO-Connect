module.exports = function(mongoose, db) {

    var FieldSchema=require("./field.schema.server.js")(mongoose);
    var FormSchema = mongoose.Schema({
        "title": String,
        "userId": String,
        "fields": [
            FieldSchema
        ],
            created: Date,
            updated: Date
    },

    {
        collection: "FormMaker.Form"
    });

    return FormSchema;

};