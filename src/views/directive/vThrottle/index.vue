<template>
    <el-card class="item">
        <el-descriptions title="keyup事件节流" direction="vertical" :column="3" border>
            <template #extra>
                <el-input v-throttle="{ 'delay': 300, 'cb': inputCb, event: 'keyup', isImmediate: true }" v-model="val"
                    placeholder="请输入内容进行测试吧" />
            </template>
            <el-descriptions-item label="eventType">keyup</el-descriptions-item>
            <el-descriptions-item label="delay">300</el-descriptions-item>
            <el-descriptions-item label="cb">300s内触发一次</el-descriptions-item>
        </el-descriptions>
    </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const inputCb = () => {
    console.log(val.value);
}

let val = ref('')
</script>

<style scoped></style>