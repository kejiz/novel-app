const router = require('koa-router')();
const novelCtrl = require('../ctrl/novel-ctrl');
const userCtrl = require('../ctrl/user-ctrl');
const collectCtrl = require('../ctrl/collect-ctrl');
const textareaCtrl = require('../ctrl/textaera');

const novel = router
    .get('/zk/directory', novelCtrl.directory)
    .get('/zk/search', novelCtrl.search)
    .get('/zk/chapter/:id/:html', novelCtrl.chapter);

const user = router
    .post('/user/register', userCtrl.register)
    .post('/user/login', userCtrl.login);

const collect = router
    .post('/collect/bookmark', collectCtrl.addBookmark)
    .get('/collect/bookmark', collectCtrl.getBookmark);

const textarea = router
    .post('/textarea', textareaCtrl.put)
    .get('/textarea', textareaCtrl.get);

module.exports = router
    .use(novel.routes(), novel.allowedMethods())
    .use(user.routes(), user.allowedMethods())
    .use(textarea.routes(), textarea.allowedMethods());

