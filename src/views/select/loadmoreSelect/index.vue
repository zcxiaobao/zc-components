<template>
    <zc-select :isLoadmore="true" :data="selectData" v-model="selectVal" @loadmore="getData" :hasMore="hasMore"
        @change="change" :multiple="true"></zc-select>
</template>

<script setup lang="ts">

import { getDataList } from './data.ts';
import { ref, onMounted } from 'vue';
import { dataResponse } from './data';
let selectData = ref<selectItem[]>([]);
let selectVal = ref('');
let hasMore = ref<boolean>(true)
let page = ref<number>(0)

const getData = async () => {
    const data: dataResponse = await getDataList({ page: page.value })
    if (data.content.length) {
        selectData.value = [...selectData.value, ...data.content]
    } else {
        hasMore.value = false
    }
    page.value++;
}

const change = (val: any) => {
    console.log(val)
}

onMounted(() => {
    getData()
})
</script>

<style scoped></style>