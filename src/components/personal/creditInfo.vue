<template>
	<div id="creditinfo">
		<div class="topBar">
			<v-topBack :rightShow="false" :leftShow="true" :textName="textName"></v-topBack>
		</div>
		<ul class="wrap">
			<li class="clearFix">手机号   <input type="number" class="input"  v-model='phone' disabled="" v-on:change="changed"/></li>
			<li class="clearFix">姓名  <input type="text" placeholder="请输入" class="input"  v-model='name'  v-on:change="changed"   v-bind:disabled="disable"/></li>
			<li class="clearFix">身份证  <input type="text" placeholder="请输入" class="input"  v-model='idCard' v-on:change="changed" v-bind:disabled="disable"/></li>
			<li class="clearFix">征信<div class="input" @click="selectZhengXin">{{ zhengXin }}</div></li>
			<li class="clearFix">社保 <div class="input" @click="selectSheBao" >{{ sheBao }}</div></li>
			<li class="clearFix">公积金<div class="input" @click="selectGongJiJin">{{ gongJiJin }}</div></li>
			<li class="clearFix">住房信息   <div  class="input" @click="selectHouse" >{{ house }}</div></li>
			<li class="clearFix taobao selection" >
				淘宝账号
				<div class="radioWrap">
					<div class="mui-input-row mui-radio mui-left">
						<label class="xu_lable"  @click="getRadioTb">有</label>
						<input name="tb" type="radio"  class="tbId" value="1"  @click="getRadioTb" v-bind:checked="tbId==1">
					</div>
					<div class="mui-input-row mui-radio mui-left">
						<label class="xu_lable"  @click="getRadioTb">无</label>
						<input name="tb" type="radio"  class="tbId" value="2"  @click="getRadioTb" v-bind:checked="tbId==2">
					</div>
				</div>
			</li>
			<li class="clearFix jd selection" >
				京东账号
				<div class="radioWrap">
					<div class="mui-input-row mui-radio mui-left">
						<label class="xu_lable"  @click="getRadioJd">有</label>
						<input name="jd" type="radio" class="jdId" value="1"  @click="getRadioJd" v-bind:checked="jdId==1">
					</div>
					<div class="mui-input-row mui-radio mui-left">
						<label class="xu_lable"  @click="getRadioJd">无</label>
						<input name="jd" type="radio"  class="jdId" value="2"  @click="getRadioJd" v-bind:checked="jdId==2">
					</div>
				</div>
			</li>
			<li class="clearFix married" >
				婚姻状况
				<div class="radioWrap">
					<div class="mui-input-row mui-radio mui-left">
						<label class="marry_lable" @click="getRadioMarry">已婚</label>
						<input name="radio1" type="radio" v-bind:checked="marry==1" value="1" class="marriedRadio"  @click="getRadioMarry">
					</div>
					<div class="mui-input-row mui-radio mui-left">
						<label class="marry_lable"  @click="getRadioMarry">未婚</label>
						<input name="radio1" type="radio"  value="2"  class="marriedRadio"  @click="getRadioMarry" v-bind:checked="marry==2">
					</div>
				</div>
			</li>
		</ul>
		<div class="saveWrap">
			<div class="save" @click="save">提交</div>
		</div>
	</div>
</template>

