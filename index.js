import '@babel/polyfill'
import Koa from 'koa'
import Router from 'koa-router'
import Logger from 'koa-logger'
import BodyParser from 'koa-bodyparser'
import Helmet from 'koa-helmet'
// import respond from 'koa-respond'
import Static from 'koa-static'
// import mongoose from 'mongoose'

import { crawlIns } from './inSpider'


const app = new Koa()
const router = new Router()

app.use(Helmet())
app.use(Logger())
app.use(BodyParser({
  enableTypes: ['json'],
  jsonLimit: '5mb',
  strict: true,
  onerror: (err, ctx) => {
    ctx.throw('body parse error')
  }
}))

const port = 9093
// const db_url = 'mongodb://localhost:27017/instagram'

// crawlIns('codeagardenwithstars')
// const insObj = await crawlIns('codeagardenwithstars')
router.get('/:id', async (ctx, next) => {
  console.log(ctx.request.url);
  const name = ctx.request.url.replace(/\//g,'')
  const insObj = await crawlIns(name)
  console.log(insObj);
  ctx.response.type = 'json'
  ctx.response.body = insObj
})

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(port, () => {
  console.log(`Server started on ${port}`)
})
