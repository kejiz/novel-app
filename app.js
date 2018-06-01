/**
 * Created by Kzhang on 2018/5/25.
 */
const colors = require('colors');
const https = require('https');
const fs = require('fs');
const querystring = require('querystring');
const path = require('path');

const koa = require('koa');
const index = require('./lib/index-page');    //--
const router = require('./router/routes');
const sessions =require('./middleware/session');
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

app.use(async (ctx, next) => {
    await next();
    console.log(`${ctx.method} ${ctx.url}`)
});

app.use(router.routes(), router.allowedMethods());

//          *******************         view
view(app, {
    root: path.join(__dirname, 'view'),
    layout: false,
    viewExt: 'html',
    cache: true,
    debug: false,
});

app.use(serve(__dirname + "/static/"));
app.use(favicon(__dirname + '/static/img/favicon.ico'));
app.use(index);

//             *********************           //
var options = {
    key: fs.readFileSync('./keys/cnmkeji.com.key'),
    cert: fs.readFileSync('./keys/cnmkeji.com.cer'),
    ca: [fs.readFileSync('./keys/cnmkeji.com_ca.crt')],
};

app.listen(8080);
https.createServer(options, app.callback()).listen(443);
console.log("server start at 8080".green);