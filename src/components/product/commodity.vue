<template>

    <div class="product">
    <div class="topBar">
      <p>产品中心</p>
    </div>
    <ul class="selectBar clearFix">
      <li @click='selectSf'><span>{{shenFen}}</span><img src="../../../static/img/cpzx_icom_ct.png" v-show='selectSfNum%2!=0'/><img src="../../../static/img/cpzx_icom_xz.png" v-show='selectSfNum%2==0'/></li>
      <li @click='selectJe'><span>{{jinE}}</span><img src="../../../static/img/cpzx_icom_ct.png"/></li>
      <li @click='selectDk'><span>{{leiXing}}</span><img src="../../../static/img/cpzx_icom_ct.png"  v-show='selectDkNum%2!=0'/><img src="../../../static/img/cpzx_icom_xz.png"  v-show='selectDkNum%2==0'/></li>
    </ul>
    <div class="selectTab" v-show='selectTabShow'>
      <div class="sfTab" v-show='selectSfNum%2==0'>
        <span v-bind:class="{active:a=='bx'}" @click="sf"  ref="bx" id='bx' setid="0">身份不限</span>
        <span v-bind:class="{active:a=='sb'}" @click="sf" ref="sb" id='sb' setid="1">上班族</span>
        <span v-bind:class="{active:a=='xs'}" @click="sf" id='xs' setid="2">学生党</span>
        <span v-bind:class="{active:a=='sy'}" @click="sf" id='sy' setid="3">生意人</span>
        <span v-bind:class="{active:a=='zy'}" @click="sf" id='zy' setid="4">自由职业</span>
      </div>
      <div class="lxTab" v-show='selectDkNum%2==0'>
        <div class="have">
          <p>我有</p>
          <span @click="haveFn" id='xy'>信用卡</span>
          <span @click="haveFn"  id='sfz'>身份证</span>
          <span @click="haveFn"  id='gjj'>公积金</span>
          <span @click="haveFn"  id='tb'>淘宝</span>
          <span @click="haveFn"  id='rh'>人行征信</span>
          <span @click="haveFn"  id='xx'>学信</span>
          <span @click="haveFn"  id='zm'>芝麻信用</span>
        </div>
        <div class="need">
          <p>我需要</p>
          <span v-bind:class="{active:needTemp=='8'}" @click="iNeed(8)" id='kj'>快借1000</span>
          <span v-bind:class="{active:needTemp=='9'}" @click="iNeed(9)" id='cd'>超低利率</span>
          <span v-bind:class="{active:needTemp=='10'}" @click="iNeed(10)" id='gt'>高通过率</span>
          <span v-bind:class="{active:needTemp=='11'}" @click="iNeed(11)" id='zx'>最新平台</span>
          <span v-bind:class="{active:needTemp=='12'}" @click="iNeed(12)" id='mf'>秒放款</span>
          <span v-bind:class="{active:needTemp=='13'}" @click="iNeed(13)" id='mx'>免息活动</span>
          <span v-bind:class="{active:needTemp=='14'}" @click="iNeed(14)" id='yc'>一次还清</span>
          <span v-bind:class="{active:needTemp=='15'}" @click="iNeed(15)" id='fq'>分期还款</span>
          <span v-bind:class="{active:needTemp=='16'}" @click="iNeed(16)" id='de'>大额贷款</span>
          <span v-bind:class="{active:needTemp=='17'}" @click="iNeed(17)" id='hx'>还信用卡</span>
        </div>

        <button class="jp-reset" @click="reset">重置</button>
        <button @click="check">确定</button>
      </div>
      <div class="mui-backdrop" style="opacity:1" @click="cancelBackDrop"></div>
    </div>
	<div class="warnWrap" v-show="warn">
		<img src="../../../static/img/warn.png"/>
		<p>好像没有你要的哦</p>
	</div>
    <jroll-infinite class="com-scrollr" id="wrapper">
       <nav-list v-bind:productList='productList'></nav-list>
    </jroll-infinite>

    <nav-gation ></nav-gation >
  </div>


</template>



