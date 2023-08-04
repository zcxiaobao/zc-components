<template>
    <zc-menu :data="data1"></zc-menu>
</template>

<script setup lang="ts">
let data1 = [
    {
        name: '导航1',
        index: '1',
        icon: 'Document'
    },
    {
        name: '导航2',
        index: '2',
        icon: 'Document'
    },
    {
        name: '导航3',
        index: '3',
        icon: 'Document',
        children: [
            {
                name: '导航3-1',
                index: '3-1',
                icon: 'Document'
            }
        ]
    }
]
</script>

<style scoped></style>