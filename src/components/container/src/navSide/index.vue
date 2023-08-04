<template>
    <zc-menu :collapse="collapse" :data="data" :router="router" :defaultActive="$route.path"></zc-menu>
</template>

<script setup lang="ts">

defineProps<{
    collapse: boolean
}>()

const data = [
    {
        name: '首页',
        index: '/',
        icon: 'HomeFilled'
    },
    {
        name: '导航菜单',
        index: '/menu',
        icon: 'Menu'
    },
]

const router = true
</script>

<style scoped lang="scss">
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
}
</style>