const jwt = require('jsonwebtoken')
const conf = require('../../config')

module.exports = () => {
  return async (ctx, next) => {
    if (conf.auth.blackList.some(v => ctx.path.indexOf(v) >= 0) && ctx.path.indexOf('login') < 0){
      if (!ctx.header.authorization){
          ctx.sendError('token验证失败, 请重新登录!')
        return
      }

      let token = ctx.header.authorization
      try {
        jwt.verify(token, conf.auth.admin_secret)
      } catch (error) {
        if ('TokenExpiredError' === e.name) {
            ctx.sendError('token已过期, 请重新登录!')
            ctx.throw(401, 'token expired,请及时本地保存数据！')
        }
        ctx.sendError('token验证失败, 请重新登录!')
        ctx.throw(401, 'invalid token')
      }
    }
    await next()
  }
}