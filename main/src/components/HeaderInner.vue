<template>
  <header>
    <div class="logo">Logo</div>
    <div class="projectInfo">
      <a v-for="item in projects" :key="item.path" @click="switchProjects(item)">{{ item.name }}</a>
      <!-- <router-link to="/app-vue-history/"></router-link>
      <router-link to="/app-vue-vite/">project Ⅱ</router-link>
      <router-link to="/about">融合项目介绍</router-link> -->
      <!-- <router-link to="/">退出</router-link> -->
      <span @click="changeParentState">主项目的数据：{{ commonData.parent }}，点击变回1</span>
    </div>
    <div class="userInfo">
      <div class="header-right">
      <!-- <i :class="[$store.state.isCollapse ? 'el-icon-s-fold' : 'el-icon-s-unfold']" @click="toggles()" /> -->
        <el-dropdown @command="handleCommand">
          <div id="login-user" class="el-dropdown-link">
            <i class="el-icon-user" />
            <span id="currentAccountName">{{ currnentAccount }}</span>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="two"><i class="el-icon-switch-button" />
              {{ $trans('header.user.logout')
              }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
    </div>
    </div>
  </header>
</template>
<script>
export default{
  name:'',
  data(){
    return {
      projects: [
        {
          name:'主应用',
          path:'/about',
          notReload:true,
        },
        {
          name:'project I',
          path:'/project1'
        },
        {
          name:'project Ⅱ',
          path:'/dbs'
        },
      ]
    }
  },
  watch:{
    // '$store.state.userInfo'(val){
    //   console.log(val,'123')
    // }
  },
  computed: {
    commonData(){
      return this.$store.state.commonData;
    },
    currnentAccount(){
      return this.$store.state.userData&&this.$store.state.userData.userName || ''
    }
  },
  methods: {
    changeParentState(){
      this.$store.commit('setCommonData',{ parent: 1 });
    },
    handleCommand () {
      this.$store.commit('setUserData',null)
     localStorage.setItem('userInfo',null)
      this.$router.push({name:'Login'})
      // this.logout()
    },
    switchProjects(item){
      this.$router.push({path:item.path})
      if(item.notReload!==true){
        window.location.reload()
      }
    }
  },
}
</script>
<style lang="scss" scoped>

header{
  padding: 12px 0;
  background-color: $headerBg;
  // background-color: #fff;
  display: flex;
  justify-content: space-between;
  .logo{
    width: 220px;
    text-align: center;
    color: crimson;
    font-size: 20px;
    font-weight: bold;
    // background-color: chocolate;
  }
  .projectInfo{
    position: absolute;
    left: 220px;
    a,span{
      border-right: 1px solid #ccc;
      padding: 0 30px;
      font-size: 22px;
      color: #d3d6d8;
    }
  }
  .userInfo{
    width: 120px;
    display: flex;
    justify-content: space-between;
    #currentAccountName,i{
      cursor: pointer;
      color: $activeText;
      margin-left: 5px;
    }
  }
}

// 0 2px 3px 0 rgba(0,0,0,.2)
h1{
  color: green;
}
</style>
