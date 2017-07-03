<template>
  <div class="jp-topBack">
    <header id="header" class="mui-bar mui-bar-nav">
      <h1 class="mui-title" v-text="textName"></h1>
      <div v-if="rightShow">
        <a class="mui-icon mui-pull-right jp-left40 jp-icon-collection" @click="collect" v-bind:class="{ active: isActived,transition:transition }"></a>
        <a class="mui-icon mui-pull-right jp-icon-share" ></a>
      </div>

      <a v-if="leftShow" class="mui-icon mui-icon-left-nav mui-pull-left" @click="back()"></a></header>
  </div>
</template>

<script type="text/ecmascript-6">

  import { mapActions } from 'vuex'
  import { USER_SIGNIN } from '../../style/js/user'
//	import '../../../static/js/share'

  export default{
    name: 'topBack',
    data(){
      return {
				id : this.$route.params.id,
        token1 :this.$store.state.user.token,  //读取本地储存的token
        isActive:false,
      	transition:false
      }
    },
    props:{
      rightShow : Boolean ,
      leftShow : Boolean,
      textName : String,
      isActived: Boolean
    },
    methods:{
      //浏览器回退
      back() {
        this.$router.back()
      },
      collect(){
      	this.id = this.$route.params.id;
        this.token1 = this.$store.state.user.token;  //读取本地储存的token
      	this.transition=true;

      	if(this.isActived){
      		//取消收藏
      		this.$http.post('http://'+this.$store.state.urlIp+'api/user/delcollect',{token:this.token1,bid:this.id}).then(response=>{
      			if(response.body.status==1){
	           		mui.toast(response.body.data)
	           		this.isActive=false
	           		this.$emit('activeChange',this.isActive)
	           		this.transition=false
	           }
	        })
      	}
      	else if(!this.isActived){
      		//收藏
      		this.$http.post('http://'+this.$store.state.urlIp+'api/user/docollect',{token:this.token1,bid:this.id}).then(response=>{
	           	if(response.body.status==1){
	           		console.log(response)
	           		mui.toast(response.body.data)
	           		this.isActive=true
	           		this.$emit('activeChange',this.isActive)
	           		this.transition=false
	           	}
	           	else{
	           		mui.toast(response.body.data)
	           		this.transition=false
	           	}
	        })
      	}
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../style/stylus/common.styl"

  .jp-topBack
    #header
      background-color #f5ab18
      box-shadow: none;
      jp-height(85)
      jp-padding2(22,35)
      box-sizing border-box
      a,.mui-title
        color #fff
        jp-font(32)
      a
        padding: 0;
        jp-font(48)
      .mui-title
        jp-height(45)
        letter-spacing: 2px;
      .mui-pull-right
        margin-right -20px
      .jp-left40
        jp-right(90)
      .jp-icon-collection,.jp-icon-share
        jp-height(44)
        jp-width(44)
        bgContain(contain )
      .jp-icon-collection
        background-image url(icom_sc_ct.png)
        &.active
          background-image url(icom_sc_xz.png)
        &.transition
          background-image url(collect.png)
      .jp-icon-share
        background-image url(icom_fx.png)
</style>
