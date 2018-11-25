// 统计文章浏览量
module.exports = () => {
    let newNum = 0
    return async (ctx, next) => {
        if (ctx.request.url.indexOf('/client_demo_api/article/articleInfo?') !== -1 && ctx.request.query.id) {
            let oldNum = ctx.find()
            num++
            console.log(num)
        }
        // console.log(ctx.request)
        await next()
    }
}