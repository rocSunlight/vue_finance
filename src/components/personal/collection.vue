<template>
	<div id="collection">
	    <v-topBack :rightShow="false" :leftShow="true" :textName="textName"></v-topBack>
	    <div class="warnWrap" v-show="warn">
			<img src="../../../static/img/warn.png"/>
			<p>并没有收藏产品诶</p>
		</div>
	    <div class="pgTop">
	    	<jroll-infinite class="jroll-scroll" id="wrapper">
	    		<nav-list v-bind:productList='productList'></nav-list>
	    	</jroll-infinite>
	
	    </div>
	</div>
</template>

<script type="text/ecmascript-6">
  import topBack from '../common/topBack.vue'
  import Navlist from '../common/list.vue'

  import { mapActions } from 'vuex'
  import { USER_SIGNIN } from '../../style/js/user'

	var flag=false;
	var mask = mui.createMask(function(){
		return flag;
	});

  var _this
  export default {
    name: 'listWrap',
    data () {
      return {
        textName : '我的收藏',
        productList:'',
        token1 :this.$store.state.user.token, //读取本地储存的token
        t_page :'',
        nexturl : '',
        warn:false
      }
    },
    created(){
    	//遮罩层显示
	  	mask.show();
	  	//添加loading动画
	  	$('.mui-backdrop').append('<img src="./static/img/006.gif" class="loading" />')

      _this = this
    	this.$http.post('http://'+this.$store.state.urlIp+'api/user/collect',{token:this.token1}).then(response=>{
    		if(response.body.info.length==0){
     			this.warn=true
	     	}
		    else{
		      	this.warn=false
		    }
    		
    		
           	this.productList=response.body.info;
           	this.t_page = response.body.t_page
            this.nexturl = response.body.nexturl
            
           	flag=true;
	      	mask.close()
	      	$('.mui-backdrop').children('img').remove();
        })
    },
    mounted(){

    },
    components:{
      'v-topBack' : topBack,
      'nav-list' : Navlist,
      'jroll-infinite': JRoll.VueInfinite({
        tip: '<img class="homeLoding" src="./static/img/001.gif" >正在加载...</img>',
        pulldown: {
          refresh: function(complete) {
            //完成加载数据的操作后回调执行complete方法
            complete();
          }
        },
        bottomed: function (complete) {
          var me = this
          var page = _this.t_page  //获取后台传来的数据页数


          if(typeof complete === 'function'){
            page = 2
            me.tip = '&nbsp;'
            _this.nexturl = 'http://'+_this.$store.state.urlIp+'api/user/collect'
            _this.productList = []
          }

          if (me.page <  page - 1) {

            _this.$http.post(_this.nexturl,{token:_this.token1}).then(response => {
              let res = response.body
              let jons = res.info
              if (typeof complete === 'function') {
                _this.productList =_this.productList.concat(jons)
                me.page = 0
                complete()

              }else{
                me.page++
                _this.productList = _this.productList.concat(jons)
                me.tip = '&nbsp;'
              }
            })
          }
          //判断数据是否存在，有则刷新
          if(_this.productList.length === 0){
            me.tip = '&nbsp;'
          }else {

            if ( _this.nexturl === '' ) {
              me.tip = '已全部加载完成'
            }else{
              me.tip = '<img class="homeLoding" src="./static/img/001.gif" >正在加载...</img>'
            }
          }
        }
      }, {
        scrollBarY: false
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
	#collection .warnWrap{
	  	width: 4rem;
	  	height: 5rem;
	  	position: absolute;
	  	top: 0;
	  	left: 0;
	  	right: 0;
	  	bottom: 0;
	  	margin:auto;
	  	z-index: 9999;
	  }
	  #collection .warnWrap img{
	  	width: 100%;
	  }
	  #collection .warnWrap p{
	  	font-size: 0.426666rem;
	  	line-height: 0.8rem;
	  	text-align: center;
	  }
</style>
