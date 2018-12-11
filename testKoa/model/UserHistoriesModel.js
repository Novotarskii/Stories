const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userHistoriesSchema = new Schema({
    titleOfHistory: {
        type: String
    },
    textOfHistory: {
        type: String
    },
    img: {
        type: String
    },
    idOfUser: {
        type: String
    }
});
module.exports = {
    history: mongoose.model('history', userHistoriesSchema)
};
