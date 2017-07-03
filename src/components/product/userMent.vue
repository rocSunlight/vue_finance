<template>

  <div class="jp-userMent">
    <v-topBack :rightShow="false" :leftShow="true" :textName="textName"></v-topBack>
    <div class="pgTop">
      <div class="jp-screening ">
        <span v-for="(labs,$index) in pComment1"  :class="{active :   $index == $route.params.p  }" @click="Modify($index)" >{{labs.name}} ({{labs.num}})</span>

      </div>


      <v-userMents :acitves="acitves" :aa="acitves"></v-userMents>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import topBack from '../common/topBack.vue'
  import userMents from '../product/userMents.vue'
  import {mapState,mapActions} from 'vuex'

	var flag=false
	var mask = mui.createMask(function(){
		return flag
	});


  export default {
    name: 'userMent',
    data () {
      return {
        textName : '用户评论',
        id : this.$route.params.id,
        acitves : this.$route.params.p
      }
    },
    computed:{
      ...mapState([
          'pComment1'
      ])
    },
    beforeMount(){
      this.$http.post('http://' + this.$store.state.urlIp + 'api/index/borrow_comment/id/' + this.id, {
        label: this.$route.params.p,
        before: function () {
          //遮罩层显示
          mask.show();
          //添加loading动画
          $('.mui-backdrop').append('<img src="./static/img/006.gif" class="loading" />')
        }
      }).then(response => {

        this.$store.commit('setComment', {
          pComment1: response.body.label,
        })
        flag=true
        mask.close()
      })
    },
    methods:{
      Modify(index){
        this.acitves= index
        this.$router.replace({ name: 'UserMent', params: { id: this.$route.params.id ,p:index}})

      }
    },
    components:{
      'v-topBack' : topBack,
      'v-userMents' : userMents
    },
    beforeRouteLeave(to, from, next) {
      // 设置下一个路由的 meta
      if(to.name === 'ProductInfo' ){
        to.meta.keepAlive = true;  //
      }
      next();
    }

  }
</script>


<style lang="stylus" rel="stylesheet/stylus">
  @import "../../style/stylus/common.styl"

  .jp-userMent
    position absolute
    top 0
    bottom 0
    left 0
    right 0
    .mui-scroll-wrapper
      top: 3.78rem;
    .jp-screening
      jp-padding(28)
      overflow hidden
      height: 2.64rem;
      border-bottom 2px solid #f3f3f3
      background-color: #fff;
      span
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
    .jp-evaluation
      .listWrap
        jp-padding2(25,30)
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
             margin-top 0.18rem
        .listEva
          jp-font(28)
          color #4d4d4d
          line-height 0.5rem
          margin-bottom 0.3rem
        .listState
          jp-font(28)
          color #f54c18
</style>
