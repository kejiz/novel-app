/**
 * Created by Kzhang on 2018/5/25.
 */
const urlencode = require('urlencode');
const cheerio = require('cheerio');
const request = require('request');
const iconv = require('iconv-lite');
const novel_ips = require('../lib/config').novel_ips;

module.exports = {
    async directory(ctx){
        if (!ctx.query.id) return ctx.body = '404';
        let directory = await getDirectory(ctx.query.id);
        if (directory.length < 1) return ctx.body = '404';
        return ctx.body = {
            id: ctx.query.id,
            directory
        };
    },
    async search(ctx){
        if (!ctx.query.q) return ctx.body = '404';
        let result = await query(ctx.query.q);
        if (result.length < 1) return ctx.body = 'not found';
        return ctx.body = result;
    },
    async chapter(ctx){
        return ctx.body = await getChapter(ctx);
    }
};

async function query(name) {
    return new Promise(function (resolve, rej) {
        request({
            url: novel_ips[0] + '/s.php?q=' + urlencode.encode(name, 'gbk'),
            encoding: null
        }, function (err, resp, body) {
            resolve(findNovel(iconv.decode(body, 'gb2312')));
            console.log(('查找小说:' + name).green);
        });
    })
}
function findNovel(html) {
    let $ = cheerio.load(html);
    let arr = [];
    $('.bookname ').each((index, item) => {
        let _this = $(item);
        arr.push({
            id: _this.find('a').attr('href'),
            name: _this.text()
        })
    });
    return arr
}

async function getDirectory(url) {
    return new Promise(function (resolve, rej) {
        request({
            url: novel_ips[0] + '/' + url,
            encoding: null
        }, function (err, resp, body) {
            console.log(body);
            resolve(findDirectory(iconv.decode(body, 'gb2312')));
            console.log('获取目录'.green);
        })
    })
}

function findDirectory(html) {
    let $ = cheerio.load(html);
    let list = $('.listmain ').find('dl')[0].children;
    let newsArr = [];
    let arr = [];
    let flag = true;
    list.forEach((item) => {
        let _this = $(item);
        let a = _this.find('a');
        if (_this[0].name == 'dt') {
            flag = !flag
        }
        if (a.attr('href') !== '' && a.text() !== '') {
            if (flag) {
                arr.push({
                    id: a.attr('href'),
                    name: a.text()
                });
            } else {
                newsArr.push({
                    id: a.attr('href'),
                    name: a.text()
                });
            }

        }
    });
    return {
        newsArr,
        arr
    };
}

async function getChapter(ctx) {
    if (!ctx.params) {
        let arr = ctx.path.split('/');
        ctx.params = {
            id: arr[1],
            html: arr[2]
        }
    }
    return new Promise(function (resolve, rej) {
        request({
            url: novel_ips[0] + '/' + ctx.params.id + '/' + ctx.params.html,
            encoding: null
        }, function (err, resp, body) {
            resolve(findChapter(iconv.decode(body, 'gb2312'),ctx.params.html));
            console.log(('获取章节:').green);
        })
    })
}


function findChapter(html,id) {
    let $ = cheerio.load(html);
    let menu = $('.page_chapter').children().children();
    return {
        id,
        title: $('h1').text(),
        content: $('#content').html(),
        prev: menu.eq(0).children().attr('href'),
        next: menu.eq(2).children().attr('href'),
        directory: menu.eq(1).children().attr('href'),
        novel_name:$('.path').children().children().eq(1).text()
    };
}
