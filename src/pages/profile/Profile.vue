<template>
  <div id="profileContainer">
    <div class="header">
      <img src="/static/imgs/personal/personal.png" alt="">
      <button open-type="getUserInfo" @getuserinfo="handleGetUserInfo">登陆</button>
    </div>
    <div class="cardList">
      <div class="card">
        <span>扫码看书</span>
        <span class="more"> > </span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      handleGetUserInfo(res){
        console.log(res)
      },
    }
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
