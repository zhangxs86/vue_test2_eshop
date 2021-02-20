<template>
  <el-card class="box-card">
    <!-- 面包屑 -->

    <my-bread :breadArray="breadlist"></my-bread>
    <!-- 表格 -->
    <el-table :data="rightlist" style="width: 100% height:50%">
      <el-table-column label="#" type="index"> </el-table-column>
      <el-table-column prop="authName" label="权限"> </el-table-column>
      <el-table-column prop="path" label="路径"> </el-table-column>
      <el-table-column label="层级">
        <template slot-scope="scope">
          {{ scope.row.level | levelfilter }}
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 不能挂在数据-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[5, 10, 20, 30]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </el-card>
</template>

<script>
import myBread from "../cuscom/myBread.vue";
export default {
  created() {
    this.getRightsList();
  },
  data() {
    return {
      breadlist: [
        { name: "首页", address: "/" },
        { name: "权限管理", address: "/rights" },
        { name: "角色管理", address: "/role" },
      ],
      rightlist: [],
      // form: { authName: "", path: "", level: "" },
      pagenum: 1,
      pagesize: 5,
      total: 48,
    };
  },
  components: { myBread },
  methods: {
    async getRightsList() {
      const res = await this.$http.get("rights/list");
      this.rightlist = res.data.data;
      this.total = this.rightlist.length;
      console.log(res);
      console.log(this.total);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagesize = val;
      this.pagenum = 1;
      this.getRightsList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagenum = val;
      this.getRightsList();
    },
  },
};
</script>

<style  scoped>
.box-card {
  height: 100%;
}
</style>