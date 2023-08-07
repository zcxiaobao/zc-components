<template>
    <el-button @click="dialogVisible = true">打开可拖拽对话框</el-button>
    <zc-dialog v-model="dialogVisible" :isDrag="true">
        dialog
    </zc-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';

let dialogVisible = ref<boolean>(false)
</script>

<style scoped></style>