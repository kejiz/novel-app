/**
 * Created by Kzhang on 2018/6/1.
 */
const mysql = require('../db/mysql');
const util = require('../lib/util');
module.exports = {
    async addBookmark(ctx){
        let parseData = ctx.request.body;
        if (!util.paramsIsvalid(parseData.bookmark))return ctx.body = util.creatCodeObj(400, '参数错误');
        let id = ctx.session.user.id ? ctx.session.user.id : ctx.cookies.get('SESSION_ID');
        let verify = await mysql.query('SELECT * FROM bookmark where id=?', [id]);
        if (verify.length > 0 && verify[0].bookmark == parseData.bookmark) {
            return ctx.body = util.creatCodeObj(200, '已收录');
        } else {
            mysql.query('INSERT INTO bookmark(id,bookmark,href) VALUES(?,?,?)', [id, parseData.bookmark,parseData.href]);
            return ctx.body = util.creatCodeObj(200, '添加成功');
        }
    },
    async getBookmark(ctx){
        let id = ctx.session.user.id ? ctx.session.user.id : ctx.cookies.get('SESSION_ID');
        let bookmark = await mysql.query('SELECT * FROM bookmark where id=?  order by `CreateTime` DESC', [id]);
        return ctx.body = bookmark
    }
};