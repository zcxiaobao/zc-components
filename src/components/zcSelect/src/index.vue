
<template>
    <el-select v-model="selectVal" v-bind="$attrs" :multiple="isMuliple" :teleported="false" v-loadmore="{
        'isLoadmore': isLoadmore,
        'callback': loadmoreFn
    }">
        <div class="check-all" v-if="isMuliple">
            <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox>
        </div>

        <el-option v-for=" item in selectData" :key="item[props.valueKey]" :label="item[props.labelKey]"
            :value="item[props.valueKey]">
            <el-checkbox v-model="item.checked" :label="item[props.labelKey]" size="large" @click.stop.native
                @change="handleItemChange(item)" v-if="isMuliple" />
            <span v-else>{{ item[props.labelKey] }}</span>
        </el-option>

        <el-option class="el-select-loading" value="">
            <template v-if="hasMore">
                <el-icon class="el-select-loading__icon">
                    <el-icon-loading />
                </el-icon>
                <span class="el-select-loading__tips">{{ loadingText }}</span>
            </template>
            <template v-else>{{ noneText }}</template>
        </el-option>
    </el-select>
</template>

<script setup lang="ts">
import { ref, watch, computed, PropType, onMounted } from 'vue';
import cloneDeep from 'lodash/cloneDeep'
import vLoadmore from './v-loadmore.ts';
const checkAll = ref<boolean>(false)
const isIndeterminate = ref(false)
const page = ref<number>(0)
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
    },
    isLoadmore: {
        type: Boolean,
        default: false
    },
    hasMore: {
        type: Boolean,
        default: true
    },
    loadingText: {
        type: String,
        default: '加载中ing'
    },
    noneText: {
        type: String,
        default: '"到底了~"'
    },
})

const emits = defineEmits(['update:modelValue', 'loadmore'])
const loading = ref<boolean>(false);
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
    loading.value = false
}, { deep: true })


const loadmoreFn = function () {
    if (!loading.value) {
        loading.value = true
        emits('loadmore', {
            page: page.value++
        })
    }
}

onMounted(() => {
    loadmoreFn()
})
</script>

<style scoped lang="scss">
.check-all {
    padding: 0 32px 0 20px;
}

.el-checkbox {
    width: 100%;
}

.loading {
    margin-top: 8px;
    color: #000;
    height: 10px
}

.el-select-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: initial;
    pointer-events: none;
    color: var(--el-color-info);
    font-size: 12px;

    &__icon {
        font-size: 16px;
        animation: rotate 1.5s linear infinite;
    }

    &__tips {
        margin-left: 6px;
    }

    @keyframes rotate {
        from {
            transform: rotate(0deg);
        }

        to {
            transform: rotate(360deg);
        }
    }
}
</style>