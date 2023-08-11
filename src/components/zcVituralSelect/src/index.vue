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
import useVirtual from './useVirtural'
const props = defineProps({
    modelValue: {
        type: [String, Number, Array]
    },
    data: {
        type: Array as PropType<selectItem[]>
    },
    maxRender: {
        type: Number,
        default: 20
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
} = useVirtual({
    maxRender: props.maxRender,
    listItemHeight: 34,
    listNumber: selectData.value.length
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
})
</script>

<style scoped></style>