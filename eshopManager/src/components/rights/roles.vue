<template>
  <el-card>
    <!-- 面包屑 -->

    <my-bread :breadArray="breadlist"></my-bread>
    <!-- 添加角色按钮 -->
    <el-row style="margin: 20px"
      ><el-button type="success" plain @click="AddRoleDialog()"
        >添加用户</el-button
      ></el-row
    >
    <!-- 角色列表 -->
    <el-table :data="rolelist" style="width: 100%; height: 50%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <div v-if="props.row.children.length > 0">
            <el-row v-for="(item1, i) in props.row.children" :key="i">
              <!-- 第一层 -->
              <el-col :span="4">
                <el-tag closable @close="handleClose(props.row, item1.id)">
                  {{ item1.authName }}</el-tag
                ><i class="el-icon-arrow-right"></i
              ></el-col>
              <el-col :span="20">
                <el-row v-for="(item2, m) in item1.children" :key="m"
                  ><el-col :span="4"
                    ><el-tag
                      type="success"
                      closable
                      @close="handleClose(props.row, item2.id)"
                      >{{ item2.authName }}</el-tag
                    ><i class="el-icon-arrow-right"></i></el-col
                  ><el-col :span="20"
                    ><el-tag
                      type="warning"
                      closable
                      v-for="(item3, n) in item2.children"
                      :key="n"
                      @close="handleClose(props.row, item3.id)"
                    >
                      {{ item3.authName }}</el-tag
                    ></el-col
                  ></el-row
                >
              </el-col>
            </el-row>
          </div>
          <div v-else>无权限</div>
        </template>
      </el-table-column>
      <el-table-column label="#" type="index"> </el-table-column>
      <el-table-column label="角色名称" prop="roleName"> </el-table-column>
      <el-table-column label="角色描述" prop="roleDesc"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            plain
            type="primary"
            size="mini"
            icon="el-icon-edit"
            circle
            v-bind="scope.row"
            @click="editUserDialog(scope.row.id)"
          ></el-button>
          <el-button
            plain
            size="mini"
            type="danger"
            icon="el-icon-delete"
            circle
            v-bind="scope.row"
            @click="delUserdig(scope.row.id)"
          ></el-button>
          <el-button
            plain
            size="mini"
            type="success"
            icon="el-icon-check"
            circle
            v-bind="scope.row"
            @click="istribution_role(scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      breadlist: [
        { name: "首页", address: "/" },
        { name: "权限管理", address: "/rights" },
        { name: "角色管理", address: "/role" },
      ],
      rolelist: [],
    };
  },
  created() {
    this.getRolelist();
  },
  methods: {
    async getRolelist() {
      const res = await this.$http.get("roles");
      //console.log(res);
      this.rolelist = res.data.data;
      //console.log(this.rolelist);
    },
    async handleClose(role, rightid) {
      //console.log(item, item.children[n]);
      const res = await this.$http.delete(`roles/${role.id}/rights/${rightid}`);
      if (res.data.meta.status === 200) {
        //重新赋值权限数据，则自动刷新
        role.children = res.data.data;
        this.$message.success(res.data.meta.msg);
      } else {
        this.$message.error(res.data.meta.msg);
      }
      //console.log(res);
      //item.children.splice(n, 1);
    },
  },
};
</script>

<style scoped>
</style>