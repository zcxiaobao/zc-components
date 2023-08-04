<template>
    <el-menu :default-active="defaultActive" :router="router" class="el-menu-vertical-demo" v-bind="$attrs">
        <template v-for="item in props.data" :key="item.index">
            <el-sub-menu :index="item.index" v-if="item.children?.length">
                <template #title>
                    <component v-if="item.icon" :is="`el-icon-${UpperCamelCaseToKebabCase(item.icon)}`"></component>
                    <span>{{ item.name }}</span>
                </template>
                <el-menu-item v-for="child in item.children" :key="child.index" :index="child.index">
                    <component v-if="child.icon" :is="`el-icon-${UpperCamelCaseToKebabCase(child.icon)}`">
                    </component>
                    <span>{{ child.name }}</span>
                </el-menu-item>
            </el-sub-menu>
            <el-menu-item :index="item.index" v-else>
                <component v-if="item.icon" :is="`el-icon-${UpperCamelCaseToKebabCase(item.icon)}`"></component>
                <span>{{ item.name }}</span>
            </el-menu-item>
        </template>
    </el-menu>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { MenuItem } from './types';
import { UpperCamelCaseToKebabCase } from '@/utils/index.ts'

const props = defineProps({
    data: {
        type: Array as PropType<MenuItem[]>,
        required: true
    },
    router: {
        type: Boolean,
        default: false
    },
    defaultActive: {
        type: String,
        default: ''
    }
})
</script>

<style scoped>
svg {
    margin-right: 4px;
    width: 1em;
    height: 1em;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
}
</style>