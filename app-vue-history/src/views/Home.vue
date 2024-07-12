<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <!-- <span>{{userName}}</span> -->
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { login } from '../api';
export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data(){
    return{
    }
  },
  computed:{
    userName(){
      return this.$store.state.mainPage.userData.userName
    }
  },
  mounted(){
    console.log(window.__POWERED_BY_QIANKUN__,'333')
    login({
        userName: 'superAdmin',
        password: 'superAdmin123!'
      }).then(res=>{
        console.log(res,'123')
    })
  }
}
</script>
