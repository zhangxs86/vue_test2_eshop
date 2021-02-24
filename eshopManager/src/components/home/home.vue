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
          <el-submenu index="1" v-for="(items, index) in menus" :key="index">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ items.authName }} </span>
            </template>
            <el-menu-item
              v-for="(item2, index) in items.children"
              :key="index"
              :index="'/home/' + item2.path"
            >
              <i class="el-icon-location"></i>
              <span>{{ item2.authName }}</span>
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
  data() {
    return { menus: [] };
  },
  //获取token,if toekn有-》继续渲染组件，否则-跳到登录
  //newVue之前自动触发，渲染完生命周期是mounted
  beforeCreate() {
    const token = localStorage.getItem("token");
    if (!token) {
      this.$router.push({ name: "login" });
    }
  },
  created() {
    this.getMnues();
  },
  methods: {
    async getMnues() {
      const res = await this.$http.get("menus");

      this.menus = res.data.data;
      console.log(this.menus);
    },
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

