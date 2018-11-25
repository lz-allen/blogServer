const mongoose = require('../mongodb')
const userSchema = mongoose.Schema({
  username: String,
  pwd: String,
  name: String,
  roles: Array,
  loginTime: Date
})
module.exports = mongoose.model('user', userSchema)