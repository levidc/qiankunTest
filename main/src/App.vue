<template>
  <div id="app">
    <header>
      <router-link to="/app-vue-history/">app-vue-history</router-link>
      <router-link to="/app-vue-vite/">app-vue-vite</router-link>
      <router-link to="/about">about</router-link>
      <router-link to="/">退出</router-link>
      <span @click="changeParentState">主项目的数据：{{ commonData.parent }}，点击变回1</span>
    </header>
    <div id="appContainer"></div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  computed: {
    commonData(){
      return this.$store.state.commonData;
    }
  },
  methods: {
    changeParentState(){
      this.$store.commit('setCommonData',{ parent: 1 });
    }
  },
}
</script>

<style scoped>
#app{
  height: 100vh;
  text-align: center;
  position: relative;
}
header>a{
  margin: 0 20px;
}
.appContainer{
  background: #ccc;
  padding: 20px;
}
</style>
