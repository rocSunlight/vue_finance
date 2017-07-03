<template>
  <div id="home">
  	<transition name='fade'>
	  	<div class="shenqing" v-show="show">
	  		<div>
	  			<img src="./sy_icom_gb.png" @click='showOrHide'/>
	  			<img src="./sy_ck_pged.png"/>
	  			<div class="jump"  @click="jump"></div>
	  		</div>
	  	</div>
  	</transition>
  	<div class="topBar">
    	<a href="#/login" v-if="loginShow">登录</a>
    	手贷通
    </div>
    <div class="homeWrap">
    	<div class="tips">今天已有<span>{{count}}</span>人申请</div>
    	<transition><img src="./sy_icom_pged.png" v-show='hide' class='smallIcon' @click="jump"/></transition>
	    <div class="swiper-container swiper-container_home">
			  <div class="swiper-wrapper swiper-wrapper_home">
			    <div class="swiper-slide swiper-slide_home" v-for="item in swiperInfo">
			    	<router-link :to="{name : 'ProductInfo' ,params : { id : item.bid }}">
			    		<img class="lunboImg" :src="item.c_logo"/>
				    	<div class="lunboDetail">
				    		<p class="lunboTitle">{{ item.c_name }}</p>
				    		<p class="detail">{{ item.mobile }}用户&nbsp;&nbsp;&nbsp;今日一笔借款已到账</p>
				    	</div>
			    	</router-link>
			    </div>
			  </div>
			</div>
			<div class="list">
				<div class="tempWrap">
					<div class="listLeft">
						<div class="listTemp">
							<router-link to="/listwrap?id=手机/身份证&urlId=1" >
				    		<p><span>手机+身份证</span> 就能贷</p>
								<p>3000元以下</p>
								<img src="./sy_icom_sj sfz.png"/>
				    	</router-link>
						</div>
						<div class="listTemp">
							<router-link to="/listwrap?id=信用卡&urlId=3">
				    		<p><span>信用卡</span> 就能贷</p>
								<p>5000-3W</p>
								<img src="./sy_icom_xyk.png"/>
				    	</router-link>
						</div>
						<div class="listTemp blue">
							<router-link to="/listwrap?id=不查征信&urlId=5">
				    		<p><span>不查征信</span> 就能贷</p>
								<p>没有征信验证，下款更容易</p>
								<img src="./sy_icom_bczx.png"/>
				    	</router-link>
						</div>
						<div class="listTemp blue">
							<router-link to="/listwrap?id=10分钟之内下款&urlId=7">
				    		<p><span>10分钟之内下款</span></p>
								<p>最快8秒下款</p>
								<img src="./sy_icom_sfzznxk.png"/>
				    	</router-link>
						</div>
					</div>
					<div class="listRight">
						<div class="listTemp">
							<router-link to="/listwrap?id=淘宝/京东&urlId=2">
				    		<p><span>淘宝/京东</span> 就能贷</p>
								<p>3000-1W</p>
								<img src="./sy_icom_tb jd.png"/>
				    	</router-link>
						</div>
						<div class="listTemp">
							<router-link to="/listwrap?id=代还信用卡&urlId=4">
				    		<p>代还<span>信用卡</span></p>
				    		<p>5000-5W</p>
								<img src="./sy_icom_dhxyk.png"/>
				    	</router-link>
						</div>
						<div class="listTemp blue">
							<router-link to="/listwrap?id=高通过率推荐&urlId=6">
				    		<p><span>高通过率推荐</span></p>
								<p>通过率高达80%以上</p>
								<img src="./sy_icom_tgltj.png"/>
				    	</router-link>
						</div>
						<div class="listTemp blue">
							<router-link to="/listwrap?id=大额贷款&urlId=8">
				    		<p><span>大额贷款</span></p>
								<p>1-20W</p>
								<img src="./sy_icom_dedk.png"/>
				    	</router-link>
						</div>
					</div>
				</div>
			</div>
    </div>
    <nav-gation ></nav-gation >
  </div>
