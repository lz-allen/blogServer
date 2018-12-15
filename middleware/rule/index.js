const Path = require('path')
const fs = require('fs')

module.exports = optons => {
  let {
    app,
    rules = []
  } = optons
  if (!app) {
    throw new Error('app参数必须要有')
  }
  app.router = {}
  const appAllKeys = Object.keys(app)
  rules.forEach(element => {
    let {
      path,
      name
    } = element
    if (appAllKeys.includes(name)) {
      throw new Error(`${name}已经存在`)  //防止方法覆盖
    }
    let content = {}
    fs.readdirSync(path).forEach(filename => {
      let extname = Path.extname(filename)  //返回path路径文件扩展名，如果path以 ‘.' 为结尾，将返回 ‘.'
      if (extname === '.js') {
        let name = Path.basename(filename, extname) // 提取出用 ‘/' 隔开的path的最后一部分  这里就是文件名   admin
        content[name] = require(Path.join(path, filename))  //'{article: Fn}'
        content.filename = filename
      }
    })
    app[name] = content   //拼装成 app.admin.article.fn
  })
}