<template>
	<div id="aboutUs">
		<div class="topBar">
			<v-topBack :rightShow="false" :leftShow="true" :textName="textName"></v-topBack>
		</div>
		<img src="./gywm_banner.png"/>
		<div class="info">
			<span>【手贷通App】</span>一款致力于为广大借款人提供高效、便捷、安全的贷款服务，轻松实现借贷需求！
		</div>
		<div class="appStatus">
			当前版本：<span>v1.0.0</span>
		</div>
	</div>
	
</template>

<script>
	import topBack from '../common/topBack.vue'
	
	var picker;
	export default {
	  name: 'aboutUs',
	  data () {
	    return {
	      textName : '关于我们'
	    }
	  },
	  created(){
	  	
	  },
	  mounted(){
	
	  },
	  components:{
	    'v-topBack' : topBack
	  },
	  methods:{
	  	
	  },
	  destroyed(){
	  	
	  }
	}
	
</script>

<style>
	#aboutUs{
		width: 100%;
		height: 100%;
		background: white;
	}
	#aboutUs .topBar{
		width: 100%;
		height: 1.2rem;
		background-color: #F5AB18;
	}
	#header{
	    -webkit-box-shadow: none;
	    box-shadow: none;
	}
	#aboutUs img{
		width: 100%;
	}
	#aboutUs .info{
		width: 92%;
		margin: 0.666666rem auto;
		font-size: 0.4rem;
		color: #5c5c5c;
		line-height: 0.666666rem
	}
	#aboutUs .info span{
		font-size: 0.533333rem
	}
	#aboutUs .appStatus{
		width: 92%;
		margin: 0.666666rem auto;
		font-size: 0.4rem;
		text-align: right;
		margin-top: 2.666666rem;
		color: #797979;
	}
</style>