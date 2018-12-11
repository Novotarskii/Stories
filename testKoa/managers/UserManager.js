const DBmodel = require('../model/UserModel.js');
const DBStoryModel = require('../model/UserHistoriesModel.js')
const mongoose = require('mongoose');


module.exports = {

    DbConnect: function (DBURL) {
        mongoose.connect(DBURL)
            .then(function () {
                console.log('mongoDb is connected');
            })
            .catch(function (err) {
                console.log(" asdada" + err);
            });
    },

    saveToDb: async function(user){
       return data = await user.save()
    },

    searchUserByFirstName: async function(fs){
        return await DBmodel.acc.find({first_name: fs});
    },

    searchUserByEmail: async function(em){
        return await DBmodel.acc.find({email: em});
    },

    searchUserByFirstNameAndLastName: async function(fs, pass){
        return await DBmodel.acc.find({first_name: fs, last_name: pass});
    },

    searchUserStoriesById: async function(id){
        return await DBStoryModel.history.find({idOfUser: id});
    },

    newAcc: function (fn, ln, em){
        return new DBmodel.acc({
            first_name: fn,
            last_name: ln,
            email: em
        });
    },
    newStory: function(story, id){
        return new DBStoryModel.history({
            titleOfHistory: story.title,
            textOfHistory: story.text,
            img: story.image,
            idOfUser: id
        });
    },
    findOne: async function (ctx) {
        return await DBmodel.acc.findById(ctx.request.params.userId);
    }
};






