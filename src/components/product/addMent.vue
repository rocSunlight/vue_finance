<template>
  <div class="addMent">
    <v-topBack :rightShow="false" :leftShow="true" :textName="textName"></v-topBack>
    <div class="pgTop">
      <v-userTop :userInfo='pInfo'></v-userTop>
      <div class="mui-scroll-wrapper jp-scroll" >
        <div class="mui-scroll">
            <h2 class="title">申请状态</h2>
            <ul class="state" ref="state">
                <li>已贷款</li>
                <li>申请中</li>
                <li>未通过</li>
            </ul>
            <div class="addStars">
              <span class="text">产品满意度</span>
              <v-start :score="0" :bind="bind" @setStartLeng="getStartLeng"></v-start>
            </div>

            <div class="option">
              <div class="options">
                <div>审核速度快</div >
                <div >放款速度快</div >
                <div >顺利下款</div >
                <div >利率底</div >
                <div >其他</div >
              </div>
            </div>
            <div class="h10 bgcf3"></div>
            <textarea class="addArea" cols="30" rows="8" placeholder="留下您宝贵的经验,帮助小伙伴更快贷款" v-model="comment"> </textarea>
        </div>
      </div>
    </div>
    <div class="addSub" @click='addMents()'>评价</div>
  </div>
</template>

<script type="text/ecmascript-6">
  import topBack from '../common/topBack.vue'
  import userTop from '../common/userTop.vue'
  //  评价星星
  import stars from '../common/stars.vue'

	import { mapState,mapActions } from 'vuex'
  import { USER_SIGNIN } from '../../style/js/user'

var flag=false;
var mask = mui.createMask(function(){
	return flag;
});

  export default {
    name: 'addMent',
    data () {
      return {
        textName: '添加评论',
        startLeng: 0,  //星星的数量
        id : this.$route.params.id,//id\
        borrow_status:'',//借款状态
        label:'',//lablel标签
        userInfo:'',
        score : 0,
        comment:'',//评价内容
        bind : true,
        token1 :this.$store.state.user.token  //读取本地储存的token
      }
    },
    computed:{
      ...mapState(['pInfo'])
    },
    created(){
      this.startLeng = 0
    	this.$http.jsonp('http://'+this.$store.state.urlIp+'api/index/details/id/'+this.id).then(response=>{
    		this.$store.state.pInfo = response.body.info
    		flag=true
      })
    },
    mounted(){
      this.setState()
    },
    methods: {
      //获取从星星子组件传来的值
      getStartLeng(b) {
        this.startLeng  = parseInt(b)
      },
      setState(){
      	var that = this

        $('.state li').click(function () {
          let ti = $(this);
          for(var i=0;i<=$('.state li').length;i++){
          	if(ti[0]==$('.state li')[i]){
              that.borrow_status=i+1;
          	}
          };
          ti.addClass('active').siblings().removeClass('active')
        });
        $('.options div').click(function () {
          let ti = $(this);
          for(var i=0;i<=$('.options div').length;i++){
          	if(ti[0]==$('.options div')[i]){
          		that.label=i+1;
          	}
          };
          ti.addClass('active').siblings().removeClass('active')
        })
      },
      addMents(){

        if(this.token1 === undefined){
            mui.alert('请先登陆后再评价...','提示','立即登陆',function () {
              document.location.href ='#/login'
            },'div')
        }
      	if(this.startLeng==""){
      		mui.toast("请填写产品满意度")
      	}
      	else if(this.borrow_status==""){
      		mui.toast("请选择借款状态")
      	}
      	else if(this.label==""){
      		mui.toast("请选择评价状态")
      	}
      	else{
      		this.$http.post('http://'+this.$store.state.urlIp+'api/index/do_comment/id/'+this.id,{token:this.token1,bid:this.id,borrow_status:this.borrow_status,label:this.label,score:this.startLeng,comment:(this.comment)}).then(response=>{
           	console.log(response)
           	mui.toast(response.body.msg+',跳转回详情页')
           	setTimeout(()=>{
              this.$router.back()
            },1500)
        	})
      	}
      }
    },
    components: {
      'v-topBack' : topBack,
      'v-userTop' : userTop,
      'v-start' : stars
    },
    beforeRouteLeave(to, from, next) {
      // 设置下一个路由的 meta
      if(to.name === 'ProductInfo' ){
        to.meta.keepAlive = true;  //
      }
      next();
    },
    beforeDestroy(){
      this.bind = false
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../style/stylus/common.styl"

  .addMent
    .jp-scroll
      position static
      z-index 99
    .title
      jp-font(30)
      jp-padding2(30,0)
      color #000
      text-align center
    .state
      overflow hidden
      li
        jp-width(136)
        jp-height(50)
        jp-font(26)
        jp-margin4(10,55,38,55)
        float left
        text-align center
        color #9a9a9a
        border 2px solid #9a9a9a
        &.active
          border-color #fc4a28
          color #fc4a28
    .addStars
      text-align center
      jp-padding2(30,0)
      jp-font(30)
      .text
        vertical-align: text-top;
    .option
      border 0.16rem solid #f3f3f3
      .options
        jp-padding(17)
        overflow hidden
        border-radius 3px
        box-shadow: 0 3px 8px 3px rgba(0,0,0,0.2) ;
        div
          jp-width(218)
          jp-height(58)
          jp-font(26)
          jp-border-radius(10)
          jp-margin(6.2)
          float left
          color #f5ab18
          border 1px solid #f5ab18
          text-align center
          &.active
            background-color #f5ab18
            color #fff
    .addArea
      jp-font(32)
      jp-padding(30)
      line-height 0.5rem
      border 0
    .addSub
      jp-font(40)
      jp-height(124)
      width 100%
      text-align center
      color #fff
      background-color #f57963
      position fixed
      bottom 0
      z-index 0


</style>
