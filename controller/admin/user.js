const jwt = require('jsonwebtoken')
const conf = require('../../config')
const userModel = require('../../models/user')

module.exports = {
  // 登录接口
  async login(ctx, next) {
    let {
      username,
      pwd
    } = ctx.request.body
    try {
      let user = await ctx.findOne(userModel, {
        username: username
      })
      if (!user) return ctx.sendError('用户名不存在')
      if (pwd !== user.pwd) return ctx.sendError('密码错误，请重新输入!')
      await ctx.update(userModel, {
        _id: user._id
      }, {
        $set: {
          loginTime: new Date()
        }
      })
      let payload = {
        _id: user._id,
        username: user.username,
        name: user.name,
        roles: user.roles
      }
      // 生成签名半个小时有效期
      let token = jwt.sign(payload, conf.auth.admin_secret, {
        expiresIn: '0.5h'
      })
      ctx.cookies.set(conf.auth.tokenKey, token, {
        path: '/',
        maxAge: 0.5 * 60 * 60 * 1000,
        httpOnly: false,
      })
      ctx.send({
        message: '登录成功'
      })
    } catch (error) {
      if (error === '暂无数据') return ctx.sendError('用户名不存在')
      ctx.throw(error)
      ctx.sendError(error)
    }
  },
  // 用户信息接口
  async info(ctx, next) {
    let token = ctx.request.query.token
    try {
      let tokenInfo = jwt.verify(token, conf.auth.admin_secret)
      ctx.send({
        username: tokenInfo.username,
        name: tokenInfo.name,
        _id: tokenInfo._id,
        roles: tokenInfo.roles
      })
    } catch (error) {
      if ('TokenExpiredError' === error) {
        ctx.sendError('鉴权失败,重新登录')
        ctx.throw(401, 'token expired,请及时本地保存数据！')
      }
      ctx.throw(401, '无效的token')
      ctx.sendError('无效的token')
    }
  },
  async listData(ctx, next) {
    let {
      keywords,
      pageSize = 10,
      currentPage = 1
    } = ctx.request.query
    try {
      let reg = new RegExp(keywords, 'i')
      let data = await ctx.findPage(userModel, {
        $or: [
            {
                name: {
                    $regex: reg
                },
            },
            {
                username: {
                    $regex: reg
                }
            }
        ]
      }, {
        pwd: 0
      }, {
        limit: pageSize*1,
        skip: (currentPage - 1) * pageSize
      })
      ctx.send(data)
    } catch (error) {
      ctx.send(error)
    }
  },
  async userDelete(ctx, next) {
      let userId = ctx.request.body._id
      if (userId === '5b73efe90adcd5ebd82448c7') {
          ctx.sendError('管理员账号无法删除')
          return
      }
      try {
          let data = await ctx.remove(userModel, {_id: userId})
          ctx.send(data)
      } catch (error) {
          ctx.sendError(error)
      }
  },
  async userEdit(ctx, next) {
      let userInfo = ctx.request.body
      delete userInfo.loginTime
      try {
        let user = await ctx.findOne(userModel,{_id:userInfo._id})
        if (user.pwd !== userInfo.oldPwd) {
            ctx.sendError('原密码错误')
            return
        }
        delete userInfo.oldPwd
        let data = await ctx.update(userModel, {_id: userInfo._id}, userInfo)
        ctx.send(data)
      } catch (error) {
          ctx.sendError(err)
      }
  },
  async userAdd(ctx, next) {
      let userInfo = ctx.request.body
      let userData = {
          name: userInfo.name,
          username: userInfo.userName,
          pwd: userInfo.pass,
          roles: userInfo.roles
      }
      delete userInfo.checkPass
      try {
        let user = await ctx.findOne(userModel,{username:userData.username})
        if (user) {
            ctx.sendError('用户存在,请重新输入！')
        } else {
            let data = await ctx.add(userModel, userData)
            ctx.send(data)
        }
      } catch (err) {
          ctx.sendError(err)
      }
  }
}