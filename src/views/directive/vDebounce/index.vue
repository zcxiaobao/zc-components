<template>
    <el-card class="item">
        <el-descriptions title="click事件" direction="vertical" :column="4" border>
            <template #extra>
                <el-button type="success" size="large" v-debounce="{ 'delay': 300, 'cb': clickCb }">
                    click 事件防抖
                </el-button>
            </template>
            <el-descriptions-item label="eventType">click</el-descriptions-item>
            <el-descriptions-item label="delay">300</el-descriptions-item>
            <el-descriptions-item label="cb">每隔300s触发</el-descriptions-item>
            <el-descriptions-item label="isImmediate">false</el-descriptions-item>
        </el-descriptions>
    </el-card>


    <el-card class="item">
        <el-descriptions title="keyup事件" direction="vertical" :column="4" border>
            <template #extra>
                <el-input v-debounce="{ 'delay': 300, 'cb': inputCb, event: 'keyup', isImmediate: true }" v-model="val"
                    placeholder="请输入内容进行测试吧" />
            </template>
            <el-descriptions-item label="eventType">keyup</el-descriptions-item>
            <el-descriptions-item label="delay">300</el-descriptions-item>
            <el-descriptions-item label="cb">每隔300s触发</el-descriptions-item>
            <el-descriptions-item label="isImmediate">true</el-descriptions-item>
        </el-descriptions>
    </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const clickCb = () => {
    console.log('click事件触发')
}

const inputCb = () => {
    console.log(val.value);
}

let val = ref('')
</script>

<style scoped>
.item {

    margin-bottom: 20px;
}
</style>