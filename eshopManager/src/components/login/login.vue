<template>
  <div class="login-wrap">
    <el-form
      class="login-form"
      label-position="top"
      label-width="80px"
      :model="formdata"
    >
      <h2>用户登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="formdata.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input
          placeholder="请输入密码"
          v-model="formdata.password"
        ></el-input>
      </el-form-item>
      <el-button class="login-btn" type="primary" @click="handlelogin()"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formdata: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    async handlelogin() {
      try {
        const res = await this.$http.post("login", this.formdata);
        // 1.登录成成功：提示成功，并跳转首页
        // 2.登录失败：提示失败提示
        const {
          data,
          meta: { msg, status },
        } = res.data;
        //console.log(data, status);
        if (status === 200) {
          localStorage.setItem("token", data.token);
          this.$message({
            message: "登录成功",
            type: "success",
          });
          //跳转首页
          this.$router.push({ name: "home" });
        } else {
          this.$message.error("登录错误，请重试");
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
.login-wrap {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #324152;
}
.login-wrap .login-form {
  width: 400px;
  background-color: #fff;
  border-radius: 5px;
  padding: 30px;
}
.login-wrap .login-btn {
  width: 100%;
}
</style>