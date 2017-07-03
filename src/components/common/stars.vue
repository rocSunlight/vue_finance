<template>
    <div class="jp-stars">
      <span   v-for="(itemClass,key) in itemClasses"  :class="[itemClass,{'pLg': bind }]"  v-if="key < 5"  class="star-item "></span>
    </div>
</template>

<script type="text/ecmascript-6">
  const LENGTH = 5
  const CLS_ON = 'jp-on'
  const CLS_YES = 'jp-yes'

  export default {
      name : 'stars',
      data(){
          return {

        }
      },
     props : {
       score:{
         type: [String,Number]
       },
       bind:{
         type: Boolean
       },

      },
      mounted(){
        if(this.bind === true){
            this.bindTa()
        }

      },
      methods:{

        //星星评价
        bindTa(){

           if(this.bind ){
             var _this = this
             var num,finalnum,tempnum;
             num = finalnum = tempnum = 0;
             var lis = document.getElementsByClassName("pLg");
             //num:传入点亮星星的个数
             //finalnum:最终点亮星星的个数
             //tempnum:一个中间值
             function fnShow(num) {
               finalnum = num || tempnum;//如果传入的num为0，则finalnum取tempnum的值
               for (var i = 0; i < lis.length; i++) {
                 lis[i].className = i < finalnum ? "star-item jp-yes pLg" : "star-item jp-on pLg";//点亮星星就是加class为light的样式
               }
             }
             for (var i = 1; i <= lis.length; i++) {
               lis[i - 1].index = i;
               lis[i - 1].onmouseover = function () { //鼠标经过点亮星星。
                 fnShow(this.index);//传入的值为正，就是finalnum
                 _this.$emit('setStartLeng',this.index)
               }
               lis[i - 1].onmouseout = function () { //鼠标离开时星星变暗
                 fnShow(0);//传入值为0，finalnum为tempnum,初始为0
               }
               lis[i - 1].onclick = function () { //鼠标点击,同时会调用onmouseout,改变tempnum值点亮星星
                 tempnum = this.index;
               }
             }
           }

        }
      },
      //计算computed
      computed : {
        itemClasses(){
          let result = []
          let integer = Math.floor(this.score)
          for(let i=0;i<integer;i++){
            result.push(CLS_YES);
          }
          while(result.length<LENGTH){
            result.push(CLS_ON);
          }
          return result;
        }
      }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../style/stylus/common.styl"
    .jp-stars
      display inline-block
      vertical-align: sub;
      .star-item
        jp-margin2(0,8)
        bgContain(contain)
        display inline-block
        jp-width(30)
        jp-height(30)
        &:first-child
          margin-left 0.3rem
        &.pLg
          padding: 0.32rem
          margin 0 0.32rem
        &.jp-on
          background-image url(tjpj_icom_cpmyd_ct.png)
        &.jp-yes
          background-image url(tjpj_icom_cpmyd_xz.png)

</style>
