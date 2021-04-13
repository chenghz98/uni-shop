import Vue from 'vue'
import App from './App'

import {$http} from '@escook/request-miniprogram'
Vue.config.productionTip = false

uni.$http=$http
// 配置请求根路径
$http.baseUrl = 'https://www.uinav.com'
// 请求之前做一点事
$http.beforeRequest=function(options){
  uni.showLoading({
    title:"数据加载中..."
  })
}
// 请求之后做一些事
$http.afterRequest=function(){
  uni.hideLoading()
}
// 封装消息提示方法
uni.$showMsg= function(title="请求数据失败",duration=1500){
  uni.showToast({
    tilte,
    duration,
    icon:'none'
  })
}
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
