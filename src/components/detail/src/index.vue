<template>
    <el-descriptions :column="column" v-bind="$attrs">
        <el-descriptions-item :label="item.label" v-for="(item, key) in descData" :key="key" :span="item.span || 1">
            <template v-if="item.slotName">
                <slot :name="item.slotName" v-bind="item"></slot>
            </template>
            <span v-else>
                <el-tooltip class="box-item" effect="dark" placement="bottom" v-if="item.tooltip" v-bind="$attrs">
                    <span>
                        <span v-if="item.filters && item.filters.list">
                            {{ formatVal(item.value, listTypeInfo![item.filters.list], item.filters.key || 'value',
                                item.filters.label || 'label') }}
                        </span>
                        <span v-else>{{ item.value }} </span>
                        <el-icon style="cursor: pointer;margin-left:2px;top:1px;">
                            <component :is="`el-icon-${UpperCamelCaseToKebabCase(item.icon || 'Warning')}`"></component>
                        </el-icon>
                    </span>
                    <template #content v-if="item.tooltip">
                        <span v-if="(typeof item.tooltip === 'string')">{{ item.tooltip }}</span>
                        <span v-else>
                            <render-tooltip :render="item.tooltip" :item="item"></render-tooltip>
                        </span>
                    </template>
                </el-tooltip>
                <span v-else>
                    <span v-if="item.filters && item.filters.list">
                        {{ formatVal(item.value, listTypeInfo![item.filters.list], item.filters.key || 'value',
                            item.filters.label || 'label') }}
                    </span>
                    <span v-else>{{ item.value }} </span>
                </span>
            </span>
        </el-descriptions-item>
    </el-descriptions>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { DetailItem } from './types';
import { UpperCamelCaseToKebabCase } from '@/utils/index'
import RenderTooltip from './renderTooltip'
defineProps({
    descData: {
        type: Array as PropType<DetailItem[]>
    },
    column: {
        type: Number,
        default: 4
    },
    listTypeInfo: {
        type: Object
    }
})

/**
 * 将value值转换为对应label，通常用于下拉等数据的回显
 * @param {String,Number} val  待转换 value 值
 * @param {String} list 转换数据源
 * @param {String} key 数据源的key字段（默认：value）
 * @param {String} label  数据源的label字段（默认：label）
 */
const formatVal = function (val: number | string, list: any[], key: string, label: string) {
    const res = list.find(_ => _[key] === val)
    return res && res[label]
}
</script>

<style scoped></style>