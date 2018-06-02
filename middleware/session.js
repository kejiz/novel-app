/**
 * Created by Kzhang on 2018/5/31.
 */
const session = require('koa-session-minimal');
const MysqlSession = require('koa-mysql-session');
let store = new MysqlSession(require('../lib/config').db_info.options);

let cookie = {
    maxAge: 60000 * 60 * 24, // cookie有效时长
    expires: '',  // cookie失效时间
    path: '/', // 写cookie所在的路径
    domain: '', // 写cookie所在的域名
    httpOnly: true, // 是否只用于http请求中获取
    overwrite: '',  // 是否允许重写
    secure: '',
    sameSite: '',
    signed: '',
};

module.exports = session({
    key: 'SESSION_ID',
    store: store,
    cookie: cookie
});
