<template>
  <div style="height: 100%;">
    <div style="height:100%;overflow:hidden" v-if="key!=='/login'">
      <!-- header -->
    <header-inner />
    <el-container class="main">
      <el-aside width="220px" :class="classObject" class="main" v-if="showMainProjectSideBar">
        <side-bar />
      </el-aside>
      <el-main class="contentMain">
        <!-- <router-view /> -->
        <div id="appContainer"></div>
        <transition-group name="fade" mode="out-in">
          <router-view :key="key" />
        </transition-group>
        <el-backtop target=".contentMain" :bottom="20" />
      </el-main>
    </el-container>
    </div>
    <div v-else>
      <router-view :key="key" />
    </div>
  </div>
</template>

<script>
// import { getMoniorServer } from '@/api/dashboard'
import SideBar from './sideBar.vue'
import HeaderInner from '@/components/HeaderInner'
export default {
  name: 'MainPage',
  // components: { SideBar, HeaderInner },
  components:{HeaderInner,SideBar},
  data () {
    return {
      showIcon: false,
      msg: '',
      webSocket: {},
      checkTimer: null
    }
  },
  computed: {
    showMainProjectSideBar(){
      return ['dbs','project1'].indexOf(this.key.split('/')[1])==-1
    },
    key () {
      return this.$route.path
    },
    classObject: function () {
      return {
        'has-collapse': this.$store.state.isCollapse
      }
    }
  },
  created: function () {
    // this.getWebsocketUri()
  },
  destroyed () {
    clearInterval(this.checkTimer)
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

.el-aside.main {
  background-color: $menuBg;
  color: #fff;
  border-top: 1px solid #564d4d;
  box-sizing: border-box;
}

.el-container.main {
  height: 100%;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.has-collapse {
  width: 50px !important;
  overflow-x: hidden;
}

.has-collapse img {
  display: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.el-main.contentMain {
  position: relative;
  overflow-x: hidden;
  overflow-y: scroll;
  padding-bottom: 100px;

  .el-backtop:hover {
    background: $menuBg;
  }
}

.el-aside {
  transition: width 0.15s;
  -webkit-transition: width 0.15s;
  -moz-transition: width 0.15s;
  -webkit-transition: width 0.15s;
  -o-transition: width 0.15s;
}
.appContainer{
  font-size: 20px!important;
}
</style>
