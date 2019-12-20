<template>
    <div id="detailContainer" v-if="bookDetail.author">
      <div class="book_info">
        <h1>《{{bookDetail.title}}》</h1>
        <img :src="bookDetail.image" alt="">
        <div class="info">
          <p>作者：{{bookDetail.author[0]}}</p>
          <p>出版社：{{bookDetail.publisher}}</p>
          <p>出版日期：{{bookDetail.pubdate}}</p>
          <p>定价：{{bookDetail.price}}元</p>
        </div>
      </div>

      <button class="shareBtn" open-type="share">分享给好友</button>
      <div class="content">
        <article>
          <h2>作者简介</h2>
          <section>
            {{bookDetail.author_intro}}
          </section>
        </article>
        <article>
          <h2>内容简介</h2>
          <section>
            {{bookDetail.summary}}
          </section>
        </article>
      </div>
    </div>
</template>

<script>
  export default {
    data(){
      return {
        bookDetail: {},
      }
    },
    mounted(){
      console.log(this)
      // 将穿过的字符串，解析为原本的对象
      console.log('解析出路由跳转传递的对象', JSON.parse(this.$mp.query.bookItem))
      this.bookDetail = JSON.parse(this.$mp.query.bookItem)

      // 动态设置网页的标题
      wx.setNavigationBarTitle({
        title: this.bookDetail.title
      })
    },

    // 分享的功能
    // 点击button， 触发事件回调函数
    // https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html#onShareAppMessage-Object-object
    onShareAppMessage(event){
      console.log(event);
      return {
        title: '豆瓣图书',
        path: '/pages/detail/main',
        imageUrl: '/static/imgs/home/2.jpg'
      }
    }
  }
</script>


<style lang="stylus" rel="stylesheet/stylus">
  #detailContainer
    .book_info
      display flex
      flex-direction column
      h1
        text-align center
        font-size 40rpx
        font-weight bold
        margin 10rpx 0
      img
        width 70%
        height 700rpx
        margin 0 auto
      .info
        margin-left 15%
        p
          line-height 50rpx
    .shareBtn
      width 300rpx
      height 90rpx
      line-height 90rpx
      text-align center
      margin 20rpx auto
    .content
      margin 10rpx 100rpx
      article
        margin-top 50rpx
        h2
          font-size 46rpx
          font-weight bold
          color cadetblue
          text-align center
        section
          font-size 38rpx
          text-indent 76rpx
</style>
