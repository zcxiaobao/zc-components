<template>
    <el-select ref="elSelectRef" v-model="selectVal" size="large" :teleported="false" @visible-change="handleVisible">
        <li class="start"></li>
        <template v-for="(item, i) in selectData" :key="item.value">
            <el-option :label="item.label" :value="item.value" v-if="isRender(i)" ref="elOptionItem">
                <slot v-bind="item"></slot>
            </el-option>
        </template>
        <li class="end"></li>
    </el-select>
</template>

<script setup lang="ts">
import { cloneDeep } from 'lodash';
import { computed, ref, PropType, watch, nextTick } from 'vue';
import { selectItem } from './types';
import { ElSelect } from 'element-plus';
import useVirtual from './useVirtural'
const props = defineProps({
    modelValue: {
        type: [String, Number, Array]
    },
    data: {
        type: Array as PropType<selectItem[]>
    },
    itemRender: {
        type: Number,
        default: 20
    },
    itemHeight: {
        type: Number,
        default: 34
    },
    isRandomHei: {
        type: Boolean,
        default: false
    }
})
const selectData = ref<selectItem[]>(cloneDeep(props.data) as selectItem[])
const elSelectRef = ref<InstanceType<typeof ElSelect>>()
const emits = defineEmits(['update:modelValue'])

const elOptionItem = ref<any>()
const selectVal = computed({
    get() {
        return props.modelValue
    },
    set(val) {
        emits('update:modelValue', val)
    }
})


const {
    startObserver,
    stopObserver,
    isRender,
    alterOptions
} = useVirtual({
    itemRender: props.itemRender,
    minItemHeight: props.itemHeight,
    itemTotal: selectData.value.length,
    isRandomHei: props.isRandomHei
})



const initObserver = async function () {
    await nextTick()
    const selectDom = elSelectRef.value?.$el
    startObserver(selectDom)
}

const handleVisible = (isVisible: boolean) => {
    if (!isVisible || !elOptionItem.value) {
        stopObserver()
        return;
    }
    initObserver()
}

watch(() => props.data, d => {
    selectData.value = cloneDeep(d) as selectItem[]
    alterOptions({
        itemRender: props.itemRender,
        minItemHeight: 34,
        isRandomHei: props.isRandomHei,
        itemTotal: selectData.value.length
    })
}, { deep: true })
</script>

<style scoped>
.el-select-dropdown__item {
    height: 100%;
}
</style>