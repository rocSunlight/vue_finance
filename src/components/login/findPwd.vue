<template>
	<div id="findPwd">
		<v-topBack :rightShow="false" :leftShow="false" :textName="textName"></v-topBack>
		<div class="userPhone">
			<img src="./phone.png"/><span>|</span><input type="number" name="phone" id="phone" placeholder="请输入手机号码" v-model='phoneNumber'  v-on:input="check"/>
		</div>
		<div class="smsNumber">
			<img src="./sms.png"/><span>|</span><input v-model="mobile_code" type="number" name="phone" id="sms" placeholder="请输入验证码"/><button class="getMsgNumber" ref="getMsgNumber" @click.prevent="getSms($refs.getMsgNumber)">短信验证码</button>
		</div>
		<div class="smsNumber">
			<img src="./key.png"/><span>|</span><input v-model="pwd_code" type="password" name="pwd" id="pwd" placeholder="请设置密码"  v-on:input="check"/>
		</div>
		<div class="loginBtn"  @click.prevent="submit()">确认重置</div>
		<router-link to='/login' class='loginKey' replace>使用密码登录</router-link>
	</div>
</template>

<script>
	import topBack from '../common/topBack.vue'
  import { mapActions } from 'vuex'

	
  var wait = 60
  //短信倒计时
  function timeOut(obj) {
    if(wait == 0 ){
      obj.removeAttribute('disabled')
      obj.innerHTML = '短信验证码'
      wait = 60
    }else {
      obj.setAttribute("disabled", 'disabled');
      obj.innerHTML="重新发送(" + wait +'s'+")";
      wait--;
      setTimeout(function() {
          timeOut(obj)
        },
        1000)
    }
  }

export default {
	  name: 'login',
	  data () {
	    return {
	      textName : '重置密码',
	      phoneNumber : '',
          mobile_code : '',
          pwd_code:''
	    }
	  },
    methods: {
      //重置密码
      submit(){
        var oMyForm = new FormData();
        oMyForm.append("mobile", this.phoneNumber);
        oMyForm.append("mobile_code", this.mobile_code);
        oMyForm.append("password", this.pwd_code);
        this.$http.post('http://'+this.$store.state.urlIp+'api/user/reset',oMyForm).then(response =>{
        	console.log(response)
          if(response.body.status === false || response.body.state === "fail"){
            mui.toast(response.body.msg)
          }else {
            mui.toast(response.body.msg)
            this.$router.replace({path: '/login'})
          }
        })
      },
      //短信
      getSms(n){
        this.$http.post('http://'+this.$store.state.urlIp+'api/code/send',{mobile : this.phoneNumber}).then(response =>{
          if(response.body.status === false){
              mui.toast(response.body.msg)
          }else {
            //短信验证码倒计时
            timeOut(n)
          }
        })
      },
      check(e){
      	console.log(e)
      }
	},
	components:{
	  'v-topBack' : topBack
	}
}
</script>

<style type="text/css">
	#findPwd{
		width: 100%;
		height: 100%;
		background: white;
		padding-top: 1.066666rem;
	}
	#findPwd .jp-topBack #header{
		background: white;
		border-bottom: 1px solid #ccc;
	}
	#findPwd .jp-topBack #header h1{
		color: black;
		font-size: 0.4rem;
		font-weight: bold;
	}

	#findPwd .userPhone,.smsNumber{
		width: 100%;
		height: 1.6rem;
		border-bottom: 1px solid #ccc;
		line-height: 1.6rem;
		font-size: 0.533333rem;
	}
	#findPwd span{
		margin: 0 0.266666rem;
		color: #ccc;
	}
	#findPwd img{
		margin-left: 0.64rem;
		width: 0.666666rem;
		height: 0.666666rem;
		vertical-align: text-top;
	}
	#findPwd .userPhone input{
		width: 70%;
		border: none;
		height:0.8rem;
		vertical-align: baseline;
		line-height: 0.8rem;
		font-size: 0.4rem;
	}
	#findPwd .smsNumber input{
		width: 48%;
		border: none;
		height:0.8rem;
		vertical-align: baseline;
		line-height: 0.8rem;
		font-size: 0.4rem;
	}
	#findPwd .smsNumber .getMsgNumber{
		display: inline-block;
		width: 2.666666rem;
		height: 1.066666rem;
		background-color: #F5AB18;
    	border:0;
		text-align: center;
    	vertical-align: middle;
		font-size: 0.4rem;
		color: white;
		border-radius: 0.266666rem;
	}
	#findPwd .loginBtn{
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
	#findPwd #header a{
		color: #000000;
	}
	#app #findPwd .jp-topBack #header .mui-title{
		font-size: 0.533333rem;
	}
	#findPwd .loginKey{
		color: #7c7c7c;
		font-size: 0.4rem;
		margin-left: 0.4rem;
	}
</style>
