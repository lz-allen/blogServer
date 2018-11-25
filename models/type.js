const mongoose = require('mongoose')

const typeSchema = mongoose.Schema({
    text: String,
    value: String
})

module.exports = mongoose.model('type', typeSchema)