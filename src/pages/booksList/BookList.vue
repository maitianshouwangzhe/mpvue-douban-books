<template>
  <div id="booksListContainer">
    <div class="bookItem" v-for="(item, index) in booksList" :key="index" @click="toDetail(item)">
      <img class="bookImg" :src="item.image" alt="">
      <div class="bookInfo">
        <p>《{{item.title}}》</p>
        <p>{{item.author}}</p>
        <p>{{item.publisher}}</p>
      </div>
      <p class="bookPrice">{{item.price}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      booksList: Array,
    },

    data(){
      return {
        booksList: [],
      }
    },

    mounted(){
      // 只有路由跳转时，才更改状态。 即： 搜索时，使用的为props的数据
      if (this.$mp){
        const booksList = JSON.parse(this.$mp.query.bookArr)
        this.booksList = booksList
      }
    },

    methods: {
      toDetail(bookObj){
        wx.navigateTo({
          // 以query的显示，传递数据必须是字符串，如果是非字符串的数据（如：对象），使用JSON.stringify()将其转化为字符串
          url: '/pages/detail/main?bookItem=' + JSON.stringify(bookObj)
        })
      }
    }
  }
</script>


<style lang="stylus" rel="stylesheet/stylus">
  #booksListContainer
    .bookItem
      display flex
      padding 10rpx
      border-bottom 1rpx solid #eee
      img
        width 150rpx
        height 150rpx
        margin-right 30rpx
      .bookInfo
        width 70%
        font-size 30rpx
        line-height 50rpx
      .bookPrice
        font-size 46rpx
        font-weight bold
        color red
        margin-right 10rpx
</style>
