const Koa = require('koa');
const router = require('./router/router');
const cors = require('koa2-cors');
const keys = require('./keys.js');
const Domain = require('domain');
const userManager = require('./managers/UserManager.js');
const domain = Domain.create();
const server = new Koa();

domain.on('error', function (err) {
    console.log('error' + err);

});
domain.run(function () {
    userManager.DbConnect(keys.mongoDB.dbURL);

    const koaOptions = {
        origin: true,
        credentials: true
    };
    server.use(router.routes());
    server.use(cors(koaOptions));
    server.listen(3000);

    console.log("Server is started on port: 3000")
});




