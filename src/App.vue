
<!--  App.vue文件中不需要模板语法  -->
<script>
  import ajax from "./api";
  export default {
      // 1、调用接口获取临时的登录凭证（code， 有效期5分钟），一旦刷新会改变。
      async mounted(){
          wx.login({
              success: async (res)=> {
                  console.log('得到临时的登录凭证', res)
                  // 得到登录凭证code
                  const code = res.code
                  // 根据server中定义的接口， 发送请求
                  const token = await ajax('/getOpenId', {code: code})
                  // 3. 将自定义登录状态缓存到storage中
                  wx.setStorageSync('token', token);
              }
          });

          // 验证token
          const result = await ajax('/test')
          console.log('验证token的结果为:', result )
      },
  }
</script>


<style lang="stylus" rel="stylesheet/stylus">
  /* 设置铺满整个屏幕   */
  page
    width 100%
    height 100%
</style>
