/**
 * Created by Kzhang on 2018/5/31.
 */
const mysql = require('mysql');
const pool = mysql.createPool(require('../lib/config').db_info);
console.log('数据库连接成功!'.green);
let query = function (sql, values) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err)
            } else {
                connection.query(sql, values, (err, results) => {
                    if (err) {
                        reject(err)
                    } else {
                        console.log('sql执行成功');
                        resolve(results)
                    }
                    connection.release()
                })
            }
        })
    })
};

module.exports = {query};
