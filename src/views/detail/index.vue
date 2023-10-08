<template>
    <zc-detail :descData="descData" :listTypeInfo="listTypeInfo">
        <template #slotName="item">
            {{ item.value + '---' }}
        </template>
    </zc-detail>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
const listTypeInfo = {
    postsList: [
        { value: 0, label: '员工' },
        { value: 1, label: '经理' },
        { value: 2, label: '老总' }
    ]
}
const dataInfo: any = {
    id: '1498904492217241602',
    stocktakePlanNo: 'PD-YX-20220302002',
    workshopId: 301,
    workshopLabel: '压型车间',
    planStocktakeDate: '2022-03-03',
    warehouseId: 1,
    warehouseName: '压型电极仓',
    stocktakeJobStatus: 4,
    stocktakeJobStatusLabel: '待盘点录入',
    stocktakeType: 2,
    stocktakeTypeLabel: '临时盘点',
    originTypeList: '[1, 3]',
    originTypeListLabel: '在制品,合格品',
    planStocktakeUserName: '张三',
    planStocktakeUserId: 0,
    createRemark: '测试',
    slotId: 'testSlot',
    posts: 1
}
const descData = ref([
    {
        label: '盘点单编号：',
        fieldName: 'stocktakePlanNo',
        value: '',
    },
    {
        label: '盘点单状态：',
        fieldName: 'stocktakeJobStatusLabel',
        value: '',
    },
    {
        label: '盘点负责人：',
        fieldName: 'planStocktakeUserName',
        value: '',
    },
    {
        label: '计划盘点日期：',
        fieldName: 'planStocktakeDate',
        value: '',
    },
    {
        label: '插槽显示编号+负责人：',
        slotName: 'slotName',
        span: 4,
        fieldName: 'slotId',
        value: 'testSlot',
    },
    {
        label: '车间：',
        fieldName: 'workshopLabel',
        value: '',
    },
    {
        label: '仓库：',
        fieldName: 'warehouseName',
        value: '',
        tooltip: 'test tooltip'
    },
    {
        label: '盘点所有物料：',
        fieldName: 'originTypeListLabel',
        value: '',
    },
    {
        label: '备注：',
        fieldName: 'createRemark',
        value: '',
        span: 4,
        tooltip: (item: any) => {
            return `${item.value}--${new Date()}`
        }
    },
    {
        label: '职位',
        value: '',
        fieldName: 'posts',
        filters: {
            list: 'postsList'
        }
    }
])

onMounted(() => {
    descData.value.map(item => {
        item.value = dataInfo[item.fieldName as any]
    })
})
</script>

<style scoped></style>