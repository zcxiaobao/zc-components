<template>
    <zc-vit-select :data="data" v-model="selectVal"></zc-vit-select>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const data: any[] = []
for (let i = 0; i < 100; i++) {
    data.push(
        {
            value: 'Option' + i,
            label: 'Option' + i,
        },
    )
}
let selectVal = ref('')

</script>

<style scoped></style>