<template>
  <div>
    <keep-alive>
      <v-tab1 v-if="acitves == 0"></v-tab1>
      <v-tab2 v-if="acitves == 1"></v-tab2>
      <v-tab3 v-if="acitves == 2"></v-tab3>
      <v-tab4 v-if="acitves == 3"></v-tab4>
      <v-tab5 v-if="acitves == 4"></v-tab5>
      <v-tab6 v-if="acitves == 5"></v-tab6>
    </keep-alive>
  </div>

</template>

<script type="text/ecmascript-6">
  import Teb1 from '../product/userMents1.vue'
  import Teb2 from '../product/userMents2.vue'
  import Teb3 from '../product/userMents3.vue'
  import Teb4 from '../product/userMents4.vue'
  import Teb5 from '../product/userMents5.vue'
  import Teb6 from '../product/userMents6.vue'


  export default {
    name: 'userMents',
    data () {
      return {
        id : this.$route.params.id,
        p : this.$route.params.p
      }
    },
    props: {
      acitves : ''
    },
    created(){
      console.log(this.acitves)
    },
    mounted(){

    },
    methods:{

    },
    components:{
      'v-tab1' : Teb1,
      'v-tab2' : Teb2,
      'v-tab3' : Teb3,
      'v-tab4' : Teb4,
      'v-tab5' : Teb5,
      'v-tab6' : Teb6,
    }
  }
</script>


<style lang="stylus" rel="stylesheet/stylus">
</style>
