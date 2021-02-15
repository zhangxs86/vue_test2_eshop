<template>
  <el-card class="box-card">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框  el的分栏间隔插件-->
    <el-row :gutter="15" class="search-row">
      <el-col :span="8"
        ><el-input v-model="query" placeholder="请输入内容"></el-input>
      </el-col>
      <el-col :span="1"
        ><el-button icon="el-icon-search" circle></el-button
      ></el-col>
      <el-col :span="3">
        <el-button type="success" plain>添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 表格 详见e-ui表格属性介绍-->
    <!-- 列属性index,anshuju顺序自动计数 -->
    <el-table :data="userlist" style="width: 100%; height: 50%">
      <el-table-column label="#" type="index"> </el-table-column>
      <el-table-column prop="username" label="姓名"> </el-table-column>
      <el-table-column prop="email" label="邮箱"> </el-table-column>
      <el-table-column prop="mobile" label="电话"> </el-table-column>

      <el-table-column label="创建日期">
        <!-- 如果但与格内显示的内容不是字符串，则需要给被现实的内容外层包裹一层template标签   -->
        <template slot-scope="scope">
          {{ scope.row.create_time | fmdate }}
        </template>
      </el-table-column>
      <el-table-column prop="mg_state" label="用户状态">
        <el-switch
          v-model="user_status"
          active-color="#13ce66"
          inactive-color="#ff4949"
        >
        </el-switch>
      </el-table-column>
      <el-table-column label="操作">
        <el-button type="primary" icon="el-icon-edit" circle></el-button>
        <el-button type="danger" icon="el-icon-delete" circle></el-button>
        <el-button type="success" icon="el-icon-check" circle></el-button>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      query: "",
      pagenum: 1,
      pagesize: 4,
      user_status: "",
      userlist: [],
      total: -1,
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    async getUserList() {
      // 需要授权的 API ，必须在请求头中使用 `Authorization` 字段提供 `token` 令牌
      //在axios插件中设置默认的请求头
      // 如果字符串中有模板属性则需要用  ` $() `，不能用常规的引号
      const res = await this.$http.get(
        `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`
      );
      console.log(res);
      const {
        meta: { status, msg },
        data: { users, total },
      } = res.data;
      if (status === 200) {
        this.userlist = users;
        this.total = total;
        this.$message.success(msg);
      } else {
        this.$message.warning(msg);
      }
    },
  },
};
</script>

<style>
.search-row {
  margin-top: 30px;
}
.box-card {
  height: 100%;
}
</style>