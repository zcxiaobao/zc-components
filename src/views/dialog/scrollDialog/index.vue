<template>
    <el-button @click="dialogVisible = true">打开对话框</el-button>
    <zc-dialog v-model="dialogVisible" :isScroll="isScroll">
        <template #header>
            <div>可滚动式对话框</div>
        </template>
        <template #footer>
            <el-button @click="dialogVisible = false">确定</el-button>
        </template>
        <p>n</p>
        <p>n</p>
        <p>n</p>
        <p>n</p>
        <p>n</p>
        <p>n</p>
        <p>n</p>
        <p>n</p>
        <p>n</p>
        <p>n</p>
        <p>n</p>
        <p>n</p>
        <p>n</p>
        <p>n</p>
        <p>n</p>
        <p>n</p>
        <p>n</p>
        <p>n</p>
        <p>n</p>
        <p>n</p>
        <p>n</p>
        <p>n</p>
        <p>n</p>
        <p>n</p>
        <p>n</p>
        <p>n</p>
        <p>n</p>
        <p>n</p>
        <p>n</p>
        <p>n</p>
    </zc-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';

let dialogVisible = ref<boolean>(true)
let isScroll = ref<boolean>(true)
</script>

<style scoped></style>