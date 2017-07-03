<template>
  <div class="jp-userTop">
    <div  class="jp-userImg">
      <img :src='userInfo.c_logo' alt="">
    </div>
    <div class="jp-user">
      <h1 class="jp-userName">{{userInfo.c_name}}</h1>
      <span class="jp-label" :class="{active : $index ===0}" v-for="(item,$index) in userInfo.label" v-if="$index < 4">{{item}}</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default  {
    name: 'name',
    props:['userInfo'],
    watch:{
      userInfo:function(newVal,oldVal){

      }
    },
    mounted(){

    },
    components : {

    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../style/stylus/common.styl"

  .jp-userTop
    display flex
    background-color #f5ab18
    jp-padding(20,30)
    .jp-userImg
      jp-flex(144)
      img
        jp-width(122)
        jp-height(122)
        border-radius: 50%;
        padding: 2px;
        border: 1px solid #fff;
        background-color: #fff;


    .jp-user
      flex 1
      .jp-userName
        jp-font(30)
        jp-height(60)
        color #fff
      .jp-label
        display inline-block
        jp-height(38)
        jp-width(102)
        jp-font(20)
        bgContain(contain )
        jp-margin4(0,18,0,0)
        background-image url(anniu_ffz.png)
        color #e25a5a
        text-align center
        &.active
          background-image url(anniu_gxd.png)
          color #b39833



</style>
