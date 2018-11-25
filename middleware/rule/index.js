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
      throw new Error(`${name}已经存在`)
    }
    let content = {}
    fs.readdirSync(path).forEach(filename => {
      let extname = Path.extname(filename)
      if (extname === '.js') {
        let name = Path.basename(filename, extname)
        content[name] = require(Path.join(path, filename))
        content.filename = filename
      }
    })
    app[name] = content
  })
}