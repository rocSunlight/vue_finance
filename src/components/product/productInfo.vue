<template>

    <div class="productInfo">
    <v-topBack :rightShow="true" :leftShow="true" :textName="textName" :isActived='isActived' v-on:activeChange='showActive'></v-topBack>
    <div class="pgTop">
      <div class="mui-scroll-wrapper jp-scroll" >
        <div class="mui-scroll">
          <v-userTop :userInfo="pInfo"></v-userTop>
          <!--这里放置真实显示的DOM内容-->
          <h1 class="tile">用户评价</h1>
          <div class="jp-screening tab">

            <router-link v-for="(com,$index) in pComment1" :to="{ name: 'UserMent',params : {id : $route.params.id, p:$index}}" >{{com.name}} ({{com.num}})</router-link>

          </div>
          <div class="jp-evaluation" v-if="pComList !=''">
            <div class="listWrap" v-for="(lis,its) in pComList" >
              <div class="list-title">
                <span class="userName">{{lis.mobile}}</span>
                <v-start :score="lis.score"></v-start>
                <small>{{lis.score}}.0分</small>
                <small class="jp-time">{{lis.add_time}}</small>
              </div>
              <p class="listEva">
                {{lis.comment}}
              </p>
              <div class="listState">
                {{lis.borrow_status}}
                <div class="view" v-if="its === pComList.length - 1">
                  <router-link class="viewAll" :to="{ name: 'UserMent',params : {id : $route.params.id, p:0}}" >查看全部</router-link>
                </div>
              </div>
            </div>
          </div>

          <div class="h10 bgcf3"></div>
          <h1 class="tile">申请条件</h1>
          <div class="conditions" v-html="pInfo.apply"></div>

          <div class="h10 bgcf3"></div>
          <h1 class="tile">申请流程</h1>
          <div class="processWrap" id="process">

                <ul class="process" >
                  <li v-for="lis in pInfo.data" :class="'process'+lis.id">{{lis.name}}</li>
                </ul>


          </div>

          <div class="h10 bgcf3"></div>
          <h1 class="tile">借款细节</h1>
          <div class="conditions" v-html="pInfo.introduce">

          </div>

          <div class="h10 bgcf3"></div>
          <h1 class="tile">产品优势</h1>
          <div class="conditions" v-html="pInfo.advantage"></div>
          <div class="h10 bgcf3 pgBotLg"></div>
        </div>
      </div>
    </div>
		<div id="mask" v-show="isShow"></div>
    <div class="navBottom">
      <router-link :to="{name : 'AddMent',params : { id : $route.params.id }}" class="eva">评价</router-link>
      <router-link :to="{name : 'Embed' ,params:{u : 1}}" class="strategy" >攻略</router-link>
      <div  class="please" @click="appFor()">立即申请</div>
    </div>
  </div>

</template>



