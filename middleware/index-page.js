/**
 * Created by Kzhang on 2018/5/28.
 */
const novelCtrl = require('../ctrl/novel-ctrl');
module.exports = async function (ctx) {
    if(!ctx.session.user){
        ctx.session.user={
            name:'游客',
        }
    }
    console.log(('获取session:' + JSON.stringify(ctx.session.user)).green);
    let data={};
    data.html_title='柯基小说网';
    let page = 'index';
    if (ctx.query.q) {
        data.content = await novelCtrl.search(ctx);
        data.html_title='搜索结果';
        page = 'search';
    }
    if (ctx.query.id) {
        data = await novelCtrl.directory(ctx);
        data.html_title='章节目录';
        page = 'directory';
    }
    if (ctx.path.indexOf('html') >= 0) {
        data = await novelCtrl.chapter(ctx);
        data.html_title=data.novel_name+' '+data.title+'_柯基小说网';
        page = 'chapter';
    }
    if (data == '404') {
        page = '404'
    }
    await ctx.render(page, {data, cache: true});
};

