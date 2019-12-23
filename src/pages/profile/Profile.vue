<template>
  <div id="profileContainer">
    <div class="header">
      <img :src=" userInfo.avatarUrl ? userInfo.avatarUrl : '/static/imgs/personal/personal.png' " alt="">
      <button open-type="getUserInfo" @getuserinfo="handleGetUserInfo">{{ userInfo.nickName ? userInfo.nickName : '登录'}}</button>
    </div>
    <div class="cardList">
      <div class="card" @click="toScanCode">
        <span>扫码看书</span>
        <span class="more"> > </span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
      data(){
          return {
              userInfo: {},
          }
      },

      mounted(){
          // 调用前需要用户授权, 即：第一次不执行.
          // 在获得授权之后，以后的刷新或者再次进入小程序后，会自动执行
          wx.getUserInfo({
              success: (res) => {
                  console.log('mouted里面的数据',res)
                  // 更新userInfo的状态数据
                  this.userInfo = res.userInfo
              },
              fail: () => {
                  console.log('没有授权，获取失败');
              }
          })
      },

      methods: {
          handleGetUserInfo(res){
          console.log(res)
          if (res.mp.detail.userInfo){
              // 更新状态
              this.userInfo = res.mp.detail.userInfo
          }},
          // 打开摄像头扫码
          toScanCode(){
              wx.scanCode({
                  scanType: ['barCode', 'qrCode', 'datamatrix', 'pdf417'],
                  success: (res)=>{
                      console.log('扫码结果', res)
                  },
              })
          }
      },
  }
</script>


<style lang="stylus" rel="stylesheet/stylus">
  #profileContainer
    .header
      padding 40rpx
      background #489B99
      img
        width 100rpx
        height 100rpx
        vertical-align middle
        /* 将头像设置为圆形   */
        border-radius 50rpx
      button
        display inline-block
        height 60rpx
        line-height 60rpx
        background rgba(255,255,255, 0.5)
        margin-left 40rpx
        // 垂直居中
        vertical-align middle
        max-width 200rpx
    .cardList
      .card
        width 94%
        height 60rpx
        line-height 60rpx
        margin 10rpx auto
        border-bottom 1rpx solid #eee
        padding 10rpx
        .more
          float right
</style>
