<template>
  <el-menu
    id="sider_nav"
    :collapse-transition="false"
    unique-opened
    :default-active="currentPath"
    router
  >
    <el-submenu index="resourceManagement">
      <template slot="title">
        <svg
          class="icon"
          aria-hidden="true"
        >
          <use xlink:href="#icon-resourceManagement" />
        </svg>
        <span>资源管理</span>
      </template>
      <el-menu-item index="/main/resourceManagement/NAS">
        <span>NAS资源</span>
      </el-menu-item>
      <el-menu-item index="/main/resourceManagement/ES">
        ES资源
      </el-menu-item>
      <el-menu-item index="/main/resourceManagement/BigData">
        大数据资源
      </el-menu-item>
      <el-menu-item index="/main/resourceManagement/Glacier">
        冰存储资源
      </el-menu-item>
      <el-menu-item index="/main/resourceManagement/Database">
        数据库资源
      </el-menu-item>
    </el-submenu>
    <el-menu-item index="/main/taskManagement">
      <svg
        class="icon"
        aria-hidden="true"
      >
        <use xlink:href="#icon-task" />
      </svg>
      <span slot="title">归档管理</span>
    </el-menu-item>
    <el-menu-item index="/main/removeManagement">
      <svg
        class="icon"
        aria-hidden="true"
      >
        <use xlink:href="#icon-huiqian" />
      </svg>
      <span slot="title">回迁管理</span>
    </el-menu-item>
    <el-submenu index="systemManagement">
      <template slot="title">
        <svg
          class="icon"
          aria-hidden="true"
        >
          <use xlink:href="#icon-xitong" />
        </svg>
        <span>系统管理</span>
      </template>
      <el-menu-item index="/main/systemManagement/operationLog">
        操作日志
      </el-menu-item>
      <!-- <el-submenu index="client">
        <template slot="title">客户端</template>
        <el-menu-item index="/main/systemManagement/client/clientNas">
          NAS客户端
        </el-menu-item>
        <el-menu-item index="/main/systemManagement/client/clientES">
          ES客户端
        </el-menu-item>
        <el-menu-item index="/main/systemManagement/client/clientBigData">
          大数据客户端
        </el-menu-item>
      </el-submenu> -->
    </el-submenu>
    <el-submenu index="User">
      <template slot="title">
        <svg
          class="icon"
          aria-hidden="true"
        >
          <use xlink:href="#icon-user" />
        </svg>
        <span>用户</span>
      </template>
      <el-menu-item index="/main/user/users">
        用户管理
      </el-menu-item>
      <!-- <el-menu-item index="/main/user/group">
        用户组
      </el-menu-item> -->
    </el-submenu>

  </el-menu>
</template>
<script>
export default {
name: '',
props: {},
components: {},
data() {
return {
  currentPath:''
};
},
computed: {},
watch: {},
methods: {},
created() {},
mounted() {
  this.currentPath = this.$route.path
}
};
</script>
<style lang="scss">
.el-menu {
  background-color: $menuBg !important;
  .el-submenu__title {
    display: flex;
    align-items: center;
    .el-submenu__icon-arrow.el-icon-arrow-down {
      color: $activeText;
    }
  }
  .el-menu-item {
    display: flex;
    align-items: center;
  }
}
.is-opened {
  background-color: $menuBg !important;
}
.el-menu--vertical .el-menu-item:hover {
  background-color: $menuHover;
}

#sider_nav {
  border-style: none;
  overflow: hidden;
}

#sider_nav .el-menu--inline > .el-menu-item {
  padding-left: 51px !important;
}

// hover 菜单
#sider_nav .el-menu-item:focus,
#sider_nav .el-menu-item:hover,
#sider_nav .el-submenu__title:hover {
  background-color: $menuHover;
}

// 菜单激活文字、hover、
#sider_nav .el-menu-item.is-active {
  background-color: $menuBg;
  color: $activeText;
}

// 收缩菜单 右侧弹窗
.el-menu--popup {
  -webkit-box-shadow: 0 2px 12px 0 #18213c !important;
  box-shadow: 0 2px 12px 0 #18213c !important;
}

.icon {
  color: #fff;
  font-size: 18px;
  & + span {
    margin-left: 10px;
  }
}
</style>