<script>
	import topBack from '../common/topBack.vue'

	import { mapActions } from 'vuex'
  	import { USER_SIGNIN } from '../../style/js/user'

	var picker;
	export default {
	  name: 'creditInfo',
	  data () {
	    return {
	      textName : '信用资料',
	      phone:this.$store.state.user.username,
	      name:'',
	      idCard:'',
	      zhengXin:'请选择',
	      sheBao:'请选择',
	      gongJiJin:'请选择',
	      house:"请选择",
	      zxNum:'',
	      sbNum:'',
	      gjjNum:'',
	      houseNum:'',
	      tbId:1,
	      jdId:1,
	      marry:1,
	      zxPickerData:['AAA','AA','A','BBB','BB','B','CCC','CC','C'],
	      pickerData:['无','连续6个月无断续','连续1年无断续','连续一年以上'],
	      housePickerData:['宿舍','亲属房产','自有房产','租房'],
	      userInfo : this.$store.state.user.userInfo,
	      form: {
	          token:this.$store.state.user.token,
	          username: this.$store.state.user.username,
	          userInfo:''
          },
          change:2,
          path:'',
          disable:false

	    }
	  },
	  created(){
	  	if(this.UserInfo!=''){


     		this.name=this.userInfo.name||'';
		    this.idCard=this.userInfo.card_id||'';
		    if(this.name!=""&&this.idCard!=""){
		    	this.disable=true
		    }


		    this.tbId=this.userInfo.is_taobao||1;
		    this.jdId=this.userInfo.is_jd||1;
		    this.marry=this.userInfo.is_marry||1;
		    if(this.tbId==0){
		    	this.tbId=1
		    }
		    if(this.jdId==0){
		    	this.jdId=1
		    }
		    if(this.marry==0){
		    	this.marry=1
		    }

		    this.zxNum=this.userInfo.credit||'';
		    this.sbNum=this.userInfo.shebao||'';
		    this.gjjNum=this.userInfo.gongjijin||'';
		    this.houseNum=this.userInfo.house||'';

		    this.zhengXin=this.zxPickerData[this.zxNum-1]||"请选择"
		    this.sheBao=this.pickerData[this.sbNum-1]||"请选择"
		    this.gongJiJin=this.pickerData[this.gjjNum-1]||"请选择"
		    this.house=this.housePickerData[this.houseNum-1]||"请选择"

     	}
	  },
	  mounted(){

	  },
	  methods:{
	  	...mapActions([USER_SIGNIN]),


	  	selectZhengXin(){
	  		var that = this;

	  		picker = new mui.PopPicker(
		  		{buttons:['取消','确定']}
		  	);

			picker.setData(this.zxPickerData);

			$('.mui-poppicker-btn-cancel').after('<span  class="pickerTitle">征信报告等级</span>')

	  		picker.show(function (selectItems) {
	  			that.zhengXin=selectItems[0]
	  			for(var i=0;i<that.zxPickerData.length;i++){
	  				if(selectItems[0]==that.zxPickerData[i]){
	  					that.zxNum=i+1;
	  					that.change=1
	  				}
	  			}

	  			picker.hide();
	  			picker.dispose()
		  	})
	  	},
	  	selectSheBao(){
	  		var that = this;

	  		picker = new mui.PopPicker(
		  		{buttons:['取消','确定']}
		  	);

			picker.setData(this.pickerData);

			$('.mui-poppicker-btn-cancel').after('<span  class="pickerTitle">社保</span>')

	  		picker.show(function (selectItems) {
	  			that.sheBao=selectItems[0]
	  			for(var i=0;i<that.pickerData.length;i++){
	  				if(selectItems[0]==that.pickerData[i]){
	  					that.sbNum=i+1;
	  					that.change=1
	  				}
	  			}

	  			picker.hide();
	  			picker.dispose()
		  	})
	  	},
	  	selectGongJiJin(){
	  		var that = this;

	  		picker = new mui.PopPicker(
		  		{buttons:['取消','确定']}
		  	);

			picker.setData(this.pickerData);

			$('.mui-poppicker-btn-cancel').after('<span  class="pickerTitle">公积金</span>')

	  		picker.show(function (selectItems) {
	  			that.gongJiJin=selectItems[0]
	  			for(var i=0;i<that.pickerData.length;i++){
	  				if(selectItems[0]==that.pickerData[i]){
	  					that.gjjNum=i+1;
	  					that.change=1
	  				}
	  			}

	  			picker.hide();
	  			picker.dispose()
		  	})
	  	},
	  	selectHouse(){
	  		var that = this;

	  		picker = new mui.PopPicker(
		  		{buttons:['取消','确定']}
		  	);

			picker.setData(this.housePickerData);

			$('.mui-poppicker-btn-cancel').after('<span  class="pickerTitle">住房</span>')

	  		picker.show(function (selectItems) {
	  			that.house=selectItems[0]
	  			for(var i=0;i<that.housePickerData.length;i++){
	  				if(selectItems[0]==that.housePickerData[i]){
	  					that.houseNum=i+1;
	  					that.change=1
	  				}
	  			}

	  			picker.hide();
	  			picker.dispose()
		  	})
	  	},
	  	getRadioTb(){
	  		//获取 淘宝radio 值方法
	  		var tb=$('.tbId')
	  		for(var i=0;i<tb.length;i++){
		  		if(tb[i].checked){
		  			this.tbId=tb[i].value;
	  				this.change=1
		  		}
	  		}
	  	},
	  	getRadioJd(){
	  		//获取 京东radio 值方法
	  		var jd=$('.jdId')
	  		for(var i=0;i<jd.length;i++){
		  		if(jd[i].checked){
		  			this.jdId=jd[i].value;
	  				this.change=1
		  		}
	  		}
	  	},
	  	getRadioMarry(){
	  		//获取 婚姻状态radio 值方法
	  		var marry=$('.marriedRadio')
	  		for(var i=0;i<marry.length;i++){
		  		if(marry[i].checked){
		  			this.marry=marry[i].value;
	  				this.change=1
		  		}
	  		}
	  	},
	  	changed(){
	  		this.change=1
	  	},
	  	save(e){
	  		//执行获取 婚姻状态方法
	  		this.getRadioTb()
	  		this.getRadioJd()
	  		this.getRadioMarry()
			
			//点击提交按钮，判断消除picker
	        if($('body').children().is(".mui-poppicker")){
	         	picker.hide();
				picker.dispose()
	        }
			

	  		if(e.index==0){
	  			var that=this
	  			this.change++

	  			setTimeout(function(){
		  			that.$router.replace(that.path)
		  		},800)
	  		}
	  		else if(e.index == 1){
	  			//执行保存方法
	  			this.sendMsg();
	  			this.change++
	  		}
	  		else{
	  			this.sendMsg();
	  			this.change++
	  		}
	  	},
	  	sendMsg(){
	  		var that=this

	  		//提交数据方法
	  		if(this.name==''||this.idCard==''||this.zxNum==''||this.sbNum==''||this.gjjNum==''||this.houseNum==""){
	  			mui.toast("请填写全部内容")
	  		}
	  		else{
	  			this.$http.post('http://'+this.$store.state.urlIp+'api/user/docreditinfo',{token:this.form.token,name:this.name,card_id:this.idCard,
	  				house:this.houseNum,is_marry:this.marry,is_taobao:this.tbId,is_jd:this.jdId,shebao:this.sbNum,credit:this.zxNum,gongjijin:this.gjjNum}).then(response =>{
		      		if(response.body.status!=1){
			      		mui.toast(response.body.data)
		      		}
		      		else{
		      			mui.toast("提交成功")

		      			//提交成功则再次修改state内的用户信息数据
		      			this.$http.post('http://'+this.$store.state.urlIp+'api/user/creditinfo',{token:this.form.token}).then(response =>{
	  						this.form.userInfo=response.body.data

							this.USER_SIGNIN(this.form)

							setTimeout(function(){
					  			that.$router.replace(that.path)
					  		},800)

						   },response =>{
					    })


		      	}
		    		},response =>{
	    		})
	  		}
	  	}

	  },
	  components:{
	    'v-topBack' : topBack
	  },
	  beforeRouteLeave(to, from, next){
	  	this.path=to.path
	    // 导航离开该组件的对应路由时调用
	    //如果没有点击保存，则提示是否保存
	    //if的条件为检测数据是否修改，有修改，则提示保存，没修改则不保存
	    if(this.change==1){
	    	mui.confirm(
	    		'信用信息还没保存哦','提示',['放弃','保存'],this.save,'div'
	    	)
	    	next(false)
	    }
	    else{
	    	next()
	    }
	  },
	    destroyed(){
			if($('body').children().is(".mui-poppicker")){
	         	picker.hide();
				picker.dispose()
	        }
	    }
	}