</template>



<script>
import Navigation from '../common/navigation'

//swiper轮播图
import '../../../static/js/swiper-3.4.2.min'
var flag=false;
var mask = mui.createMask(function(){
	return flag;
});

var _this={}

export default {
	name:'Home',
  data(){
    return {
      show: '',
      hide : false,
      loginShow : true,
      username : '',
      swiperInfo:'',
      count:0,
      userInfo : this.$store.state.user.userInfo,
      ctrlShow:true
    }
  },
  components:{
    'nav-gation': Navigation
  },
  created:function(){
  	_this = this;
  	var that = this;
		//检测登录并且是否有完善所有信息
		if(!$.isEmptyObject(this.$store.state.user)&&this.userInfo!=''){
  		if(this.userInfo.card_id!=undefined){
  			this.ctrlShow=false
  			this.hide=true
  		}
  }
		
		//检测更新
		var wgtVer;
		var newVer;
		var wgtUrl;// 下载wgt文件
		function plusReady(){
		  // ......
		  // 获取本地应用资源版本号
		  plus.runtime.getProperty(plus.runtime.appid,function(inf){
		    wgtVer=inf.version;
		    
		    console.log("当前应用版本："+wgtVer);
		    checkUpdate()
		  });
		}
		document.addEventListener('plusready',plusReady,false);
		// 检测更新
		var checkUrl="http://120.77.253.35:8098/api/index/version";
		function checkUpdate(){
		  plus.nativeUI.showWaiting("检测更新...");
		  var xhr=new XMLHttpRequest();
		  xhr.onreadystatechange=function(){
		    switch(xhr.readyState){
		      case 4:
		        plus.nativeUI.closeWaiting();
		        var data=xhr.responseText;
		        data = eval("("+data+")")
		        if(xhr.status==200){
		          console.log("检测更新成功："+xhr.responseText);
		          newVer= data.version;
		          wgtUrl= data.version_url;
		          if(wgtVer&&newVer&&(wgtVer!=newVer)){
		          	that.ctrlShow=false
		            mui.confirm('<span class="span-text">是否更新版本</span>', '<span class="span-successful">检测到有新版本</span>', new Array('否', '是'), function (e) {
		              if (e.index == 1) {
		                downWgt();  // 下载升级包
		              } else {
		              		that.ctrlShow=true
											setTimeout(function(){
												that.show=that.ctrlShow;
											},800);
		              }
		            },'div');
		
		          }else{
		            // plus.nativeUI.alert("无新版本可更新！");
		            setTimeout(function(){
									that.show=that.ctrlShow;
								},800);
		          }
		        }else{
		          console.log("检测更新失败！");
		          plus.nativeUI.alert("检测更新失败！");
		        }
		        break;
		      default:
		        break;
		    }
		  }
		  xhr.open('GET',checkUrl);
		  xhr.send();
		}
		function downWgt(){
		  plus.nativeUI.showWaiting("下载wgt文件...");
		  plus.downloader.createDownload( wgtUrl, {filename:"_doc/update/"}, function(d,status){
		    if ( status == 200 ) {
		      console.log("下载wgt成功："+d.filename);
		      installWgt(d.filename); // 安装wgt包
		    } else {
		      console.log("下载wgt失败！");
		      plus.nativeUI.alert("下载wgt失败！");
		    }
		    plus.nativeUI.closeWaiting();
		  }).start();
		}
		// 更新应用资源
		function installWgt(path){
		  plus.nativeUI.showWaiting("安装wgt文件...");
		  plus.runtime.install(path,{},function(){
		    plus.nativeUI.closeWaiting();
		    console.log("安装wgt文件成功！");
		    plus.nativeUI.alert("应用资源更新完成！",function(){
		      plus.runtime.restart();
		    });
		  },function(e){
		    plus.nativeUI.closeWaiting();
		    console.log("安装wgt文件失败["+e.code+"]："+e.message);
		    plus.nativeUI.alert("安装wgt文件失败["+e.code+"]："+e.message);
		  });
		}


  	mask.show();
  	//添加loading动画
  	$('.mui-backdrop').append('<img src="./static/img/006.gif" class="loading" />');

  },
  activated(){
  	//请求首页轮播数据
    this.$http.post('http://'+this.$store.state.urlIp+'/api/index/index').then(response =>{
	      		this.swiperInfo=response.body.info
	      		this.count=response.body.count

	      		flag=true
	      		mask.close()
	      		$('.mui-backdrop').children('img').remove();
    		},response =>{
		})
    //判断登录按钮是否显示
    if(this.$store.state.user.username != undefined){
       this.loginShow = false
      this.username =  this.$store.state.user.username
    }

	},
	mounted() {
		var mySwiper = new Swiper('.swiper-container', {
			autoplay: 3000,//可选选项，自动滑动
			direction : 'vertical',
			observer:true,
			observeParents:true
		})

    //安卓返回键监控
    var backButtonPress = 0;
    mui.back = function(event) {
      if(_this.$route.name === 'Home'){
        backButtonPress++;
        if (backButtonPress > 1) {
          plus.runtime.quit();
        } else {

          plus.nativeUI.toast('再次点击退出手贷通');
        }
        setTimeout(function() {
          backButtonPress = 0;
        }, 1000);
      }else {
        _this.$router.go(-1)
      }
    }
  },
  methods:{
  	showOrHide(){
  		this.show=!this.show,
  		this.hide=!this.hide
  	},
  	jump(){
  		var that=this
  		//判断信息是否完善（根据身份证信息判断）
	  	if(!$.isEmptyObject(this.$store.state.user)&&this.userInfo!=''){
	  		if(this.userInfo.card_id!=undefined){
	  			this.show=false
	  			this.hide=true

	  			this.$router.push('/commodity')
	  		}
	  	}
	  	//未登录状态
	  	else if($.isEmptyObject(this.$store.state.user)){
	  		this.show=false
	  		this.hide=true
	  		setTimeout(function(){
	  			
	  			mui.confirm(
		    		'请先登录再申请哦','提示',['放弃登录','立即登录'],function(e){
			    			if(e.index==1){
					  			that.$router.push('/login') 
					  		}
		    			},'div'
		    	)
	  		},800)
	  	}
	  	//已登录但未填写数据
	  	else if(this.userInfo==''){
	  		this.show=false
	  		this.hide=true

	  		setTimeout(function(){
	  			mui.confirm(
		    		'请先完善个人信息','提示',['放弃','立即完善'],function(e){
		    				if(e.index==1){
					  			that.$router.push('/creditinfo') 
					  		}
		    		},'div'
		    	)
	  			
	  		},800)
	  	}
  	}
  }
}

