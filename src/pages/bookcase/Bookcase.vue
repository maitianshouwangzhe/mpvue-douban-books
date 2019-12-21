<template>
  <div id="bookCaseContainer">
    <swiper indicator-dots indicator-color="pink" indicator-active-color="red">
      <swiper-item v-for="(item, index) in needShowPictures" :key="index">
        <img :src="item.image"/>
      </swiper-item>
    </swiper>

    <div class="bookList">
      <div class="listNav">
        <span>全部图书</span>
        <span class="nav_right" @click="toBookListPage(bookArr)"> > </span>
      </div>
      <div class="list">
        <div class="book_item" v-for="(item, index) in bookArr" :key="index" @click="toDetailPage(item)">
          <img :src="item.image" alt="">
          <p>《{{item.title}}》</p>
          <p>{{item.author}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import bookList from '../../mock/data'
  export default {
    data(){
      return {
        bookArr: bookList
      }
    },

    computed:{
      // 轮播图展示的部分
      needShowPictures(){
        // 注意：数据的splice方法会修改原本的数据，如：this.bookArr.splice(0,3)会把前面三项删除，返回被删除的项目。
        // var arr = [1,2,3,4]; 则console.log(arr.splice(1,1))的结果为[2]
        // return this.bookArr.splice(0,3)
        // 若不修改原来的数组, 使用[...this.bookArr].splice(0,3)
        return [...this.bookArr].splice(0,3)
      }
    },

    methods: {
      // 方法里传递了一个对象数据
      toDetailPage(bookItem){
        wx.navigateTo({
          // 以query的显示，传递数据必须是字符串，如果是非字符串的数据（如：对象），使用JSON.stringify()将其转化为字符串
          url: '/pages/detail/main?bookItem=' + JSON.stringify(bookItem)
        })
      },

      // 跳转至图书的列表页
      toBookListPage(bookArr){
        wx.navigateTo({
          // 以query的显示，传递数据必须是字符串。
          // 如果是非字符串的数据（如：对象、数组），使用JSON.stringify()将其转化为字符串
          url: '/pages/booksList/main?bookArr=' + JSON.stringify(bookArr)
        })
      }
    },

  }
</script>


<style lang="stylus" rel="stylesheet/stylus">
  #bookCaseContainer
    swiper
      width 100%
      height 400rpx
      img
        width 100%
        height 100%
    .bookList
      .listNav
        padding 10rpx
        .nav_right
          float right
      .list
        display flex
        /*  默认flex布局是不换行的， 若换行，使用flex-wrap wrap  */
        flex-wrap wrap
        .book_item
          width 50%
          display flex
          flex-direction column
          align-items center
          border-bottom  1rpx solid #ee
          box-sizing border-box
          /* &符号表示：父级引用.
          nth-child表示有选择性的选中它
           */
          &:nth-child( 2n+1 )
            border-right 1rpx solid #ee
          img
            width 200rpx
            height 200rpx
            margin 10rpx 0
          p
            font-size 24rpx
            line-height 50rpx
</style>
