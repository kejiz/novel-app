/**
 * Created by Kzhang on 2018/5/31.
 */
const mysql = require('mysql');
const pool = mysql.createPool({
    host: '118.24.16.174',
    user: 'zk-admin',
    password: 'zk970212',
    database: 'novel-app'
});
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
