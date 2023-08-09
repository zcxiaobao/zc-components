<template>
    <zc-select :isLoadmore="true" :data="selectData" v-model="selectVal" @loadmore="getData" :hasMore="hasMore"
        @change="change" :multiple="true"></zc-select>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

import { getDataList } from './data.js';
import { ref } from 'vue';
let selectData = ref([]);
let selectVal = ref('');
let hasMore = ref<boolean>(true)
const getData = async (param) => {
    const data = await getDataList(param)
    if (data.content.length) {
        selectData.value = [...selectData.value, ...data.content]
    } else {
        hasMore.value = false
    }
}

const change = (val) => {
    console.log(val)
}
</script>

<style scoped></style>