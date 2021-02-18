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
        ><el-input
          v-model="query"
          placeholder="请输入内容"
          clearable
          @clear="cleardata()"
        ></el-input>
      </el-col>
      <el-col :span="1"
        ><el-button
          @click="searchUser()"
          icon="el-icon-search"
          circle
        ></el-button
      ></el-col>
      <el-col :span="3">
        <el-button type="success" plain @click="AddUserDialog()"
          >添加用户</el-button
        >
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
      <el-table-column label="用户状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            plain
            type="primary"
            size="mini"
            icon="el-icon-edit"
            circle
            v-bind="scope.row"
          ></el-button>

          <el-button
            plain
            size="mini"
            type="danger"
            icon="el-icon-delete"
            circle
            v-bind="scope.row"
          ></el-button>
          <el-button
            plain
            size="mini"
            type="success"
            icon="el-icon-check"
            circle
            v-bind="scope.row"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="2"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>

    <!-- 添加对话框 默认隐藏 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="100px">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="100px">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100px">
          <el-input v-model="form.emial" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="100px">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="Adduser_cancle()">取 消</el-button>
        <el-button type="primary" @click="Adduser_fix()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      query: "",
      pagenum: 1,
      pagesize: 2,
      user_status: "",
      userlist: [],
      total: -1,
      dialogFormVisibleAdd: false,
      form: { username: "", password: "", email: "", mobile: "" },
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    Adduser_fix() {
      this.AddUser();
      Object.keys(this.form).forEach((key) => (this.form[key] = ""));
    },
    Adduser_cancle() {
      Object.keys(this.form).forEach((key) => (this.form[key] = ""));
      this.dialogFormVisibleAdd = false;
    },
    AddUserDialog() {
      this.dialogFormVisibleAdd = true;
    },
    searchUser() {
      this.getUserList();
    },
    cleardata() {
      //this.query = "";
      this.getUserList();
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagesize = val;
      this.pagenum = 1;
      this.getUserList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagenum = val;
      this.getUserList();
    },
    async getUserList() {
      // 需要授权的 API ，必须在请求头中使用 `Authorization` 字段提供 `token` 令牌
      //在axios插件中设置默认的请求头
      // 如果字符串中有模板属性则需要用  ` $() `，不能用常规的引号
      try {
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
      } catch (err) {
        console.log(err);
      }
    },
    async AddUser() {
      try {
        const res = await this.$http.post("users", this.form);
        console.log(res);
        const {
          meta: { status, msg },
        } = res.data;
        if (status === 201) {
          this.$message.success(msg);
          this.dialogFormVisibleAdd = false;
        } else if (status === 400) {
          this.$message.warning(msg);
        } else {
          this.$message.warning(msg);
        }
      } catch (err) {
        console.log(err);
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