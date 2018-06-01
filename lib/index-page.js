/**
 * Created by Kzhang on 2018/5/28.
 */
const novelCtrl = require('../ctrl/novel-ctrl');
module.exports = async function (ctx) {
    let data;
    let page = 'index';
    if (ctx.query.q) {
        data = await novelCtrl.search(ctx);
        page = 'search';
    }
    if (ctx.query.id) {
        data = await novelCtrl.directory(ctx);
        page = 'directory';
    }
    if (ctx.path.indexOf('html') >= 0) {
        data = await novelCtrl.chapter(ctx);
        page = 'chapter';
    }
    if (data == '404') {
        page = '404'
    }
    await ctx.render(page, {data,cache:true});
};

