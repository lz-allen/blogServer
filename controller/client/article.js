const articleModel = require('../../models/article')
const typeModel = require('../../models/type')
module.exports = {
  async listData(ctx, next) {
    let {
      pageSize = 6,
      currentPage = 1,
      type
    } = ctx.request.query
    let conditions = {}
    if (type) {
      conditions['type'] = type
    }
    try {
      let data = await ctx.findPage(articleModel, conditions, {
        textVal: 0,
        markdown: 0,
        comment: 0,
        total: 0,
        isVisible: 0
      }, {
        limit: pageSize * 1,
        skip: (currentPage - 1) * pageSize,
        sort: {
          publishTime: -1
        }
      })
      ctx.send(data)
    } catch (error) {
      ctx.sendError(error)
    }
  },
  async articleInfo(ctx, next) {
    let id = ctx.request.query.id
    try {
      let data = await ctx.findOne(articleModel, {_id: id})
      ctx.send(data)
      console.log(data)
    } catch (error) {
      ctx.sendError(error)
    }
  },
  async getCategory(ctx, next) {
      try {
          let data = await ctx.find(typeModel)
          ctx.send(data)
      } catch (err) {
          ctx.sendError(err)
      }
  },
  async randomArticle(ctx, next) {
    try {
      let data =await ctx.find(articleModel, {}, {_id: 1, title: 1})
      data.sort(function(){ return 0.5 - Math.random() })
      if (data.length > 5) {
        ctx.send(data.slice(0, 5))
      } else {
        ctx.send(data)
      }

    } catch (err) {
      ctx.sendError(err)
    }
  }
}