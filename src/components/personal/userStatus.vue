<template>
  <div id="userStatus">
    <div class="topBar">
      <v-topBack :rightShow="false" :leftShow="true" :textName="textName"></v-topBack>
    </div>
    <ul class="wrap">
      <li class="clearFix">用户名称  <input type="text" name="idCard" id="idCard" placeholder="请输入" class="input" v-model="user_nicename"/></li>
      <li class="clearFix">职业   <div class="input" @click="selectHouse">{{ msg }}&nbsp;&nbsp;&nbsp;</div> </li>
    </ul>
    <div class="xu_save" @click='save'>保存</div>
  </div>

</template>

<script>
  import topBack from '../common/topBack.vue'

  var picker;
  export default {
    name: 'userStatus',
    data () {
      return {
        textName : '用户身份',
        title : '职业',
        user_nicename: this.$store.state.user.user_nicename,
        msg : '请选择',
        pickerData:['自由职业','生意人','上班族','学生党'],
        job:'',
        token1 :this.$store.state.user.token  //读取本地储存的token
      }
    },

    created(){
      console.log(this.user_nicename)


      this.job=this.$store.state.user.msg||0
      this.msg=this.pickerData[this.job]||"请选择"



    },

    components:{
      'v-topBack' : topBack
    },
    methods:{
      addTitle(){
        $('.mui-poppicker-btn-cancel').after('<span class="pickerTitle">'+ this.title +'</span>')
      },
      selectHouse(){

        var that = this;
        picker = new mui.PopPicker(
	        {buttons:['取消','确定']}
	      );
	      picker.setData(this.pickerData);
	      this.addTitle()

        picker.show(function (selectItems) {
          that.msg=selectItems[0]
          for(var i=0;i<that.pickerData.length;i++){
            if(selectItems[0]==that.pickerData[i]){
              that.job=i+1;

              picker.hide();
      				picker.dispose()

            }
          }
        })
      },
      save(){
        if(this.user_nicename==''||this.msg==''){
          mui.toast("提交内容不得为空")
        }
        else{
          this.$http.post('http://'+this.$store.state.urlIp+'api/user/identity',{token:this.token1,user_nicename:this.user_nicename,job:this.job}).then(response =>{
              console.log(response)
            if(response.body.state=="success"){
              mui.toast("提交成功")
            }
            else{
              mui.toast(response.body.data)
            }
          },response =>{
          })
        }
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
  #userStatus{
    width: 100%;
    height: 100%;
    background: white;
  }
  #userStatus .topBar{
    width: 100%;
    height: 1.2rem;
    background-color: #F5AB18;
  }
  #header{
    -webkit-box-shadow: none;
    box-shadow: none;
  }
  #userStatus .wrap{
    width: 92%;
    margin: 0 auto;
    list-style: none;
  }
  #userStatus .wrap li{
    width: 100%;
    height: 1.333333rem;
    border-bottom: 1px solid #dcdcdc;
    line-height: 1.333333rem;
    font-size: 0.4rem;
    color: #5c5c5c;
  }
  #userStatus .wrap li .input{
    width: 70%;
    font-size:0.346666rem;
    text-align: right;
    float: right;
    border: none;
    outline: none;
    margin-top: 0.4rem;
    height: 0.533333rem;
    line-height: 0.533333rem;
  }
  #userStatus .wrap .married .radioWrap{
    float: right;
    height: 1.333333rem;
  }
  #userStatus .wrap .married .radioWrap div{
    line-height: 0.8;
    display: inline-block;
  }
  #userStatus .wrap .married .xu_lable{
    padding: 0;
    margin-left: 0.8rem;
  }
  #userStatus .xu_save{
    width: 100%;
    height: 1.333333rem;
    text-align: center;
    line-height: 1.333333rem;
    color: white;
    background-color: #fa7a2d;
    font-size: 0.533333rem;
    position: fixed;
    bottom: 0;
    left: 0;
  }
</style>
