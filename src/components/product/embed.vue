<template>
  <div class="jp-topBack" style="height: 100%">
    <header id="header" class="mui-bar mui-bar-nav">
      <h1 class="mui-title" v-text="textName"></h1>
      <a  class="mui-icon mui-icon-left-nav mui-pull-left" @click="back()"></a>
    </header>
    <iframe width="100%" height="100%"  :src="$store.state.pInfo.c_url" v-if="$route.params.u === 1">

    </iframe>

    <iframe width="100%" height="100%"  :src="$store.state.pInfo.raiders" v-else="">

    </iframe>

  </div>
</template>

<script type="text/ecmascript-6">
  //调用webview事件打开url
  import topBack from '../common/topBack.vue'
  var w = null
  export default({
    name : 'embed',
    data() {
      return {
        textName : '手贷通'
      }
    },
    mounted(){
//      this.show()
    },
    methods:{
      show () {
//        w = plus.webview.open('http://baidu.com','embed', {top:'46px',bottom:'0px'});
      },
      back(){
//        plus.webview.hide(w)
        this.$router.back()
      }
    },
    beforeRouteLeave(to, from, next) {
      // 设置下一个路由的 meta

      if(to.name === 'ProductInfo' ){
        to.meta.keepAlive = true;  //
      }
      next();
    }
  })
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../style/stylus/common.styl"
  .jp-topBack
    iframe
      padding-top 1.2rem
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

</style>
