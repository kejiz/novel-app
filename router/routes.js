const router = require('koa-router')();
const novelCtrl = require('../ctrl/novel-ctrl');

const routers = router
    .get('/zk/directory', novelCtrl.directory)
    .get('/zk/search', novelCtrl.search)
    .get('/zk/chapter/:id/:html', novelCtrl.chapter);

module.exports = router.use(routers.routes(), routers.allowedMethods());