</script>

<style type="text/css">
@import '../../../static/css/swiper-3.4.2.min.css';
@import url("../../../static/css/muiConfirm.css");

#home{
	padding-top:1.2rem;
	width: 100%;
	height: 100%;
	background: #fff;
	position: relative;
}

#home .shenqing{
	width: 100%;
	height: 100%;
	background-color: rgba(0,0,0,0.7);
	position: fixed;
	z-index: 99999;
	top: 0;
	left: 0;
}
#home .fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
#home .fade-enter, .fade-leave-active {
  opacity: 0
}
#home .shenqing>div{
	width: 7.546666rem;
	height: 8.693333rem;
	position: absolute;
	top: 0;
	bottom:0;
	left: 0;
	right: 0;
	margin: auto;
}
#home .shenqing>div>img:nth-child(1){
	position: absolute;
	top:0.266666rem;
	right: 0.266666rem;
	width: 0.533333rem;
	height: 0.533333rem;
}
#home .shenqing>div img:nth-child(2){
	width: 100%;
	height: 100%;
}
#home .shenqing>div .jump{
	width: 80%;
	height: 1.333333rem;
	position: absolute;
	left: 10%;
	bottom: 3%;
	background-color: transparent;
}

#home .topBar{
	width: 100%;
	height: 1.2rem;
	background-color: #f5ab18;
	line-height: 1.2rem;
	font-size: 0.506666rem;
	color: white;
	text-align: center;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 10;
}
#home .topBar a{
	font-size: 0.346666rem;
	width: 4em;
	height: auto;
	position: absolute;
	top: auto;
	left: 0.2rem;
	color: white;
	text-decoration: none;
}
#home .homeWrap{
	height: 100%;
}
#home .homeWrap .smallIcon{
	position: fixed;
	width: 2.333333rem;
	height: 1.933333rem;
	right: 0;
	bottom:30%;
}
#home .homeWrap .smallIcon img{
	width: 2.333333rem;
	height: 1.933333rem;
}
#home .homeWrap .tips{
	font-size: 0.32rem;
	height: 2em;
	line-height: 2em;
	position: absolute;
	top: 1.44rem;
	right: 0.4rem;
}
#home .homeWrap .tips span{
	margin: 0 0.066666rem;
}

