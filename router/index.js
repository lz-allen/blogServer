const koaRouter = require('koa-router')
const router = koaRouter()
module.exports = app => {
  // admin
  //  用户接口
  router.post('/admin_demo_api/user/login', app.admin.user.login),
  router.get('/admin_demo_api/user/info', app.admin.user.info),
  router.get('/admin_demo_api/user/list', app.admin.user.listData)
  router.post('/admin_demo_api/user/delete', app.admin.user.userDelete)
  router.post('/admin_demo_api/user/edit', app.admin.user.userEdit)
  router.post('/admin_demo_api/user/add', app.admin.user.userAdd)
  //  文章接口
  router.post('/admin_demo_api/article/add', app.admin.article.articleAdd)
  router.get('/admin_demo_api/article/type', app.admin.article.getCategory)
  router.get('/admin_demo_api/article/listData', app.admin.article.getListData)
  router.post('/admin_demo_api/article/delete', app.admin.article.articleDelete)
  router.post('/admin_demo_api/article/edit', app.admin.article.articleEdit)
  // 图片上传
  router.post('/admin_demo_api/markdown_upload_img', app.admin.article.markdown_upload_img)

  // client 
  router.get('/client_demo_api/article/listData', app.client.article.listData)
  router.get('/client_demo_api/article/articleInfo', app.client.article.articleInfo)
  router.get('/client_demo_api/article/getCategory', app.client.article.getCategory)
  router.get('/client_demo_api/article/randomArticle', app.client.article.randomArticle)
  app.use(router.routes()).use(router.allowedMethods())  //将router下的所有routers注册到app对象上面
                                                          //allowedMethods：顾名思义：就是当前接口运行的method。 比如，一个提供数据的接口，就可以设置为GET， 当客户端发送POST请求时，就会直接返回失败。
}