/**
 * Created by Kzhang on 2018/5/31.
 */
const session = require('koa-session-minimal');
const MysqlSession = require('koa-mysql-session');
let store = new MysqlSession(require('../lib/config').db_info.options);

const ONE_DAY = 24 * 3600 * 1000;


let cookie = {
    maxAge: ONE_DAY * 30,
    expires: ONE_DAY * 30,
    path: '/',
    domain: '',
    httpOnly: true,
    overwrite: '',
    secure: '',
    sameSite: '',
    signed: '',
};

module.exports = session({
    key: 'SESSION_ID',
    store: store,
    cookie: cookie
});