#home .swiper-container_home{
	border-bottom: 0.026666rem solid #f3f3f3;
	/*border-bottom: 0.026666rem solid #f3f3f3;*/
	position: relative;
}
#home .swiper-container_home .swiper-wrapper_home{
	height: 1.733333rem;
	width: 9.2rem;
	padding: 0 0.4rem;
}
#home .swiper-container_home .swiper-slide_home{
	height: 1.733333rem;
	line-height: 1.733333rem;
}
#home .swiper-slide_home a{
	display: inline-block;
	width: 100%;
	height: 100%;
}
#home .swiper-slide_home .lunboImg{
	width:1.413333rem ;
	height: 1.413333rem;
	border-radius: 50%;
	margin-top: 0.16rem;
}
#home .swiper-slide_home .lunboDetail{
	float: right;
	width: 80%;
	height: 100%;
	line-height:0.55rem;
}
#home .swiper-slide_home .lunboDetail .lunboTitle{
	font-size: 0.4rem;
	color:#1d1d1d;
	margin-top: 0.32rem;
	font-weight: bold;
}
#home .swiper-slide_home .lunboDetail .detail{
	font-size: 0.32rem;
	color:#727272;
}
#home .swiper-slide_home .lunboDetail .detail span{
	color: #ff3b3b;
}
#home .homeWrap .list{
	overflow: scroll;
	padding-bottom: 2rem;
}
#home .homeWrap .list .tempWrap{
	width: 100%;
	padding: 0 0.4rem;
}
#home .homeWrap .list .tempWrap>div{
	width: 48%;
	padding-top: 0.4rem;
}
#home .homeWrap .list .listLeft{
	float: left;
}
#home .homeWrap .list .listRight{
	float: right;
}
#home .homeWrap .list .listTemp{
	width: 100%;
	height: 2.826666rem;
	background-color: #f57b18;
	margin-bottom: 0.133333rem;
	border-radius: 0.266666rem;
	text-align: center;
}
#home .homeWrap .list .blue{
	background: #f59f18;
}
#home .homeWrap .list .listTemp a{
	color: white;
	display: inline-block;
}
#home .homeWrap .list .listTemp a img{
	width: 0.906666rem;
	height: 0.906666rem;
}
#home .homeWrap .list .listTemp a p{
	color: white;
	line-height: 0.533333rem;
	font-size: 0.4rem;
}
#home .homeWrap .list .listTemp a p span{
	font-weight: bold;
}
#home .homeWrap .list .listTemp a p:nth-child(1){
	margin-top: 0.4rem;
}
#home .homeWrap .list .listTemp a p:nth-child(2){
	color: white;
	line-height: 0.4rem;
	font-size: 0.32rem;
}
</style>
