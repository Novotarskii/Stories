const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const accSchema = new Schema({
    first_name: {
        type: String,
        Required: 'Please enter'
    },
    last_name: {
        type: String,
        Required: 'Please enter'
    },
    email: {
        type: String,
        Required: 'Please enter'
    },
});
module.exports = {
    acc: mongoose.model('acc', accSchema)
};
