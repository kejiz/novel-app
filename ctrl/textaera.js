/**
 * Created by Kzhang on 2018/9/23.
 */
const mysql = require('../db/mysql');
const util = require('../lib/util');
module.exports = {
    async put(ctx){
        let parseData = ctx.request.body;
        let id = 1;
        await mysql.query(`update textarea set textarea ='${parseData.textarea}' where id ='${id}'`);
        return ctx.body = util.creatCodeObj(200, '修改成功');
    },
    async get(ctx){
        let id = 1;
        let textarea = await mysql.query('SELECT * FROM textarea where id=?  ', [id]);
        console.log(textarea);
        return ctx.body = textarea
    }
};