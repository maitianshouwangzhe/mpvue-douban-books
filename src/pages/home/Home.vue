<template>
  <div id="homePage">
    <swiper @change="handleSwiper" :indicator-dots=" currentIndex!==2 " indicator-color="pink" indicator-active-color="red">
      <!--  轮播图  -->
      <swiper-item>
        <img src="/static/imgs/home/1.jpg" alt="">
      </swiper-item>
      <swiper-item>
        <img src="/static/imgs/home/2.jpg" alt="">
      </swiper-item>
      <swiper-item>
        <img src="/static/imgs/home/3.jpg" alt="">
      </swiper-item>
    </swiper>
    <button class="btn" v-show=" currentIndex===2 " @click="toBookCase">开始体验</button>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        // 当前页的下标
        currentIndex: 0
      }
    },
    methods: {
      // event为事件对象
      handleSwiper(event){
        console.log('xxx', event)
        // 更新状态
        this.currentIndex = event.mp.detail.current
      },

      toBookCase(){
        wx.switchTab({
          url: '/pages/bookcase/main'
        })
      }
    }
  }
</script>


<style lang="stylus" rel="stylesheet/stylus">
  #homePage
    width 100%
    height 100%
    swiper
      width 100%
      height 100%
      img
        width 100%
        height 100%
    .btn
      width 280rpx
      height 80rpx
      text-align center
      line-height 80rpx
      position absolute
      bottom 20rpx
      left 50%
      /* 设置整个button宽度的一半  */
      margin-left -140rpx
      background rgba(255, 255, 255, .5)
</style>
