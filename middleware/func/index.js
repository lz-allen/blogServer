const db_func = require('./db')
const file_func = require('./file')

module.exports = () => {
  const func = Object.assign({}, db_func, file_func)
  return async (ctx, next) => {
    for (const key in func) {
      if (func.hasOwnProperty(key)) {
        ctx[key] = func[key]
      }
    }
    await next()
  }
}