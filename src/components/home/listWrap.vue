
<template>
	<div class="jp-listWrap">
    <v-topBack :rightShow="false" :leftShow="true" :textName="textName"></v-topBack>
    <div class="pgTop">
      <jroll-infinite class="jroll-scroll" id="wrapper">
        <v-list :productList='productList'></v-list>
      </jroll-infinite>

    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import topBack from '../common/topBack.vue'
  import list from '../common/list.vue'
  import  '../../../static/js/jroll.min'
  import  '../../../static/js/jroll-vue-infinite'
  import  '../../../static/js/jroll-pulldown.min'

	var flag=false;
	var mask = mui.createMask(function(){
		return flag;
	});

  var _this
  var _datapage = 0;
  export default {
    name: 'listWrap',
    data () {
      return {
        textName: this.$route.query.id,
        urlType: this.$route.query.urlId,
        t_page:'',
        productList: '',
        p_url : ''
    }
    },
    created(){
      _this = this

      //遮罩层显示
	  	mask.show();
	  	//添加loading动画
	  	$('.mui-backdrop').append('<img src="./static/img/006.gif" class="loading" />');


      this.$http.get('http://' + this.$store.state.urlIp + 'api/index/lists', {params : {special: this.urlType}}).then(response => {
        let res = response.body
        this.t_page = response.body.t_page
        this.productList = res.info
        this.p_url  = res.nexturl

        flag=true
	    mask.close()
		$('.mui-backdrop').children('img').remove();
        //判断数据是否有数据，有则刷新，没有的话禁止滚动
        var jroll = new JRoll("#wrapper");
        //do something，例：动态修改scroller的内容，使scroller的高度发生变化
        if (this.productList.length === 0) {
          jroll.disable()
        }
      })


    },

    mounted(){
      var jroll = new JRoll("#wrapper");
      //do something，例：动态修改scroller的内容，使scroller的高度发生变化
      jroll.refresh();

    },
    components: {
      'v-topBack': topBack,
      'v-list': list,
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
            me.tip = '&nbsp;'
            page = 2
            _this.p_url ='http://' + _this.$store.state.urlIp + 'api/index/lists'
            _this.productList = []
          }
          if (me.page <  page - 1) {

            _this.$http.get(_this.p_url, {params:{special: _this.urlType} }).then(response => {
              let res = response.body
              let jons = res.info
              _this.p_url = res.nexturl
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

            if ( _this.p_url === '' ) {
              me.tip = '已全部加载完成'
            }else{
              me.tip = '<img class="homeLoding" src="./static/img/001.gif" >正在加载...</img>'
            }
          }
        }
      }, {
        scrollBarY: false
      })
    },
    beforeRouteLeave(to, from, next) {
      // 设置下一个路由的 meta

      if(from.name === 'ListWrap' ){
        from.meta.keepAlive = false;  //
      }

      next();
    }
  }

</script>

<style>

</style>
