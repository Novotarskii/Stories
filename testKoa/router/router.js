const KoaRouter = require('koa-router');
const koaBody = require('koa-body');
const routerController = require('../controller/RouterController.js');
const router = new KoaRouter();

router.post('/into', koaBody(), routerController.into);
router.post('/create', koaBody(), routerController.createUser);
router.post('/addStory', koaBody(), routerController.addStory);
router.get('users/:userId', routerController.readUser);
router.get('/checkAcc', routerController.checkAcc);
router.get('/getStories', routerController.getStories)

module.exports = router;

