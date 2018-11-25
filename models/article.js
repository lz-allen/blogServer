const mongoose = require('mongoose')

const articleSchema = mongoose.Schema({
    type: String,
    title: String,
    desc: String,
    textVal: String,
    markdown: String,
    publishTime: Date,
    total: Number,
    comment: Array,
    isVisible: Boolean
})

module.exports = mongoose.model('blog', articleSchema)