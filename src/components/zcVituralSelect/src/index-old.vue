<template>
    <el-select ref="elSelectRef" v-model="selectVal" size="large" :teleported="false" @visible-change="handleVisible">
        <li class="start"></li>
        <template v-for="(item, i) in selectData" :key="item.value">
            <el-option :label="item.label" :value="item.value" v-if="isRender(i)" ref="elOptionItem" />
        </template>
        <li class="end"></li>
    </el-select>
</template>

<script setup lang="ts">
import { cloneDeep } from 'lodash';
import { computed, ref, PropType, watch, nextTick } from 'vue';
import { selectItem } from './types';
import { ElSelect } from 'element-plus';

const props = defineProps({
    modelValue: {
        type: [String, Number, Array]
    },
    data: {
        type: Array as PropType<selectItem[]>
    },
    maxRender: {
        type: Number,
        default: 10
    }
})
const emits = defineEmits(['update:modelValue'])
const firstIndex = ref<number>(0)
const selectData = ref<selectItem[]>(cloneDeep(props.data) as selectItem[])
const elSelectRef = ref<InstanceType<typeof ElSelect>>()
const elOptionItem = ref<any>()
const observer = ref({} as IntersectionObserver)
const selectVal = computed({
    get() {
        return props.modelValue
    },
    set(val) {
        emits('update:modelValue', val)
    }
})
const refreshRender = computed(() => props.maxRender / 10)
let listItemHeight = 34;
const dropDownDefaultPaddingTop = 6;
const lastIndex = computed(() => firstIndex.value + props.maxRender)
const isRender = computed(() => (index: number) => {
    return index >= firstIndex.value && index < lastIndex.value
})
const getCssStyle = function (el: HTMLElement, style: any) {
    return window.getComputedStyle(el)[style]
}
const initObserver = async function () {
    await nextTick()
    const selectDom = elSelectRef.value?.$el
    const listItem: HTMLElement = elOptionItem.value[0].$el

    if (!listItem) {
        return
    }
    listItemHeight = listItem.offsetHeight || listItemHeight
    const virtualDom = selectDom.querySelector('.el-select-dropdown__list')
    const dropdownDom = selectDom.querySelector('.el-select-dropdown')
    const firstDom = dropdownDom.querySelector('.start')
    const endDom = dropdownDom.querySelector('.end')
    const nowPaddingTop = parseFloat(getCssStyle(virtualDom, 'paddingTop')) || dropDownDefaultPaddingTop
    observer.value = new IntersectionObserver((entries) => {
        if (entries.length >= 2) return
        if (entries[0].intersectionRatio <= 0) return;
        const dom = entries[0]
        if (!dom.isIntersecting) return
        if (dom.target === firstDom) {
            const startIndex = firstIndex.value - refreshRender.value
            firstIndex.value = startIndex > 0 ? startIndex : 0
        } else {
            const endIndex = firstIndex.value + refreshRender.value
            firstIndex.value = endIndex < selectData.value.length ? endIndex : selectData.value.length
        }
        virtualDom.style.paddingTop = firstIndex.value * listItemHeight + nowPaddingTop + 'px'
    })
    observer.value.observe(firstDom)
    observer.value.observe(endDom)
}

const handleVisible = (isVisible: boolean) => {
    if (!isVisible || !elOptionItem.value) {
        observer.value.disconnect && observer.value.disconnect()
        return;
    }
    // initData()
    initObserver()
}

watch(() => props.data, d => {
    selectData.value = cloneDeep(d) as selectItem[]
})
</script>

<style scoped></style>