</script>

<style>

@import url("../../../static/css/muiConfirm.css");

	#creditinfo{
		width: 100%;
		height: 100%;
		background: white;
	}
	#creditinfo .topBar{
		width: 100%;
		height: 1.2rem;
		background-color: #F5AB18;
	}
	#creditinfo .selectBar a{
		display:block;
		width: 30%;
		height: 1.2rem;
		margin: 0 1.666666666%;
		float: left;
	}
	#header{
	    -webkit-box-shadow: none;
	    box-shadow: none;
	}
	#creditinfo .wrap{
		width: 92%;
		margin: 0 auto;
		list-style: none;
	}
	#creditinfo .wrap li{
		width: 100%;
		height: 1.333333rem;
		border-bottom: 1px solid #dcdcdc;
		line-height: 1.333333rem;
		font-size: 0.4rem;
		color: #5c5c5c;
	}
	#creditinfo .wrap li .input{
		width: 70%;
		font-size:0.346666rem;
		text-align: right;
		float: right;
		border: none;
		outline: none;
		margin-top: 0.4rem;
		height: 0.65rem;
		line-height: 0.65rem;
		padding-right: 0;
	}
	#creditinfo .wrap .married .radioWrap{
		float: right;
		height: 1.333333rem;
	}
	#creditinfo .wrap .married .radioWrap div{
		line-height: 0.8;
		display: inline-block;
	}
	#creditinfo .wrap .married .marry_lable{
		padding: 0;
		margin-left: 0.8rem;
	}
	#creditinfo .wrap .selection .radioWrap{
	float: right;
	height: 1.333333rem;
	}
	#creditinfo .wrap .selection .radioWrap div{
		line-height: 0.8;
		display: inline-block;
	}
	#creditinfo .wrap .selection .xu_lable{
		padding: 0;
		margin-left: 0.8rem;
	}
	#creditinfo .saveWrap{
		width:100% ;
		height:2.3rem;
		background: white;
	}
	#creditinfo .save{
		width: 2.693333rem;
		height: 1.333333rem;
		background-color: #f5ab18;
		font-size: 0.4rem;
		line-height: 1.333333rem;
		text-align: center;
		color: white;
		border-radius: 0.2rem;
		margin: 0.666666rem auto;
	}
	</style>
