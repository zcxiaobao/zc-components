<template>
    <el-button @click="dialogVisible = true">打开对话框</el-button>
    <zc-dialog v-model="dialogVisible" v-draggable>
        dialog
    </zc-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';

let dialogVisible = ref<boolean>(true)
</script>

<style scoped></style>