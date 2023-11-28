const Koa = require('koa')
const Router = require('koa-router')
const mockList = require('./mock/index')

const app = new Koa()
const router = new Router()

mockList.forEach(mock => {
    const { url, method, response } = mock
    router[method](url, async ctx => {
        ctx.body = response(ctx)
    })
})

app.use(router.routes())
app.listen(3001)