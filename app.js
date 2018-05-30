/**
 * Created by Kzhang on 2018/5/25.
 */
const colors = require('colors');
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
    cache: false,
    debug: false,
    escape:function (str) {
        console.log(str);
    }
});

app.use(serve(__dirname + "/static/"));

app.use(index);
//             *********************           //

app.listen(5060);
console.log("server start at 5050".red);