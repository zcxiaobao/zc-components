<template>
    <zc-select :data="data" v-model="selectVal" :isCheck="true" @change="change" collapse-tags></zc-select>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const data = [
    {
        value: 'Option1',
        label: 'Option1',
    },
    {
        value: 'Option2',
        label: 'Option2',
    },
    {
        value: 'Option3',
        label: 'Option3',
    },
    {
        value: 'Option4',
        label: 'Option4',
    },
    {
        value: 'Option5',
        label: 'Option5',
    },
]
const selectVal = ref([])
const change = (val: any) => {
    console.log(val)
}
</script>

<style scoped></style>