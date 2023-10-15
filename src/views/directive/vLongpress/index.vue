<template>
  <el-button v-longpress="{ cb: longpressCb, params: { a: 1, b: 2 } }"
    >长按2s后触发</el-button
  >
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
const longpressCb = function (params: any) {
  ElMessage.success("事件触发，内容为: " + JSON.stringify(params));
};
</script>

<style scoped></style>
