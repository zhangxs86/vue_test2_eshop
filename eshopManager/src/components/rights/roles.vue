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
            @click="showrightdig(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 修改权限 -->
    <el-dialog title="修改权限" :visible.sync="rightFormVisibleEdit">
      <!-- 树形结构
      data->数据源[]
      show-checkbox-》选择框
      node-key-》没一个节点的唯一表示，通常是data数据源的key名的id
      default-check-keys【要选择的节点id】数组中包含
      props 配置项{label，children}
      label节点的文字标题，children是数据中的key名 -->

      <el-tree
        :data="rights"
        show-checkbox
        default-expand-all
        node-key="id"
        ref="tree"
        highlight-current
        :default-checked-keys="arrcheck"
        :props="defaultProps"
      >
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="rightFormVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="rights_fix()">确 定</el-button>
      </div>
    </el-dialog>
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
      rightFormVisibleEdit: false,
      temp_rowid: "",
      arrcheck: [],
      rights: [],
      defaultProps: {
        children: "children",
        label: "authName",
      },
    };
  },
  created() {
    this.getRolelist();
  },
  methods: {
    async getRolelist() {
      const res = await this.$http.get("roles");
      console.log(res);
      this.rolelist = res.data.data;
      //console.log(this.rolelist);
    },
    async getRightstree() {
      const res = await this.$http.get("rights/tree");
      this.rights = res.data.data;

      console.log(res);
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
    showrightdig(role) {
      this.getRightstree();
      this.rightFormVisibleEdit = true;
      //保存此时的roleid
      this.temp_rowid = role.id;
      let arrtemp = [];
      // 树形结构数据填充
      role.children.forEach((item) => {
        arrtemp.push(item.id);
        item.children.forEach((item1) => {
          arrtemp.push(item1.id);
          item1.children.forEach((item2) => {
            arrtemp.push(item2.id);
          });
        });
      });
      this.arrcheck = arrtemp;
    },
    async rights_fix() {
      // 获取当前角色的id，
      // 树形节点中，所有选中的label的id
      // 获取全选id数组arr1 getcheckedkeys()和半选id数组 arr2 gethalfcheckedkeys();

      // 给要操作的标签添加ref属性，然后利用$refs引用对象了
      const arrykey1 = this.$refs.tree.getCheckedKeys();
      const arrykey2 = this.$refs.tree.getHalfCheckedKeys();
      const arrykey = [...arrykey1, ...arrykey2];
      // console.log(arrykey1);
      // console.log(arrykey2);
      console.log(arrykey);
      const res = await this.$http.post(`roles/${this.temp_rowid}/rights`, {
        rids: arrykey.join(","),
      });
      this.rightFormVisibleEdit = false;
      this.getRolelist();
      console.log(res);
    },
  },
};
</script>

<style scoped>
</style>