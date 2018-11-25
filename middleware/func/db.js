const add = (model, value) => {
  return new Promise((resolve, reject) => {
    model.create(value, (err, res) => {
      if (err) {
        reject(err)
      }
      resolve(res)
    })
  })
}

const update = (model, conditions, update, options) => {
  return new Promise((resolve, reject) => {
    model.updateOne(conditions, update, options, (err, res) => {
      if (err) {
        reject(err)
      }
      resolve(res)
    })
  })
}

const remove = (model, conditions) => {
  return new Promise((resolve, reject) => {
    model.deleteOne(conditions, (err,res) => {
        if (err) {
            reject(err)
        }
        resolve(res)
    })
  })
}

const findOne = (model, conditions, fields) => {
  return new Promise((resolve, reject) => {
    model.findOne(conditions, fields, (err, res) => {
      if (err) {
        reject(err)
      }
      resolve(res)
    })
  })
}

const find = async (model, conditions, fields, options) => {
  return new Promise((resolve, reject) => {
      model.find(conditions, fields, (err, res) => {
          if (err) {
              reject(err)
          }
          resolve(res)
      })
  })
}

const findPage = async (model, conditions, fields, options) => {
  const getCount = () => {
    return new Promise((resolve, reject) => {
      model.countDocuments(conditions, (err, res) => {
        if (err) {
          return reject(err)
        }
        resolve(res)
      })
    })
  }
  const count = await getCount()
  return new Promise((resolve, reject) => {
    model.find(conditions, fields).limit(options.limit).skip(options.skip).sort(options.sort).exec((err, res) => {
        if (err) {
            return reject(err)
        }
        resolve({
            list: res,
            total: count
        })
    })
  })
}

module.exports = {
  add,
  update,
  find,
  findOne,
  findPage,
  remove
}