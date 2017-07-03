<template>
  <div id="navigation">
    <div class="tab">
    	<router-link to="/" >
    		<div class="home_icon icon" replace></div>
    		<p>首页</p>
    	</router-link>
    </div>
    <div class="tab">
    	<router-link to="/commodity" >
    		<div class="product_icon icon"></div>
    		<p>产品中心</p>
    	</router-link>
    </div>
    <div class="tab">
    	<router-link to="/personal" >
    		<div class="personal_icon icon"></div>
    		<p>个人中心</p>
    	</router-link>
    </div>
  </div>
</template>


<script type="text/javascript">
	export default {
    name : 'navigation',
    data () {
      return {

      }
    }
  }
</script>

<style type="text/css">
	#navigation{
		width: 100%;
		height: 1.45rem;
		background-color: #fff;
		border-top:1px solid #dcdcdc;
		position: fixed;
		bottom: 0;
		left: 0;
	}
	#navigation .tab{
		width: 30%;
		text-align: center;
		float: left;
		margin:0 1.666666%;
	}
	#navigation .tab a{
		display: block;
	}
	#navigation .tab .icon{
		display: inline-block;
		width:0.733333rem;
		height: 0.733333rem;
		margin-top: 0.133333rem;
	}
	#navigation .tab p{
		font-size: 0.32rem;
		margin-top: 0.05rem;
}
	#navigation .tab a.router-link-exact-active .home_icon{
		background: url(../../../static/img/tab_icom_sy_xz.png) no-repeat;
		background-size: 0.733333rem;
	}
	#navigation .tab a.router-link-exact-active .product_icon{
		background: url(../../../static/img/tab_icom_cpzx_xz.png) no-repeat;
		background-size: 0.733333rem;
	}
	#navigation .tab a.router-link-exact-active .personal_icon{
		background: url(../../../static/img/tab_icom_grzx_xz.png) no-repeat;
		background-size: 0.733333rem;
	}
	#navigation .tab .home_icon{
		background: url(../../../static/img/tab_icom_sy_ct.png) no-repeat;
		background-size: 0.733333rem;
	}
	#navigation .tab .product_icon{
		background: url(../../../static/img/tab_icom_cpzx_ct.png) no-repeat;
		background-size: 0.733333rem;
	}
	#navigation .tab .personal_icon{
		background: url(../../../static/img/tab_icom_grzx_ct.png) no-repeat;
		background-size: 0.733333rem;
	}
	#navigation .tab a.router-link-exact-active p{
		color:#f5ab18;
	}
	#navigation .tab a.router-link-exact-active p{
		color:#f5ab18;
	}
	#navigation .tab a.router-link-exact-active p{
		color:#f5ab18;
	}

</style>
