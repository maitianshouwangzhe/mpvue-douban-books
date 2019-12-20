import Vue from 'vue'
import App from './App'


// 关闭vue开发中的一些提示功能
Vue.config.productionTip = false

// 声明当前组件的类型为应用
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
