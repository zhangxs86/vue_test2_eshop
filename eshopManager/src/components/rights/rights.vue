<template>
  <el-card>
    <!-- 面包屑 -->

    <my-bread :breadArray="breadlist"></my-bread>
    <!-- 表格 -->
    <el-table
      :data="rightlist"
      height="700px"
      style="width: 100%; height: 100%; margin: 20px"
    >
      <el-table-column label="#" type="index"> </el-table-column>
      <el-table-column prop="authName" label="权限"> </el-table-column>
      <el-table-column prop="path" label="路径"> </el-table-column>
      <el-table-column label="层级">
        <template slot-scope="scope">
          {{ scope.row.level | levelfilter }}
        </template>
      </el-table-column>
    </el-table>
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
        { name: "权限列表", address: "/rights" },
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
  },
};
</script>

<style  scoped>
</style>