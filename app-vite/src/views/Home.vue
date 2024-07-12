<template>
  <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
  <HelloWorld msg="Vue.js Demo"> </HelloWorld>
</template>

<script>
import HelloWorld from '../components/HelloWorld.vue';
import { login } from '../api/index.js'
export default {
  name: 'App',
  components: {
    HelloWorld,
  },
  mounted(){
    console.log(123)
    login({
        userName: 'superAdmin',
        password: 'superAdmin123!'
      }).then(res=>{
        console.log(res,'123')
    })
  }
};
</script>
