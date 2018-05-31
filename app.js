/**
 * Created by Kzhang on 2018/5/25.
 */
const colors = require('colors');
const https = require('https');
const fs = require('fs');
const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('./router/routes');
const querystring = require('querystring');
const app = new koa();

const path = require('path');
//view package
const index = require('./lib/index');
const view = require('koa-ejs');
const serve = require("koa-static");
const favicon = require("koa-favicon");
//***********//

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

app.listen(80);
https.createServer(options, app.callback()).listen(443);
console.log("server start at 80".green);