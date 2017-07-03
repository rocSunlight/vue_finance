// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import store from './style/js/store'
import VueResource from 'vue-resource'

//全局注册框架
Vue.use(VueResource)

//请求登录post传递参数
Vue.http.options.emulateJSON = true;
Vue.config.productionTip = false

import  '../static/js/jroll.min'
import  '../static/js/jroll-vue-infinite'
import  '../static/js/jroll-pulldown.min'


/* eslint-disable no-new */
var vm = new Vue({
  el: '#app',
  store,
  router
}).$mount('#app')
