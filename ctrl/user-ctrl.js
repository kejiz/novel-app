/**
 * Created by Kzhang on 2018/5/31.
 */
const mysql = require('../db/mysql');
module.exports = {
    async register(ctx){
        mysql.query('INSERT INTO user(name,account,password) VALUES(?,?,?)', ['z', 'zk4635', '123']);
        return ctx.body = '注册成功'
    },
    async login(ctx){
        return ctx.body = '登陆成功'
    },
};