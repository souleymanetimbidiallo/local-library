const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

const UserSchema = Schema({
    name: {type: String},
    email: {type:String, required: true},
    password: {type: String, required: true}
});


UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', UserSchema);