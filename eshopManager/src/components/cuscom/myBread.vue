<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item> -->
    <el-breadcrumb-item v-for="(item, i) in breadArray" :key="i"
      ><router-link :to="item.address">{{
        item.name
      }}</router-link></el-breadcrumb-item
    >
  </el-breadcrumb>
</template>

<script>
export default {
  name: "my-bread",
  props: {
    breadArray: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {};
  },
};
</script>

<style  scoped>
</style>