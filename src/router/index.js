import Vue from 'vue'
import Router from 'vue-router'
import store from '../style/js/store'

import Home from 'components/home/home'
import ListWrap from 'components/home/listWrap'

import Commodity from 'components/product/commodity'
import productInfo from 'components/product/productInfo'
import UserMent from 'components/product/UserMent'
import addMent from 'components/product/addMent'


import Personal from 'components/personal/personal'
import CreditInfo from 'components/personal/creditInfo'
import UserStatus from 'components/personal/userStatus'
import Collection from 'components/personal/collection'
import Help from 'components/personal/help'
import AboutUs from 'components/personal/aboutUs'

import Login from 'components/login/login'
import Register from 'components/login/register'
import Findpwd from 'components/login/findPwd'

//嵌套url
import Embed from 'components/product/embed'


//测试组件路由
Vue.use(Router)

const title = ''
const router = new Router({
	mode: 'hash',
//linkActiveClass: 'active', // 这是链接激活时的class
  routes: [
    {
      path: '/',
      name: 'Home',
      meta: {
        title: '首页',
        auth: false,
        keepAlive: true   //不会被缓存 false为会缓存
      },
      component: Home
    },
    {
    	path: '/ListWrap',
    	name: 'ListWrap',
    	meta: {
        	title: '产品',
        	auth: false,
          keepAlive: false
      	},
      	component: ListWrap
    },
    {
      path: '/commodity',
      name: 'Commodity',
       meta: {
        title: '产品列表',
        auth: false,
         keepAlive: true
      },
      component: Commodity
    },
    {
      path: '/productInfo/:id',
      name: 'ProductInfo',
      meta: {
        title: '产品详情',
        auth: false,
        keepAlive: false
      },
      component: productInfo

    },
    {
      path: '/UserMent/:id/:p',
      name: 'UserMent',
      meta: {
        title: '用户评价',
        auth: false,
        keepAlive: false
      },
      component: UserMent
    },
    {
      path: '/addMent/:id',
      name: 'AddMent',
      meta: {
        title: '添加评论',
        auth: false,
        keepAlive: false
      },
      component: addMent
    },
    {
      path: '/embed/:u',
      name: 'Embed',
      meta: {
        title: '手贷通',
        auth: false,
        keepAlive: true
      },
      component: Embed
    },
    {
      path: '/creditinfo',
      name: '',
       meta: {
        title: '信用资料',
        auth: false,
         keepAlive: false
      },
      component: CreditInfo
    },
    {
      path: '/userstatus',
      name: 'UserStatus',
       meta: {
        title: '用户身份',
        auth: false,
         keepAlive: false
      },
      component: UserStatus
    },
    {
      path: '/collection',
      name: 'Collection',
       meta: {
        title: '产品',
        auth: false,
         keepAlive: false
      },
      component: Collection
    },
    {
      path: '/help',
      name: 'Help',
       meta: {
        title: '产品',
        auth: false,
         keepAlive: false
      },
      component: Help
    },
    {
      path: '/aboutus',
      name: 'AboutUs',
       meta: {
        title: '产品',
        auth: false,
         keepAlive: false
      },
      component: AboutUs
    },


    {
      path: '/personal',
      name: 'Personal',
      meta: {
        title: '个人中心',
        auth: true,
        keepAlive: false
      },
      component: Personal
    },
    {
      path: '/login',
      name: 'Login',
      meta: {
        title: '登录',
        auth: false,
        keepAlive: false
      },
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      meta: {
        title: '注册',
        auth: false,
        keepAlive: false
      },
      component: Register
    },
    {
      path: '/findpwd',
      name: 'Findpwd',
      meta: {
        title: '找回密码',
        auth: false,
        keepAlive: false
      },
      component: Findpwd
    }
  ]
})

// 路由导航钩子，beforeEach，在路由进入前调用
router.beforeEach((to, from, next) => {
  let titleStr = ''
  let con=''

  // auth true登录才能访问，false不需要登录，默认true
  var { auth = true } =  to.meta
  var isLogin = Boolean(store.state.user.token) //true用户已登录， false用户未登录

  if (auth && !isLogin && to.path !== '/product') {

    return next({ path: '/login' })
  }

  // 继续路由导航
  next()

  // 检测是不是要跳转首页，如果是，则不处理
  if (to.name !== 'Home') {
    // 倒序遍历数组获取匹配到的路由节点，拼接各部分title
    for (let i = to.matched.length - 1; i >= 0; i--) {
      con = `${to.matched[i].meta.title}`
      if(i=0){
        con === `${to.matched[0].meta.title}`
      }
      titleStr += con
    }
  }

  // 添加站点名
  titleStr += title
  // 更新title
  document.title = titleStr

})

export default router


