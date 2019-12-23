/* 封装的ajax的请求 */
/*
* api
* https://developers.weixin.qq.com/miniprogram/dev/api/network/request/wx.request.html
*
* */
const base_url = 'http://localhost:3000'


// 常用于携带token的方式：1、放在cookie中（不推荐使用）； 2、作为参数放在url中； 3、放在请求头中（最常用的方式）

// 取到token
let token = wx.getStorageSync('token');

export default function ajax(url, data={}, method ='GET') {
  return new Promise((resolve, reject) => {
    wx.request({
      url: base_url + url,
      data,
      method,
      header: {
        authorization: token
      },
      success: (res) => {
        console.log('请求得到的数据', res.data)
        resolve(res.data)
      },
      failed: (error) => {
        console.log('请求失败')
        reject(error)
      },
    })
  })
}
