/**
 * Created by Kzhang on 2018/5/31.
 */
const mysql = require('../db/mysql');
const util = require('../lib/util');
module.exports = {
    async register(ctx){
        let parseData = ctx.request.body;
        if (!util.paramsIsvalid(parseData.name, parseData.account, parseData.password))return ctx.body = util.creatCodeObj(400, '参数错误');
        let verify = await mysql.query('SELECT * FROM users where account=?', [parseData.account]);
        if (verify.length === 0) {
            await mysql.query('INSERT INTO users(name,account,password) VALUES(?,?,?)', [parseData.name, parseData.account, parseData.password]);
            ctx.session.user = {account:parseData.account,password:parseData.password};
            return ctx.body = util.creatCodeObj(200, '注册成功')
        } else {
            return ctx.body = util.creatCodeObj(200, '已被注册')
        }
    },
    async login(ctx){

    },
};