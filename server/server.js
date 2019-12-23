/*
* 搭建本地服务器的核心模块
* */

// 搭建服务器
let Koa = require('koa')
let KoaRouter = require('koa-router')
// 在node中使用flyio
let Fly = require('flyio/src/node')
// 引入给openId的加密的库，更安全
let jwt = require('jsonwebtoken');


// 不需要Fly后括号
const fly = new Fly

// 第一步：生成应用及路由器实例
const app = new Koa()
const router = new KoaRouter()


// 核心代码， 即：发起请求
router.get('/', (ctx, next)=>{    // 测试用
  ctx.body = '服务器返回的数据: 6';
})

// 搜索图书的接口
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


// 获取用户openId的接口
router.get('/getOpenId', async (ctx, next) => {
  // 1. 获取请求的参数
  let code = ctx.query.code
  // 开发者id信息： https://mp.weixin.qq.com/wxamp/devprofile/get_profile?token=561671762&lang=zh_CN
  let appId = 'wxe2c06c4affa58f1a'
  let appSecret = '9c8a4acd1e15805b2568d762f5c7c546'
  // 2. 根据请求的地址和参数处理数据
  let url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`
  // 向微信的官方服务器发送请求，获取openId
  const result = await fly.get(url)
  console.log(result.data, '数据类型为：', typeof result.data)
  // 将字符串解析为对象
  let userInfo =  JSON.parse(result.data)
  // 将用户的openId存入数据库， 例如：openId: {userName: 'xx', money: 'yyy'}
  // 自定义登录状态，就是根据用户的openid和sessionKey进行加密生成token，最后返回给前端页面展示
  // 对openId和sessionKey进行加密, 自定义登录状态
  let token = jwt.sign(userInfo, 'maisui')
  // 3. 响应数据(返回的数据， 但是用户的openId不能直接返回，这样是不安全的。)
  ctx.body = token
})


// 测试：后端验证token的接口
router.get('/test', (ctx, next) => {
  // 获取token的值
  console.log('后端取到的token为：', ctx.request.header.authorization)
  const token = ctx.request.header.authorization
  // { session_key: 'bvVTSxZf3pzi5yKpCwQSxA==',
  //   openid: 'olnQ_5croJ_Qty51qrKTC9-wZJyY',
  //   iat: 1571228656 } iat: 加密时的时间
  let result;
  try{
    result = jwt.verify(token, 'maisui23')
    console.log('后端验证结果', result);
    ctx.body = '后端验证成功'
  }catch (e) {
    ctx.body = '后端验证失败'
  }
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
