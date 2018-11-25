const Busboy = require('busboy')
const fs = require('fs')
const path = require('path')

//检测文件并创建文件
const mkdirSync = dirname => {
    if (fs.existsSync(dirname)) {
        return true
    } else {
        if (mkdirSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname)
            return true
        }
    }
}

module.exports = {
    uploadFile(ctx, opts){
        //重命名
        function rename(fileName) {
            return Math.random().toString(16).substr(2) + '.' + fileName.split('.').pop()
        }

        let busboy = new Busboy({
            headers: ctx.req.headers
        });
        /*
            filename: 字段名，
            file: 文件流,
            filename: 文件名
        */
        return new Promise((resolve, reject) => {
            var fileObj = {}
            busboy.on('file', async (fieldname, file, filename, encoding, mimetype) => {
                let filePath = '',
                    imgPrefix = ''

                if (fieldname === 'markdown_img') {
                    filePath = path.join(opts.path, mimetype.split('/')[0] + 's/markdown')
                    console.log(ctx.host)
                    imgPrefix = `${ctx.protocol}://${ctx.host}/${mimetype.split('/')[0]}s/markdown`
                } else {
                    filePath = path.join(opts.path, mimetype.split('/')[0] + 's')
                    imgPrefix = `${ctx.protocol}://${ctx.host}/${mimetype.split('/')[0]}s`
                }


                if (!mkdirSync(filePath)) {
                    throw new Error('没找到目录')
                }
                let fName = rename(filename),
                    fPath = path.join(path.join(filePath, fName))
                file.pipe(fs.createWriteStream(fPath))

                file.on('end', () => {
                    fileObj[fieldname] = `${imgPrefix}/${fName}`
                })
            })

            busboy.on('field', (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) => {
                fileObj[fieldname] = val;
            })

            busboy.on('finish', async () => {
                resolve(fileObj)
            })
            busboy.on('error', function (err) {
                reject(err)
            })

            ctx.req.pipe(busboy)
        })
    }
}