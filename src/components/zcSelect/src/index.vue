
<template>
    <el-select v-model="selectVal" v-bind="$attrs" :multiple="isMuliple">
        <div class="check-all" v-if="isMuliple">
            <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox>
        </div>

        <el-option v-for="item in selectData" :key="item[props.valueKey]" :label="item[props.labelKey]"
            :value="item[props.valueKey]">
            <el-checkbox v-model="item.checked" :label="item[props.labelKey]" size="large" @click.stop.native
                @change="handleItemChange(item)" v-if="isMuliple" />
            <span v-else>{{ item[props.labelKey] }}</span>
        </el-option>
    </el-select>
</template>

<script setup lang="ts">
import { ref, watch, computed, PropType } from 'vue';
import cloneDeep from 'lodash/cloneDeep'

const checkAll = ref<boolean>(false)
const isIndeterminate = ref(false)
const props = defineProps({
    modelValue: {
        type: [String, Number, Array]
    },
    // 是否多选
    isMuliple: {
        type: Boolean,
        default: false
    },
    // 选择框宽度
    width: {
        type: String
    },
    // 传入的option数组中，要作为最终选择项的键值value
    valueKey: {
        type: String,
        default: 'value'
    },
    // 传入的option数组中，要作为显示项的键值名称
    labelKey: {
        type: String,
        default: 'label'
    },
    // 下拉框组件数据源
    data: {
        type: Array as PropType<any[]>,
        default: () => []
    }
})

const emits = defineEmits(['update:modelValue'])

const selectVal = computed({
    get() {
        return props.modelValue
    },
    set(val) {
        emits('update:modelValue', val)
    }
})

const selectData = ref<any[]>(cloneDeep(props.data))

const handleItemChange = function (item) {
    if (item.checked) {
        emits('update:modelValue', [...selectVal.value, item[props.valueKey]])
    } else {
        emits('update:modelValue', selectVal.value.filter(_ => _ !== item[props.valueKey]))
    }
}

const handleCheckAllChange = function () {
    if (checkAll.value) {
        selectData.value.forEach(_ => _.checked = true)
        emits('update:modelValue', selectData.value.map(_ => _[props.valueKey]))

    } else {
        selectData.value.forEach(_ => _.checked = false)
        emits('update:modelValue', [])
    }
}


watch(selectVal, (nowSelectVal) => {
    checkAll.value = nowSelectVal.length === selectData.value.length ? true : false
    isIndeterminate.value = nowSelectVal.length !== selectData.value.length && nowSelectVal.length ? true : false
}, {
    deep: true
})

watch(() => props.data, d => {
    selectData.value = d
})

</script>

<style scoped>
.check-all {
    padding: 0 32px 0 20px;
}

.el-checkbox {
    width: 100%;
}
</style>