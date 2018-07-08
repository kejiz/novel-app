/**
 * Created by Kzhang on 2018/5/25.
 */
const colors = require('colors');
const https = require('https');
const fs = require('fs');
const querystring = require('querystring');
const path = require('path');

const koa = require('koa');
const index = require('./middleware/index-page');    //--
const router = require('./router/routes');
const sessions = require('./middleware/session');
const view = require('koa-ejs');       //--
const serve = require("koa-static");    //--
const favicon = require("koa-favicon"); //--
const bodyParser = require('koa-bodyparser');

const app = new koa();
app.use(sessions);
app.use(async (ctx, next) => {
    if (ctx.querystring) {
        ctx.query = querystring.parse(ctx.querystring);
    }
    await next();
});
app.use(bodyParser());
app.use(router.routes(), router.allowedMethods());

//          *******************         view
view(app, {
    root: path.join(__dirname, 'view'),
    layout: 'layout',
    viewExt: 'html',
    cache: false,
    debug: false,
});

app.use(serve(__dirname + "/static/"));
app.use(favicon(__dirname + '/static/img/favicon.ico'));
app.use(index);

//             *********************           //
// const options = {
//     key: fs.readFileSync('./keys/cnmkeji.com.key'),
//     cert: fs.readFileSync('./keys/cnmkeji.com.cer'),
//     ca: [fs.readFileSync('./keys/cnmkeji.com_ca.crt')],
// };
//
// if (process.env.NODE_ENV == 'pro') {
//     console.log('线上环境');
//     https.createServer(options, app.callback()).listen(443);
// } else {
//     console.log('开发环境');
    app.listen(8080);
// }
console.log("server start".green);