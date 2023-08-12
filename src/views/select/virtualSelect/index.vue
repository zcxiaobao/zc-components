<template>
    <zc-vit-select :data="data" v-model="selectVal">
        <template #default="item">
            <span>{{ item.label }}</span>
            <!-- <div v-if="item.label.includes('1')">测试不定长</div> -->
        </template>
    </zc-vit-select>

    <zc-vit-select :data="data" v-model="selectVal">
        <template #default="item">
            <span>{{ item.label }}</span>
            <div v-if="item.label.includes('1')">测试不定长</div>
        </template>
    </zc-vit-select>

    <button @click="change">测试数据改变</button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const data = ref<any[]>([])
for (let i = 0; i < 100; i++) {
    data.value.push(
        {
            value: 'Option' + i,
            label: 'Option' + i,
        },
    )
}
let selectVal = ref('')

function change() {
    data.value.forEach((item, i) => item.label += i)
    console.log(data)
}

</script>

<style scoped></style>