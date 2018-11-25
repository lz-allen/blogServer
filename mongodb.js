const mongoose = require('mongoose');
const conf = require('./config')

const DB_URL = `mongodb://${conf.mongodb.username}:${conf.mongodb.pwd}@${conf.mongodb.address}/${conf.mongodb.db}?authSource=${conf.mongodb.authSource}`
mongoose.Promise = global.Promise
mongoose.connect(DB_URL, {
  useNewUrlParser: true
}, err => {
  err ? console.log('数据库连接失败') : console.log('数据库连接成功')
})
module.exports = mongoose