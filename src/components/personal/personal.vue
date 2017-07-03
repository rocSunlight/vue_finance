<template>
  <div id="personal" >
    <div class="userLogo" >
      <img src="./userLogo.jpg" class="img"/>
      <p class="userId" v-text="username"></p>
    </div>
    <ul class="userAbout">
      <router-link to='/creditinfo' >
        <li class="clearFix">
          <span><i class="iconfont icon-xinyong"></i>信用资料</span>
          <img src="./icom_jr.png"/>
        </li>
      </router-link>
      <router-link to='/userstatus'>
        <li class="clearFix">
          <span><i class="iconfont icon-yonghu"></i>用户身份</span>
          <img src="./icom_jr.png"/>
        </li>
      </router-link>
      <router-link to='/collection'>
        <li class="clearFix">
          <span><i class="iconfont icon-shoucang-copy"></i>我的收藏</span>
          <img src="./icom_jr.png"/>
        </li>
      </router-link>
      <router-link to='/help'>
        <li class="clearFix">
          <span><i class="iconfont icon-bangzhu"></i>帮助中心</span>
          <img src="./icom_jr.png"/>
        </li>
      </router-link>
      <router-link to='/aboutus'>
        <li class="clearFix">
          <span><i class="iconfont icon-guanyu"></i>关于我们</span>
          <img src="./icom_jr.png"/>
        </li>
      </router-link>
    </ul>
    <div class="exit" >
    	<div @click='exit'>
    		退出登录
    	</div>
    </div>
    <div class="addHei"></div>
    <nav-gation></nav-gation>
  </div>
</template>


<script>
  import Navigation from '../common/navigation'
  import {mapState, mapActions} from  'vuex'
  import {USER_SIGNOUT} from '../../style/js/user'
  import { USER_SIGNIN } from '../../style/js/user'

  import iconfont from '../../style/icon-font/iconfont'


  export default {
    name: 'Personal',
    data () {
      return {
        token1: this.$store.state.user.token, //读取本地储存的token
        msg: 'Personal',
        username: this.$store.state.user.username,
        form: {
          token:this.$store.state.user.token,
          username: this.$store.state.user.username,
          userInfo:'',
          user_nicename : {},
          msg : ''
        }
      }
    },
    created(){
			if(this.$store.state.user.userInfo==''){
				//登录成功，再次请求用户信息数据进行存入
        this.$http.post('http://'+this.$store.state.urlIp+'api/user/creditinfo',{token:this.token1}).then(response =>{
		      	this.form.userInfo=response.body.data||''
            this.$http.post('http://'+this.$store.state.urlIp+'api/user/user',{token:this.token1}).then(response =>{
              this.form.user_nicename=response.body.user.user_nicename;
              this.form.msg = response.body.user.job-1
              this.USER_SIGNIN(this.form)
            })
			   	},response =>{
		    })

			}
    },
    activated(){
    },
    methods: {
      ...mapActions([USER_SIGNOUT]),
      ...mapActions([USER_SIGNIN]),

      exit(){
        mui.confirm(
          '随时来找我拿钱花哦', '退出', ['取消', '确定'], this.leave, 'div'
        )
      },
      leave(e){
        if (e.index == 1) {
          //执行退出方法
          this.USER_SIGNOUT()
          this.$router.replace('/login')
        }
      }
    },
    components: {
      'nav-gation': Navigation
    }
  }
</script>

<style type="text/css">
  @import url("../../../static/css/muiConfirm.css");
	@import url("../../style/icon-font/iconfont.css");

  #personal {
    width: 100%;
    height: 100%;
    background: white;
  }
  #personal .userLogo {
    width: 100%;
    height: 5.84rem;
    background: #f5ab18;
    position: relative;
    text-align: center;
  }

  #personal .userLogo .img {
    width: 2.8rem;
    height: 2.8rem;
    border-radius: 50%;
    margin-top: 1.32rem;
  }

  #personal .userLogo .userId {
    font-size: 0.533333rem;
    color: white;
    margin-top: 0.346666rem;
  }

  #personal .userAbout {
    width: 100%;
    margin: 0 auto;
    list-style: none;
  }

  #personal .userAbout > a {
    display: block;
  }

  #personal .userAbout li {
    width: 100%;
    height: 1.333333rem;
    border-bottom: 2px solid #e3e3e3;
    line-height: 1.333333rem;
  }

  #personal .exit {
    width: 100%;
    height: 4rem;
    padding-top: 1.5rem;
  }

  #personal .exit>div{
  	width: 7.413333rem;
  	height: 1.333333rem;
    color: #4d4d4d;
    font-size: 0.4rem;
    text-align: center;
    line-height: 1.333333rem;
    margin:auto;
    background-color: #F5c764;
    border-radius: 0.133333rem;

  }

  #personal .userAbout li > span {
    color: #5c5c5c;
    font-size: 0.4rem;
    margin-left: 0.56rem;
  }
	#personal .userAbout li > span>i{
		display: inline-block;
		font-size: 0.4rem;
		color: #5c5c5c;
		margin-right: 0.3rem;
		font-weight: bold;
	}
  #personal .userAbout li > img {
    width: 0.186666rem;
    height: 0.32rem;
   	float: right;
   	margin-right: 0.4rem;
   	margin-top: 0.5rem;
  }
  #personal .addHei{
  	width:100%;
  	height: 1.2rem;
  	background-color: white;
  }
</style>
