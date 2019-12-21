<template>
    <div id="searchContainer">
      <div class="searchHeader">
        <!--   placeholder-class="placeholder"
        confirm-type="search"
        @confirm="handleSearch"为小程序自带的api；
        -->
        <input v-model="searchValue" @confirm="handleSearch" confirm-type="search" type="text" placeholder="请输入关键字搜索" placeholder-class="placeholder"/>
        <span class="clearInput" v-show="searchValue" @click="handleClear">X</span>
      </div>
      <BookList :booksList="booksList" v-if="booksList.length"/>
    </div>
</template>

<script>
  /*  引入所需的组件  */
  import BookList from '../booksList/BookList'
  export default {
    data(){
      return {
        searchValue: '',
        booksList: [],
      }
    },

    methods:{
      handleClear(){
        this.searchValue = ''
        // 清空搜索得到的结果
        this.booksList = []
      },
      // 点击搜索
      handleSearch(){
        // 得到输入的值
        const inputValue = this.searchValue
        // 封住为一个对象
        let data = {req: inputValue}
        wx.request({
          url: 'http://localhost:3000/searchBooks',
          data: data,
          success: (res) => {
            console.log(res.data)
            // 更新状态
            this.booksList = res.data
          }
        })
      },
    },

    components: {
      BookList,
    }


  }
</script>


<style lang="stylus" rel="stylesheet/stylus">
  #searchContainer
    .searchHeader
      width 80%
      height 80rpx
      margin 10rpx auto
      border-bottom 1rpx solid #489B99
      position relative
      input
        height 100%
        width 100%
        /* 自定义小程序给出class类的样式   */
        .placeholder
          color #489B99
          text-align center
          font-size 28rpx
      .clearInput
        position absolute
        right 20rpx
        top 20rpx
        /* 由于设置了定位，则点击清除没反应（是因为层级较低被其他压住了），
        则需要设置层级，设计一个较高的层级  */
        z-index 99
</style>
