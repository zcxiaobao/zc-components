<template>
    <el-menu default-active="/" class="el-menu-vertical-demo" :collapse="collapse" router>
        <el-menu-item index="/">
            <template #title>首页</template>
        </el-menu-item>
        <el-menu-item index="/menu">
            <template #title>导航菜单</template>
        </el-menu-item>
    </el-menu>
</template>

<script setup lang="ts">

defineProps<{
    collapse: boolean
}>()
</script>

<style scoped lang="scss">
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
}
</style>