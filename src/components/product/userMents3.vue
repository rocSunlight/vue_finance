<template>
  <jroll-infinite4 class="scroll-wrapper" id="wrapper4">
    <div class="jp-evaluation">
      <div  class="listWrap" v-if="ments === []">暂无数据....</div>
      <div class="listWrap" v-for="item in ments">
        <div class="list-title">
          <span class="userName">{{item.mobile}}</span>
          <v-start :score="item.score"></v-start>
          <small >{{item.score}}.0分</small>
          <small class="jp-time">{{item.add_time}}</small>
        </div>
        <p class="listEva">
          {{item.comment}}
        </p>
        <div class="listState">
          {{item.borrow_status}}
        </div>
      </div>
    </div>
  </jroll-infinite4>
</template>

<script type="text/ecmascript-6">
  //  评价星星
  import stars from '../common/stars.vue'

  var _this4 = ''
  var _datapage4 = ''
  export default {
    name: 'userMent',
    data () {
      return {
        id : this.$route.params.id,
        p : this.$route.params.p,
        ments : [],
        t_page : '',
        nexturl : ''
      }
    },
    created(){
      _this4 = this

      this.$http.post('http://'+this.$store.state.urlIp+'api/index/borrow_comment/id/'+this.id,{label:2}).then(response=>{
        this.ments = response.body.info
        this.t_page = response.body.t_page
        this.nexturl = response.body.nexturl

        //判断数据是否有数据，有则刷新，没有的话禁止滚动
        var jroll = new JRoll("#wrapper4");
        //do something，例：动态修改scroller的内容，使scroller的高度发生变化
        if (this.ments.length === 0) {
          jroll.disable()
        }
      })
    },
    activated(){

      var jroll = new JRoll("#wrapper4");
      //do something，例：动态修改scroller的内容，使scroller的高度发生变化
      jroll.refresh();
    },
    components:{
      'v-start' : stars,
      'jroll-infinite4': JRoll.VueInfinite({
        tip: '<img class="homeLoding" src="./static/img/001.gif" >正在加载...</img>',
        pulldown: {
          refresh: function(complete) {
            //完成加载数据的操作后回调执行complete方法
            complete();
          }
        },
        bottomed: function (complete) {
          var me = this
          var page = _this4.t_page  //获取后台传来的数据页数

          if(typeof complete === 'function'){
            me.tip = '&nbsp;'
            page = 2
            _this4.ments = []
            _this4.nexturl = 'http://'+_this4.$store.state.urlIp+'api/index/borrow_comment/id/'+_this4.id+'/p/1'
          }
          if (me.page <  page - 1) {

            _this4.$http.post(_this4.nexturl,{label:2}).then(response => {
              let res = response.body
              let jons = res.info
              _this4.nexturl = res.nexturl
              if (typeof complete === 'function') {
                _this4.ments =_this4.ments.concat(jons)
                me.page = 0

                complete()
              }else{
                me.page++
                _this4.ments = _this4.ments.concat(jons)
                me.tip = '&nbsp;'
              }
            })
          }
          //判断数据是否存在，有则刷新
          if(_this4.ments.length === 0 ){
            me.tip = '&nbsp;'
          }else {
            if (_this4.nexturl ===  '' ) {
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
</style>
