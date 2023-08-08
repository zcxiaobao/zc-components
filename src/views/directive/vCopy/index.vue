<template>
    <el-input v-model="copy" placeholder="待复制内容" class="input-with-select">
        <template #append>
            <el-button v-copy="copy">复制</el-button>
        </template>
    </el-input>
</template>

<script setup lang="ts">
import { ref } from 'vue';

let copy = ref('')
</script>

<style scoped></style>