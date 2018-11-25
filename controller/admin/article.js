const articleModel = require('../../models/article')
const typeModel = require('../../models/type')
const path = require('path')

module.exports = {
    async articleAdd(ctx, next) {
        let params = ctx.request.body
        try {
            let data = await ctx.add(articleModel, params)
            ctx.send(data)
        } catch (err) {
            ctx.sendError(err)
        }
    },
    async getCategory(ctx, next) {
        try {
            let data = await ctx.find(typeModel, {}, {
                _id: 0
            })
            ctx.send(data)
        } catch (err) {
            ctx.sendError(err)
        }
    },
    async getListData(ctx, next) {
        let {
            keywords,
            currentPage = 1,
            pageSize = 10
        } = ctx.request.query
        let reg = new RegExp(keywords, 'i')
        try {
            let data = await ctx.findPage(articleModel, {
                $or: [{
                        title: {
                            $regex: reg
                        },
                    },
                    {
                        desc: {
                            $regex: reg
                        }
                    }
                ]
            }, {
                markdown: 0
            }, {
                limit: pageSize * 1,
                skip: (currentPage - 1) * pageSize
            })
            ctx.send(data)
        } catch (err) {
            ctx.sendError(err)
        }
    },
    async articleEdit(ctx, next) {
        let articleData = ctx.request.body
        try {
            let data = await ctx.update(articleModel, {
                _id: articleData._id
            }, articleData)
            ctx.send(data)
        } catch (err) {
            ctx.sendError(err)
        }
    },
    async articleDelete(ctx, next) {
        let id = ctx.request.body
        try {
            let data = await ctx.remove(articleModel, {
                _id: id
            })
            ctx.send(data)
        } catch (err) {
            ctx.sendError(err)
        }
    },
    async markdown_upload_img (ctx, next) {
        console.log('----------------添加图片 markdown_upload_img-----------------------');
        let opts = {
            path: path.resolve(__dirname, '../../public')
        }
        let result = await ctx.uploadFile(ctx, opts)
        ctx.send(result)
    }
}