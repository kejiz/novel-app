/**
 * Created by Kzhang on 2018/5/31.
 */
const mysql = require('mysql');
const db_info = require('../lib/config').db_info;
const pool = mysql.createPool(db_info.options);

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
                        resolve(results)
                    }
                    connection.release()
                })
            }
        })

    })
};

for (let i in db_info.tables) {
    query("alter table " + db_info.tables[i] + " add CreateTime  TIMESTAMP  not Null  DEFAULT CURRENT_TIMESTAMP ;");
}



module.exports = {query};