<script>
  import Navigation from '../common/navigation'
  import Navlist from '../common/list'

  import { mapActions } from 'vuex'
  import { USER_SIGNIN } from '../../style/js/user'

  var picker;
  var flag=false
  var mask = mui.createMask(function(){
	    return flag;
	});
  var _this //存放滚动条里this
  var me
  var page
  export default {
    name: 'commodity',
    data () {
      return {
        msg: '',
        //判断 筛选栏是否显示
        selectTabShow:false,
        //判断 身份选择筛选栏是否显示
        selectSfNum : 1,
        //判断 贷款类型选择筛选栏是否显示
        selectDkNum : 1,
        setid : 0, //获取身份索引
        mon : 0, //获取身份索引
        shenFen:'不限',
        jinE: '金额不限',
        leiXing:'贷款类型',
        //判断  身份列表项目  class
        a:'bx',
        //判断我需要项目class
        needTemp : '',
        //我有列表
        haveList:[],
        //我需要  列表
        needList:0,
        productList:'',
        t_page : '',
        p_url : '',
        scroll : 0,
        warn:false
      }
    },

    created(){
      _this = this

      this.$http.post('http://'+this.$store.state.urlIp+'/api/index/lists/',{
        before:function(){
          //遮罩层显示
          mask.show();
          //添加loading动画
          $('.mui-backdrop').append('<img src="./static/img/006.gif" class="loading" />')
        }
      }).then(response =>{
      	if(response.body.info.length==0){
     		this.warn=true
     	}
	    else{
	      	this.warn=false
	    }

        this.productList=response.body.info
        this.t_page =response.body.t_page
        this.p_url = response.body.nexturl
        //遮罩层关闭
        flag=true
        mask.close();
        $('.mui-backdrop').children('img').remove();

        //判断数据是否有数据，有则刷新，没有的话禁止滚动
        var jroll = new JRoll("#wrapper");
        //do something，例：动态修改scroller的内容，使scroller的高度发生变化
        if (this.productList.length === 0) {
          jroll.disable()
        }
      },response =>{

      })

    },
    activated(){
    	if($('.mui-backdrop').children().is("img")){
         	 $('.mui-backdrop').children('img').remove();
        }

      var jroll = new JRoll("#wrapper");
      //do something，例：动态修改scroller的内容，使scroller的高度发生变化
      jroll.refresh();
    },
    methods:{
      selectSf(){
        //身份选择栏
        if(this.selectSfNum%2!=0){
          this.selectTabShow=true;
          this.selectSfNum++
          this.selectDkNum=1
        }
        else if(this.selectSfNum%2==0){
          this.selectTabShow=false;
          this.selectSfNum++
          this.selectDkNum=1
        }

        if($('body').children().is(".mui-poppicker")){
         	picker.hide();
			    picker.dispose()
        }
      },
      sf:function(event){
          console.log(event.target.id)
        //选择身份类型，选择完毕立即请求数据
        this.a=event.target.id;
        this.shenFen=event.target.innerHTML
        this.setid = event.target.getAttribute ( 'setid' )

        //在这执行数据请求
        this.$http.get('http://'+this.$store.state.urlIp+'/api/index/lists/',{params : {type : this.setid ,label : this.haveList,lable: this.needList,money : this.mon}}).then(response =>{
         if(response.body.info.length==0){
         		this.warn=true
         	} else{
	          	this.warn=false
         }

          this.productList = response.body.info
          this.t_page =response.body.t_page
          this.p_url = response.body.nexturl
          this.scroll = 0
          var jroll = new JRoll("#wrapper");
          //do something，例：动态修改scroller的内容，使scroller的高度发生变化
          jroll.scrollTo(0, 0, 0);
          me.tip = '&nbsp;'
        })

        this.selectSfNum=1
        this.selectTabShow=false;
      },
      selectJe(){
        //借款金额 栏
        this.selectDkNum=1;
        this.selectSfNum=1;
        this.selectTabShow=false;

		//初始化 社保选项 的picker
	      picker = new mui.PopPicker({buttons:['取消','确定']});
	      picker.setData(['金额不限','500元','1000元','1500元','2000元','3000元','4000元','5000元','6000元','7000元','8000元','10000元','15000元','30000元','50000元','10万元','20万元']);
	      this.addTitle();


        var that = this;
        picker.show(function (selectItems) {
          that.jinE=selectItems[0]
          that.mon = parseInt(that.jinE)||0;

          //在这执行数据请求
          that.$http.get('http://'+that.$store.state.urlIp+'/api/index/lists/',{params : {type : that.setid ,label : that.haveList,lable: that.needList,money : that.mon}}).then(response =>{
            if(response.body.info.length==0){
         		this.warn=true
         	}
	          else{
	          	this.warn=false
	          }

            that.productList = response.body.info
            that.t_page =response.body.t_page
            that.p_url = response.body.nexturl
            that.scroll = 0
            var jroll = new JRoll("#wrapper");
            //do something，例：动态修改scroller的内容，使scroller的高度发生变化
            jroll.scrollTo(0, 0, 0);

			picker.hide();
			picker.dispose()


          })
        })

      },
      check(){
        //确定贷款类型栏选择---确定即在这执行数据请求

        this.selectDkNum=1;
        this.selectTabShow=false


        this.$http.get('http://'+this.$store.state.urlIp+'/api/index/lists/',{params : {type : this.setid,label : this.haveList,lable: this.needList,money : this.mon } }).then(response =>{
          if(response.body.info.length==0){
         		this.warn=true
         	}
          else{
          	this.warn=false
          }

          this.productList = response.body.info
          this.t_page =response.body.t_page
          this.p_url = response.body.nexturl
          this.scroll = 0
          var jroll = new JRoll("#wrapper");
          //do something，例：动态修改scroller的内容，使scroller的高度发生变化
          jroll.scrollTo(0, 0, 0);
        })
        //点击确定按钮，判断消除picker
        if($('body').children().is(".mui-poppicker")){
         	picker.hide();
			picker.dispose()
        }

      },
      //重置
      reset(){
        this.setid = 0 //传给后台的type类型
        this.needList = 0
        this.haveList = []
        this.mon = 0  //传给后台的金钱类型
        this.shenFen = '不限'
        this.jinE = '金额不限'
        this.a = 'bx'
        this.needTemp = ''
        $('.have span').removeClass('active')

      },
      selectDk(){
        //借款类型栏
        if(this.selectDkNum%2!=0){
          this.selectTabShow=true;
          this.selectDkNum++
          this.selectSfNum=1
        }
        else if(this.selectDkNum%2==0){
          this.selectTabShow=false;
          this.selectDkNum++
          this.selectSfNum=1
        }

        if($('body').children().is(".mui-poppicker")){
         	picker.hide();
			picker.dispose()
        }


      },
      addTitle(){
        //picker 添加 title
        $('.mui-poppicker-btn-cancel').after('<span class="pickerTitle">金额</span>')
      },

      iNeed(e){
        //贷款类型--我需要 栏  选择完毕将数据存入data中
        this.needList = ''
        this.needTemp=e;
        this.needList= e;
      },

      haveFn(event){
        var aaa=event.target.id
        $("#"+aaa).toggleClass("active")
        //添加内容到 我有 列表
        if(this.haveList.indexOf($("#"+aaa).index())<=-1){
          this.haveList.push($("#"+aaa).index())

        }
        else{
          for(var i=0;i<this.haveList.length;i++){
            if(this.haveList[i]==($("#"+aaa).index())){
              this.haveList.splice(i, 1)
            }
          }
        }


      },
      cancelBackDrop(){
        this.selectSfNum=1
        this.selectDkNum=1;
        this.selectTabShow=false
      },

    },
    components: {
      'nav-gation': Navigation,
      'nav-list':Navlist,
      'jroll-infinite': JRoll.VueInfinite({
        tip: '<img class="homeLoding" src="./static/img/001.gif" >正在加载...</img>',
        pulldown: {
          refresh: function(complete) {
            //完成加载数据的操作后回调执行complete方法
            complete();
          }
        },
        bottomed: function (complete) {
          me = this
          page = _this.t_page  //获取后台传来的数据页数

          if(typeof complete === 'function'){
            me.tip = '&nbsp;'
            _this.scroll = 0
            page = 2
            _this.p_url = 'http://'+_this.$store.state.urlIp+'/api/index/lists/'
            _this.productList = []
          }


          if (_this.scroll <  page - 1) {
              console.log(_this.scroll)
            _this.$http.get(_this.p_url, {params : {type : _this.setid,label : _this.haveList,lable: _this.needList,money : _this.mon } }).then(response => {
              let res = response.body
              let jons = res.info
              _this.p_url = res.nexturl
              if (typeof complete === 'function') {
                _this.productList =_this.productList.concat(jons)
                complete()
              }else{
                _this.scroll++
                _this.productList = _this.productList.concat(jons)
                me.tip = '&nbsp;'
              }
            })
          }
          //判断数据是否存在，有则刷新
          if(_this.productList.length === 0){
            me.tip = '&nbsp;'
          }else {

            if (  _this.p_url == '') {
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

      if(to.name === 'ProductInfo' ){
        to.meta.keepAlive = false;  //
      }

      next();
    },

    destroyed(){
		if($('body').children().is(".mui-poppicker")){
         	picker.hide();
			picker.dispose()
        }
    }
  }
</script>

<style type="text/css">

  .product{
    width: 100%;
    height: 100%;
    background: #f3f3f3;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 5;
  }
  .product .topBar{
    width: 100%;
    height: 1.2rem;
    background-color: #f5ab18;
    line-height: 1.2rem;
    text-align: center;
    position: fixed;
    z-index: 9999;
  }
  .product .topBar p{
    font-size: 0.533333rem;
    color: white;
  }
  .product .selectBar{
    width:100%;
    height:1.12rem ;
    background-color: white;
    position: fixed;
    z-index: 9999;
    margin-top: 1.2rem;
  }
  .product .selectBar li{
    width: 30%;
    height: 100%;
    float: left;
    margin:0 1.6%;
    line-height: 1.12rem;
    font-size:0.373333rem;
    color: #3d3d3d;
    text-align: center;
  }
  .product .selectBar li img{
    margin-left: 0.133333rem;
    width: 0.266666rem;
    height: 0.16rem;
  }
  .product .selectTab{
    width: 100%;
    background-color: #f5f5f5;
    position: fixed;
    top: 2.32rem;
    left: 0;
    z-index: 99;
    border-top: 2px solid #BBBBBB;
  }
  .product .selectTab .sfTab{
    width: 100%;
    padding-top: 0.4rem;
    position: relative;
    z-index: 9999;
    background: white;
  }
  .product .selectTab .sfTab span{
    display: inline-block;
    width: 20%;
    height: 0.746666rem;
    background: #dcdcdc;
    margin: 0 2.22222222222% 0.293333rem ;
    text-align: center;
    line-height: 0.7466666rem;
    font-size: 0.32rem;
    border-radius: 0.133333rem;
    color: #6d6868;
  }
  .product .selectTab .lxTab{
    width: 100%;
    text-align: center;
    position: relative;
    z-index: 9999;
    background: white;
  }
  .product .selectTab .lxTab>div{
    text-align: left;
  }
  .product .selectTab .sfTab .active{
    color: white;
    background: #f5ab18;
  }
  .product .selectTab .lxTab .active{
    color: white;
    background: #f5ab18;
  }
  .product .selectTab .lxTab  p{
    font-size: 0.4rem;
    color: #3D3D3D;
    line-height: 1.066666rem;
    margin-left: 0.4rem;
  }
  .product .selectTab .lxTab  span{
    display: inline-block;
    width: 20%;
    height: 0.746666rem;
    background: white;
    margin: 0 2.22222222222% 0.293333rem ;
    text-align: center;
    line-height: 0.7466666rem;
    font-size: 0.32rem;
    border-radius: 0.133333rem;
    color: #F5AB18;
    border:0.026666rem solid #F5AB18;
  }
  .product .selectTab .lxTab button{
    width: 2.4rem;
    height: 0.773333rem;
    font-size: 0.32rem;
    background: #f94848;
    color: white;
    margin: 0.4rem 0.8rem;
    border: none;
    border-radius: 0.133333rem;
  }
  .product .selectTab .lxTab button.jp-reset{
    color: #3d3d3d;
    background-color:#d9d9d9 ;
  }
  .product .warnWrap{
  	width: 4rem;
  	height: 5rem;
  	position: absolute;
  	top: 0;
  	left: 0;
  	right: 0;
  	bottom: 0;
  	margin:auto;
  	z-index: 98;
  }
  .product .warnWrap img{
  	width: 100%;
  }
  .product .warnWrap p{
  	font-size: 0.426666rem;
  	line-height: 0.8rem;
  	text-align: center;
  }
</style>
