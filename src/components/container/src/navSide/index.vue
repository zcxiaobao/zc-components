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
    {
        name: '图标选择器',
        index: '/icon-select',
        icon: 'Document'
    },
    {
        name: '对话框',
        index: '/dialog',
        icon: 'ChatLineRound',
        children: [
            {
                name: '可拖拽式对话框',
                index: '/dialog/drag',
                icon: 'ChatRound',
            },
            {
                name: '带滚动条的对话框',
                index: '/dialog/scroll',
                icon: 'ChatDotRound',
            }
        ]
    }
]

const router = true
</script>

<style scoped lang="scss">
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
}
</style>