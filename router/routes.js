const router = require('koa-router')();
const novelCtrl = require('../ctrl/novel-ctrl');
const userCtrl = require('../ctrl/user-ctrl');
const novel = router
    .get('/zk/directory', novelCtrl.directory)
    .get('/zk/search', novelCtrl.search)
    .get('/zk/chapter/:id/:html', novelCtrl.chapter)
    .get('/zk/chapter/:id/:html', novelCtrl.chapter);


const user = router
    .post('/user/register', userCtrl.register)
    .get('/user/login', userCtrl.login);

module.exports = router
    .use(novel.routes(), novel.allowedMethods())
    .use(user.routes(), user.allowedMethods());

