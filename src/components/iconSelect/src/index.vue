
<template>
    <el-button type="primary" size="large" @click="openDialog">
        <slot></slot>
    </el-button>
    <el-dialog v-model="dialogVisible" :title="props.title" width="550">
        <el-input v-model="iconInput" class="icon-input" placeholder="输入你想查询的图标" clearable show-word-limit
            :maxlength="maxIconNameLength" size="large" :prefix-icon="Icons.Search" />
        <el-scrollbar v-if="IconList.length" height="400px">
            <div class="container">
                <div class="icon-item" v-for="(item, i) in IconList" :key="i" @click="clickItem(item)">
                    <div class="icon">
                        <component :is="`el-icon-${UpperCamelCaseToKebabCase(item)}`"></component>
                    </div>
                    <div class="text">{{ item }}</div>
                </div>
            </div>
        </el-scrollbar>
        <el-empty v-else description="未搜索到您要找的图标~"></el-empty>
    </el-dialog>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import * as Icons from "@element-plus/icons-vue";
import { UpperCamelCaseToKebabCase } from '@/utils';
import { useCopy } from '@/hooks/useCopy/index';


const props = defineProps<{
    title: string,
}>()


let dialogVisible = ref<boolean>(false)
const openDialog = () => {
    dialogVisible.value = true
}

let iconInput = ref<string>('')
const IconList = computed(() => {
    const IconNameList = Object.keys(Icons)
    if (iconInput.value === '') return IconNameList
    else return IconNameList.filter(name => name.toLowerCase().includes(iconInput.value))
})

const maxIconNameLength = computed(() => {
    let maxLength = 0;
    Object.keys(Icons).forEach(icon => {
        maxLength = Math.max(icon.length, maxLength)
    })
    return maxLength
})
const clickItem = async (item: string) => {
    let text = `<el-icon-${UpperCamelCaseToKebabCase(item)} />`
    await useCopy(text)
    dialogVisible.value = false
}
</script>

<style scoped lang="scss">
@import './index.scss'
</style>