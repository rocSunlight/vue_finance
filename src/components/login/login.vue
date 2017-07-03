<template>
	<div id="login">
		<v-topBack :rightShow="false" :leftShow="true" :textName="textName"></v-topBack>
		<div class="userPhone">
			<img src="../../../static/img/phone.png"/><span>|</span><input type="number" name="phone" id="phone" placeholder="请输入手机号码" v-model='username' />
		</div>
		<div class="smsNumber">
			<img src="../../../static/img/sms.png"/><span>|</span><input v-model="password" type="password" name="phone" id="sms" placeholder="请输入密码"/>
		</div>
		<div class="loginBtn"  @click.prevent="submit()">登录</div>
		<div class="tips">
			<router-link to='/register' class='loginKey' replace>没有账号？<span>立即注册</span></router-link>
			<router-link to='/findpwd' class='loginKey' replace>忘记密码？</router-link>
		</div>
	</div>
</template>

<script>
	import topBack from '../common/topBack.vue'
  import { mapActions } from 'vuex'
  import { USER_SIGNIN } from '../../style/js/user'


	export default {
	  name: 'login',
	  data () {
	    return {
	      	textName : '登录',
	      	username : '',
        	password : '',
        	form: {
          		token:'',
          		username: '',
          		userInfo:''
        	}
	    }
	  },
    methods: {
    ...mapActions([USER_SIGNIN]),

      //登陆
      submit(){
        var oMyForm = new FormData();
        	this.$http.post('http://'+this.$store.state.urlIp+"api/user/login",{username:this.username,password:this.password }).then(response =>{
            		console.log(response)
          		if(response.body.status === false || response.body.state === "fail"){
            		mui.toast(response.body.data)
         		 }else {
           			 this.form.token = response.body.data.token
            		 this.form.username = this.username

            		  this.USER_SIGNIN(this.form)
                      mui.toast('登录成功')
            		  this.$router.replace({path: '/personal'})
           		}
            })
	 	},
	  },
	  components:{
	    'v-topBack' : topBack
	  }
	}
</script>

<style type="text/css">
	#login{
		width: 100%;
		height: 100%;
		background: white;
		padding-top: 1.066666rem;
	}
	#login .jp-topBack #header{
		background: white;
		border-bottom: 1px solid #ccc;
	}
	#login .jp-topBack #header h1{
		color: black;
		font-size: 0.4rem;
		font-weight: bold;
	}

	#login .userPhone,.smsNumber{
		width: 100%;
		height: 1.6rem;
		border-bottom: 1px solid #ccc;
		line-height: 1.6rem;
		font-size: 0.533333rem;
	}
	#login span{
		margin: 0 0.266666rem;
		color: #ccc;
	}
	#login img{
		margin-left: 0.64rem;
		width: 0.666666rem;
		height: 0.666666rem;
		vertical-align: text-top;
	}
	#login>div input{
		width: 70%;
		border: none;
		height:0.8rem;
		vertical-align: baseline;
		line-height: 0.8rem;
		font-size: 0.4rem;
	}
	#login .loginBtn{
		width: 92%;
		height: 1.066666rem;
		border-radius: 0.266666rem;
		margin: 1.6rem auto 0.826666rem auto;
		text-align: center;
		line-height: 1.066666rem;
		font-size: 0.4rem;
		color: white;
		background: #F5AB18;
	}
	#login #header a{
		color: #000000;
	}
	#app #login .jp-topBack #header .mui-title{
		font-size: 0.533333rem;
	}
	#login .tips{
		width: 92%;
		height: 1rem;
		line-height: 1rem;
		margin: 0 auto;
		display:flex;
	}
	#login .tips a:nth-child(1){
		color: #7c7c7c;
		font-size: 0.4rem;
	}
	#login .tips a:nth-child(2){
		color: #f57018;
		font-size: 0.4rem;
		margin-left: 37%;
	}
  #login .tips .loginKey span{
    color: #f57018;
    margin:0;
  }
</style>