<script type="text/ecmascript-6">
  import topBack from '../common/topBack.vue'
  import userTop from '../common/userTop.vue'
  //  评价星星
  import stars from '../common/stars.vue'
  import Bscroll from 'better-scroll'

	import {mapState, mapActions } from 'vuex'
  import { USER_SIGNIN } from '../../style/js/user'

	var flag = false;
	var mask = mui.createMask(function(){
	    return flag;
	});

  export default {
    name: 'ProductInfo',
    data () {
      return {
        textName: '产品详情',
        id : this.$route.params.id,
        token1 :this.$store.state.user.token,  //读取本地储存的token
        collection:false,  //是否有收藏
        isActived:false,
        isShow:false
      }
    },
    computed:{
      ...mapState([
        'pInfo','pComment1','pComList'
      ])
    },
    beforeMount(){
    	var that=this

			flag=false;
      //获取产品详情
      this.$http.jsonp('http://'+this.$store.state.urlIp+'api/index/details/id/'+this.id,
        {
          before: function () {
            //遮罩层显示
            mask.show();
            //添加loading动画
            $('.mui-backdrop').append('<img src="./static/img/006.gif" class="loading" />')
          }
      }).then(response=>{
      	var pInfo = response.body.info;
      	var pComment1 = response.body.info.comment.label;
      	var pComList = response.body.info.comment.comment_list;

        this.$store.commit('setProductInfo',{
          pInfo : pInfo,
          pComment1 : pComment1,
          pComList : pComList
        })

        flag=true;
        mask.close()
		this.isShow=false
		$('.mui-backdrop').children('img').remove();


      });

  		this.id = this.$route.params.id
			//检测是否有将该产品收藏
      this.$http.post('http://'+this.$store.state.urlIp+'api/user/is_collect',{token:this.token1,bid:this.id}).then(response=>{
        if(response.body.status==1){
        	this.isActived=true
        }
        else{
        	this.isActived=false
        }
	    })

    },

    mounted(){
      var scroll = mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0006, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        bounce: false, //是否启用回弹
        indicators :false
      });



    },

    updated(){
      //判断字体过多显示...

      let textLength = document.getElementsByClassName('listEva').length
      let texteq = document.getElementsByClassName('listEva')
      for(let i=0;i<textLength;i++){
        if(texteq[i].innerHTML.length > 60){
          texteq[i].innerHTML = texteq[i].innerHTML.substr(0,60) + '...'
        }
      }
      let scrolls = new Bscroll(document.getElementById('process'), {
        scrollY : false,
        scrollX : true,
        bounce:false
      })
    },
    methods:{
      appFor(){
        if(this.$store.state.user.token === undefined){
            mui.alert('请先登陆后再申请','提示','立即登陆',function () {
              document.location.href='#/login';
            },'div')

        }else {
          var fata = new FormData
          fata.append('token',this.$store.state.user.token)
          fata.append('id',this.id)
          this.$http.post('http://'+this.$store.state.urlIp+'api/index/join/',fata).then(response=>{
             document.location.href='#/embed/2';
          })
        }
      },
      showActive(data){
      	this.isActived=data
      }
    },
    components: {
      'v-topBack' : topBack,
      'v-userTop' : userTop,
      'v-start' : stars
    },
    beforeRouteLeave(to, from, next) {
      // 设置下一个路由的 meta

      if(from.name === 'ProductInfo' ){
        from.meta.keepAlive = false;  //

      }

      if(to.name === 'ListWrap' ){
        to.meta.keepAlive = true;  //
      }

      if(to.name === 'Commodity'){
        this.$store.commit('removeProductInfo',{
          pInfo : {},
          pComment1 : {},
          pComList : {}
        })
      }

      next();
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../style/stylus/common.styl"
  @import "../../../../static/css/muiConfirm.css"

  /* 设置滚动条的样式 */
  ::-webkit-scrollbar {
    height 0
  }
  .productInfo
    position: absolute;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9;
    .jp-scroll
      top: 1.133333333rem;
      .tile
        jp-font(34)
        jp-padding4(28,28,0,28)
        background-color: #fff;
        color #2a2a2a
        text-indent 0.45rem
        position relative
        &:before
          position absolute
          content:" "
          width 25px
          height 25px
          display block
          top:55%;
          left 4%
          border-radius 50%
          background-color #f9d58f
    .jp-screening
      jp-height(200)
      jp-padding(30)
      overflow hidden
      border-bottom 2px solid #f3f3f3
      a
        jp-width(216)
        jp-height(58)
        jp-font(26)
        jp-border-radius(10)
        jp-margin(7)
        float left
        color #f5ab18
        border 1px solid #f5ab18
        text-align center
        &.router-link-active
          background-color #f5ab18
          color #fff
    .jp-evaluation
      min-height 2.24rem
      box-shadow: 0 15px 40px 0 rgba(0,0,0,0.1);
      margin-bottom: 0.0933rem;
      .listWrap
        jp-padding2(25,40)
        border-bottom 2px solid #f3f3f3
        &:last-child
          border 0
        .list-title
          margin-bottom 0.3rem
          .userName
            jp-font(28)
            color #4d4d4d
            letter-spacing 1px
          small
            jp-font(22)
            color #838383
            margin-left 0.3rem
            &.jp-time
              float right
              margin-top 0.15rem
        .listEva
          jp-font(28)
          color #4d4d4d
          line-height 0.5rem
          margin-bottom 0.3rem
        .listState
          jp-font(28)
          color #f54c18
        .view
          text-align center
          padding  0.333rem 0
          .viewAll
            display inline-block
            text-align center
            jp-width(300)
            jp-height(65)
            jp-font(30)
            jp-border-radius(10)
            color #4d4d4d
            background-color #ffcaca

    .conditions
      jp-padding4(30,30,30,65)
      jp-font(30)
      line-height 0.6rem
      color #4d4d4d
      box-shadow: 0 15px 40px 0 rgba(0,0,0,0.1);
      margin-bottom: 0.0933rem;
      p
        jp-font(30)
        line-height 0.4rem
        color #4d4d4d
    .processWrap
      overflow hidden

      .process
        min-width  100%
        white-space nowrap
        float left
        jp-padding4(30,24,22,65)
        margin-bottom: 0.1333rem;
        box-shadow: 0 15px 40px 0 rgba(0,0,0,0.1);
        li
          jp-font(22)
          jp-width(180)
          display inline-block
          position relative
          background-repeat no-repeat
          background-size 40%,10%
          height: 1.8rem;
          text-indent 0.08rem
          line-height: 2.8rem;
          color #5197e9

          &.process1
            background-image url(cpxq_gzxx.png),url(cpxq_icom_sqlc.png)
            background-position: 15% 0,80% 34%;
          &.process2
            background-image url(cpxq_gzxx.png),url(cpxq_icom_sqlc.png)
            background-position: 15% 0,80% 34%;
          &.process3
            background-image url(cpxq_sjrz.png),url(cpxq_icom_sqlc.png)
            background-position: 15% 0,80% 34%;
          &.process4
            background-image url(cpxq_yhkrz.png),url(cpxq_icom_sqlc.png)
            background-position: 17% 0,80% 34%;
          &.process5
            background-image url(cpxq_zmxy.png),url(cpxq_icom_sqlc.png)
            background-position: center 0;
          &.process6
            background-image url(cpxq_xxrxx.png),url(cpxq_icom_sqlc.png)
            background-position: 20% 0,80% 34%;
          &.process7
            background-image url(cpxq_yxs.png),url(cpxq_icom_sqlc.png)
            background-position: 20% 0,80% 34%;
          &.process8
            background-image url(cpxq_sfrz.png),url(cpxq_icom_sqlc.png)
            background-position: 13% 0,80% 34%;
          &.process9
            background-image url(cpxq_zxbg.png),url(cpxq_icom_sqlc.png)
            background-position: 13% 0,80% 34%;
          &.process10
            background-image url(cpxq_rlsb.png),url(cpxq_icom_sqlc.png)
            background-position: 13% 0,80% 34%;
          &.process11
            background-image url(cpxq_dsrz.png),url(cpxq_icom_sqlc.png)
            background-position: 13% 0,80% 34%;
          &.process12
            background-image url(cpxq_txsq.png),url(cpxq_icom_sqlc.png)
            background-position: 13% 0,80% 34%;
          &.process13
            background-image url(cpxq_sprz.png),url(cpxq_icom_sqlc.png)
            background-position: 13% 0,80% 34%;
          &:last-child:before
            position absolute
            content:" "
            width 30px
            height 30px
            display block
            top:30%;
            right 15%
            background-color #fff
    .navBottom
      position fixed
      bottom 0
      left 0
      right 0
      background-color #fff
      z-index 99
      display flex
      border-top: 1px solid #ccc;
      jp-font(30)
      a,div
        jp-height(98)
        text-align center
        background-color #fff
        color #1f1f1f
        &.eva ,&.strategy
          flex 1
          line-height: 2rem;
          background-repeat no-repeat
        &.eva
          background-image url(icom_pj.png)
          background-size 20%
          background-position center 10%
        &.strategy
          background-image url(icom_gl.png)
          background-size 20%
          background-position center 15%
        &.please
          flex 0 0 3.866rem
          background-color #f57963
          color #fff
		#mask{
			width: 100%;
			height: 100%;
			background-color: #fff;
			position: fixed;
			z-index: 8;
		}
</style>
