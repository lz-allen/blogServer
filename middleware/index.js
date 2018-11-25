const path = require('path')
const bodyParser = require('koa-bodyparser')
const Send = require('./send')
const Func = require('./func')
const Rule = require('./rule')
const Auth = require('./auth')
const logger = require('koa-logger')
const countNum = require('./countNum')

module.exports = app => {

  // 缓存拦截
  app.use(async (ctx, next) => {
    if (ctx.url === '/favicon.ico') return
    await next()
    ctx.status = 200
    ctx.set('Cache-Control', 'must-revalidation')
    if (ctx.fresh) {
      ctx.status = 304
      return
    }
  })

  app.use(logger())
  app.use(Send())
  app.use(Func())
  app.use(bodyParser())
  app.use(Auth())
  // app.use(countNum())
  app.use(require('koa-static')(__dirname + '../../public'))
  Rule({
    app,
    rules:[
      {
        path: path.join(__dirname, '../controller/admin'),
        name: 'admin'
      },
      {
        path: path.join(__dirname, '../controller/client'),
        name: 'client'
      }
    ]
  })
}