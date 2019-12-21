/*
* 搭建服务器的核心模块
* */

// 搭建服务器
let Koa = require('koa')
let KoaRouter = require('koa-router')


// 第一步：生成应用及路由器实例
const app = new Koa()
const router = new KoaRouter()


// 核心代码， 即：发起请求
router.get('/', (ctx, next)=>{    // 测试用
  ctx.body = '服务器返回的数据: 6';
})

// 搜索图书的借口
let datas = require('./mock/data')
router.get('/searchBooks', (ctx, next)=> {
  // 1. 获取请求的参数
  let req = ctx.query.req
  console.log('得到请求参数：', req)
  // 2. 根据请求的地址和参数处理数据
  let bookArr = datas
  // 3. 响应数据(返回的数据)
  ctx.body = bookArr
})


















// 第二步： 使用路由器及对应的路由
app
  .use(router.routes())     // 声明使用路由器
  .use(router.allowedMethods())  // 允许使用路由的方法


// 第三步： 监听端口
app.listen('3000', () => {
  console.log('服务器启动成功')
  console.log('服务器地址： http://localhost:3000');
})
