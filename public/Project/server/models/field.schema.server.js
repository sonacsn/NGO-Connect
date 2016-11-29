 module.exports = function(mongoose, db) {
 var FieldSchema = mongoose.Schema({
 "label": String,
 "type": String,
 "options": [{
 label: String,
 value: String
 }
 ],
 "placeholder": String
 });

 return FieldSchema;

 };
