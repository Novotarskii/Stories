const userManager = require('../managers/UserManager.js');
const jwt = require('jsonwebtoken');

module.exports = {
    into: async function (ctx) {
        try{
            let user = await userManager.searchUserByFirstNameAndLastName(
                ctx.request.body.first_name,
                ctx.request.body.last_name);

            if(Object.keys(user).length !== 0){
                const token = jwt.sign(user[0].id, 'my-secret-key');
                ctx.status = 200;
                ctx.body = token;
            } else {
                ctx.status = 403;
                ctx.body = 'not ok';
            }
        }catch(err){
            ctx.status = 401;
            ctx.body = "Помилка сталась в into " + err;
        }
    },

    checkAcc: function(ctx) {
        if (ctx.request.header.authorization === ''){
            ctx.status = 401;
            ctx.body = 'not ok';
        }else {
            try{
                const id = jwt.verify(ctx.request.header.authorization, 'my-secret-key');
                ctx.body = 'ok';
            }catch(err){
                ctx.status = 401;
                ctx.body = "Помилка сталась в checkAcc " + err;
            }
        }
    },

    createUser: async function (ctx) {
        try{
            let firstName = await userManager.searchUserByFirstName(ctx.request.body.first_name);
            let email = await userManager.searchUserByEmail(ctx.request.body.email);
            if(Object.keys(firstName).length === 0 && Object.keys(email).length === 0){
                await userManager.saveToDb(userManager.newAcc(
                    ctx.request.body.first_name,
                    ctx.request.body.last_name,
                    ctx.request.body.email));
                ctx.body = "Користувач успішно зареєстрований";
            } else {
                ctx.status = 200;
                ctx.body = "Таке ім'я користувача або email вже інсує спробуйте будь ласка інше"
            }
        }catch(err){
            ctx.status = 401;
            ctx.body = "Помилка сталась в createUser " + err;
        }
    },

    readUser: async function (ctx) {
        try{
            let user = await userManager.findOne(ctx);
            ctx.body = user;
        }catch(err){
            ctx.status = 401;
            ctx.body = "Помилка сталась в readUser " + err;
        }

    },

    addStory: async function (ctx) {
        try {
            const story = ctx.request.body;
            const id = jwt.verify(ctx.request.header.authorization, 'my-secret-key');
            await userManager.saveToDb(userManager.newStory(story, id));
            ctx.status = 200;
            ctx.body = 'ok';
        }catch(err){
            ctx.status = 401;
            ctx.body = "Помилка сталась в addStory " + err;
        }
    },
    getStories: async function(ctx) {
        try {
            const id = jwt.verify(ctx.request.header.authorization, 'my-secret-key');
            let stories = await userManager.searchUserStoriesById(id);
            ctx.status = 200;
            ctx.body = stories;
        }catch(err){
            ctx.status = 401;
            ctx.body = "Помилка сталась в getStories " + err;
        }
    },
};
