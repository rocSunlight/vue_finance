<template>
  <div id="jp-list">
    <template v-for="(item,$index) in productList">

	    <div class="listWrap" >
	      <div class="wrapCotnet" @click.stop="play(item.id)">
	        <router-link :to="{name : 'ProductInfo' ,params : { id : item.id }}" class="wrap-a">
	          <div class="wrapLeft">
	            <img :src="item.c_logo" alt="">
	            <div class="username">
	                <h3>{{ item.c_name }}</h3>
	                <h4>额度范围{{ item.range }}W</h4>
	                <h4>参考{{ item.is_day }}利率{{ item.interest }}%</h4>
	            </div>
	          </div>
	          <div class="wrapRight">
	              <h4 class="textr">{{ item.joins }}人已申请</h4>
	              <div class="btm-anniu ">可贷款≈<span>{{ item.money }}</span> </div>
	          </div>
	        </router-link>

	      </div>
	      <div class="listNotice" >
	        <i class="icon-notice"></i>
	        <span>{{ item.comment}}</span>
	      </div>
	    </div>
      <div class="h10"></div>
    </template>
  </div>
</template>

<script type="text/ecmascript-6">
  export default  {
    name: 'list',
    props:['productList'],
    data(){
    	return {

    	}
    },
    created(){

    },
    methods:{
      play (id){
        this.$http.jsonp('http://'+this.$store.state.urlIp+'api/index/details/id/'+id).then(response=>{
          this.$store.commit('setProductInfo',{
            pInfo : response.body.info,
            pComment1 : response.body.info.comment.label,
            pComList : response.body.info.comment.comment_list
          })
        });
      }
    },
    components : {

    },
    watch:{
    	productList:function(newVal,oldVal){

    	}
    }
  }

</script >

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../style/stylus/common.styl"

  #jp-list
    padding 0 0.1333rem
    .listWrap
      height 3.0666rem
      box-sizing border-box
      background-color #fff
      border-radius 0.1333rem
      overflow hidden
      .wrapCotnet
        width 100%
        height 2.4rem
        padding 0.333rem  0.24rem
        .wrap-a
          display flex
          height 100%
          .wrapLeft
            flex 1
            img
              width 1.68rem
              height 1.68rem
              float  left
              margin-right 0.4rem
              border-radius 50%
            .username
              width 100%
              h3
                font-size 0.4rem
                line-height 0.555rem
                color #1d1d1d
              h4
                font-size 0.2933rem
                line-height: 0.5rem;
                color #959595
          .wrapRight
             flex 0 0 3.4rem
             h4
               font-size 0.2933rem
               line-height: 0.45rem;
               margin-bottom 0.2rem
               color #959595
             .btm-anniu
                width 100%
                height: 1rem;
                background-image url('anniu_kded.png')
                background-size: contain;
                background-repeat no-repeat
                font-size: 0.32rem;
                line-height: 0.95rem;
                text-indent: 1.1rem;
                color #e83428
                span
                  font-size 120%
                &.active
                  background-image url('anniu_pgz.png')
                  color #706e6b
                  span
                    font-size 130%
      .listNotice
        width 100%
        height 0.666rem
        border-top: 0.013333rem solid #f3f3f3;
        .icon-notice
          jp-width(32)
          jp-height(32)
          display inline-block
          background-image url(icom_gb.png)
          bgContain(contain)
          jp-margin2(10,22)
         span
          jp-font(22)
          color #747474
          display inline-block
          vertical-align top
          jp-height(55)





</style>
