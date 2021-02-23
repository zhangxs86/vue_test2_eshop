<template>
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="4"
          ><div class="grid-content bg-purple">
            <img src="@/assets/logo.jpg" alt="" /></div
        ></el-col>
        <el-col :span="18" class="middle"><h3>电商后台管理系统</h3></el-col>
        <el-col :span="2"
          ><div class="grid-content bg-purple">
            <a class="logout" @click="loginout()" href="#">退出</a>
          </div></el-col
        >
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="aside" width="200px">
        <!-- 开启路由模式 -->
        <el-menu :unique-opened="true" :router="true">
          <!-- 1 -->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span> 用户管理</span>
            </template>
            <el-menu-item index="/home/users">
              <i class="el-icon-location"></i>
              <span>用户列表</span>
            </el-menu-item>
          </el-submenu>
          <!-- 2 -->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="/home/roles">
              <i class="el-icon-user"></i>
              <span>角色列表</span>
            </el-menu-item>
            <el-menu-item index="/home/rights">
              <i class="el-icon-s-check"></i>
              <span>权限列表</span>
            </el-menu-item>
          </el-submenu>
          <!-- 3 -->
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-s-goods"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="3-1">
              <i class="el-icon-bangzhu"></i>
              <span>分类参数</span>
            </el-menu-item>
            <el-menu-item index="3-1">
              <i class="el-icon-collection"></i>
              <span>商品分类</span>
            </el-menu-item>
          </el-submenu>
          <!-- 4 -->
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-s-order"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="4-1">
              <i class="el-icon-shopping-bag-1"></i>
              <span>订单列表</span>
            </el-menu-item>
          </el-submenu>
          <!-- 5 -->
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-s-data"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index="5-1">
              <i class="el-icon-set-up"></i>
              <span>数据报表</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  //获取token,if toekn有-》继续渲染组件，否则-跳到登录
  //newVue之前自动触发，渲染完生命周期是mounted
  beforeCreate() {
    const token = localStorage.getItem("token");
    if (!token) {
      this.$router.push({ name: "login" });
    }
  },
  methods: {
    loginout() {
      console.log("!!!");
      //localStorage.removeItem("token");
      localStorage.clear();
      this.$message("退出成功");
      this.$router.push({ name: "login" });
    },
  },
};
</script>

<style scoped>
.container {
  height: 100%;
}
.header {
  background-color: #b3c0d1;
}
.aside {
  background-color: #d3dce6;
}
.main {
  background-color: #e9eef3;
  height: 100%;
}
.logout {
  text-decoration: none;
  line-height: 60px;
}
.middle {
  text-align: center;
}
</style>>

