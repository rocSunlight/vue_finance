<template>
	<div id="help">
		<div class="topBar">
			<v-topBack :rightShow="false" :leftShow="true" :textName="textName"></v-topBack>
		</div>
		<ol class="helpList">
			<li @click='show=1'><span>如何申请贷款</span> <img src="./bzzx_icom_dk.png" v-show='show!=1'/><img src="./bzzx_icom_gb.png" v-show='show==1'/></li>
			<div class="detail" v-show='show==1'>
				请直接在“手贷通”进行借款，您可以根据自己的需求和资质结合我们的贷款分类选择合适自己的产品，并根据此贷款产品的要求填完资料并提
			</div>
			<li @click='show=2'><span>如何申请贷款</span> <img src="./bzzx_icom_dk.png" v-show='show!=2'/><img src="./bzzx_icom_gb.png" v-show='show==2'/></li>
			<div class="detail" v-show='show==2'>
				请直接在“手贷通”进行借款，您可以根据自己的需求和资质结合我们的贷款分类选择合适自己的产品，并根据此贷款产品的要求填完资料并提
			</div>
			<li @click='show=3'><span>如何申请贷款</span> <img src="./bzzx_icom_dk.png" v-show='show!=3'/><img src="./bzzx_icom_gb.png" v-show='show==3'/></li>
			<div class="detail" v-show='show==3'>
				请直接在“手贷通”进行借款，您可以根据自己的需求和资质结合我们的贷款分类选择合适自己的产品，并根据此贷款产品的要求填完资料并提
			</div>
			<li @click='show=4'><span>如何申请贷款</span> <img src="./bzzx_icom_dk.png" v-show='show!=4'/><img src="./bzzx_icom_gb.png" v-show='show==4'/></li>
			<div class="detail" v-show='show==4'>
				请直接在“手贷通”进行借款，您可以根据自己的需求和资质结合我们的贷款分类选择合适自己的产品，并根据此贷款产品的要求填完资料并提
			</div>
			<li @click='show=5'><span>如何申请贷款</span> <img src="./bzzx_icom_dk.png" v-show='show!=5'/><img src="./bzzx_icom_gb.png" v-show='show==5'/></li>
			<div class="detail" v-show='show==5'>
				请直接在“手贷通”进行借款，您可以根据自己的需求和资质结合我们的贷款分类选择合适自己的产品，并根据此贷款产品的要求填完资料并提
			</div>
			<li @click='show=6'><span>如何申请贷款</span> <img src="./bzzx_icom_dk.png" v-show='show!=6'/><img src="./bzzx_icom_gb.png" v-show='show==6'/></li>
			<div class="detail" v-show='show==6'>
				请直接在“手贷通”进行借款，您可以根据自己的需求和资质结合我们的贷款分类选择合适自己的产品，并根据此贷款产品的要求填完资料并提
			</div>
			<li @click='show=7'><span>如何申请贷款</span> <img src="./bzzx_icom_dk.png" v-show='show!=7'/><img src="./bzzx_icom_gb.png" v-show='show==7'/></li>
			<div class="detail" v-show='show==7'>
				请直接在“手贷通”进行借款，您可以根据自己的需求和资质结合我们的贷款分类选择合适自己的产品，并根据此贷款产品的要求填完资料并提
			</div>
			<li @click='show=8'><span>如何申请贷款</span> <img src="./bzzx_icom_dk.png" v-show='show!=8'/><img src="./bzzx_icom_gb.png" v-show='show==8'/></li>
			<div class="detail" v-show='show==8'>
				请直接在“手贷通”进行借款，您可以根据自己的需求和资质结合我们的贷款分类选择合适自己的产品，并根据此贷款产品的要求填完资料并提
			</div>
			<li @click='show=9'><span>如何申请贷款</span> <img src="./bzzx_icom_dk.png" v-show='show!=9'/><img src="./bzzx_icom_gb.png" v-show='show==9'/></li>
			<div class="detail" v-show='show==9'>
				请直接在“手贷通”进行借款，您可以根据自己的需求和资质结合我们的贷款分类选择合适自己的产品，并根据此贷款产品的要求填完资料并提
			</div>
			<li @click='show=10'><span>如何申请贷款</span> <img src="./bzzx_icom_dk.png" v-show='show!=10'/><img src="./bzzx_icom_gb.png" v-show='show==10'/></li>
			<div class="detail" v-show='show==10'>
				请直接在“手贷通”进行借款，您可以根据自己的需求和资质结合我们的贷款分类选择合适自己的产品，并根据此贷款产品的要求填完资料并提
			</div>
		</ol>
	</div>
	
</template>

<script>
	import topBack from '../common/topBack.vue'
	
	var picker;
	export default {
	  name: 'help',
	  data () {
	    return {
	      textName : '帮助中心',
	      show : 100
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
	#help{
		width: 100%;
		height: 100%;
		background: white;
	}
	#help .topBar{
		width: 100%;
		height: 1.2rem;
		background-color: #F5AB18;
	}
	#header{
	    -webkit-box-shadow: none;
	    box-shadow: none;
	}
	#help .helpList{
		width: 100%;
		background-color: #f3f3f3;
		list-style-position:inside;
		color: #5c5c5c;

	}
	#help .helpList li{
		width: 100%;
		padding: 0 4%;
		height: 1.333333rem;
		line-height: 1.333333rem;
		font-size: 0.4rem;
		border-bottom: 1px solid #e3e3e3;
		background: white;
		list-style: decimal inside;
	}
	#help .helpList li span{
		vertical-align: baseline;
	}
	#help .helpList li img{
		float: right;
		margin-top: 0.533333rem;
	}
	#help .helpList .detail{
		width: 100%;
		padding: 0 4%;
		font-size: 0.32rem;
		line-height: 0.4rem;
	}
</style>