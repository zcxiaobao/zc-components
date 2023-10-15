<template>
  <div>
    <zc-table
      ref="table"
      :data="tableData"
      v-model:operatorCommand="operatorCommand"
      :options="tableOptions"
      :isEditRow="true"
    >
      <template #operator="{ scope }">
        <el-button link type="primary" size="small">详情</el-button>
        <el-button link type="primary" size="small" @click="edit(scope)"
          >编辑</el-button
        >
      </template>
      <template #edit-operator="{ scope }">
        <el-button link type="primary" size="small" @click="confirmEdit(scope)"
          >确认</el-button
        >
        <el-button link type="primary" size="small" @click="cancel(scope)"
          >取消</el-button
        >
      </template>
      <template #date="{ scope }">
        <div style="display: flex; align-items: center">
          <el-icon><el-icon-timer></el-icon-timer></el-icon>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </div>
      </template>

      <template #name="{ scope }">
        <el-popover effect="light" trigger="hover" placement="top" width="auto">
          <template #default>
            <div>name: {{ scope.row.name }}</div>
            <div>address: {{ scope.row.address }}</div>
          </template>
          <template #reference>
            <el-tag>{{ scope.row.name }}</el-tag>
          </template>
        </el-popover>
      </template>
    </zc-table>
  </div>
</template>

<script setup lang="ts">
import { ElMessageBox } from "element-plus";
import { ref } from "vue";
let operatorCommand = ref<OpeartorCommand>("other");
// let editRowIndex = ref<string>("");
const tableOptions = [
  {
    label: "日期",
    prop: "date",
    slot: "date",
    editable: true,
  },
  {
    label: "姓名",
    prop: "name",
    slot: "name",
  },
  {
    label: "地址",
    prop: "address",
  },
  {
    label: "操作",
    operatorCol: true,
  },
];
const tableData = ref<any[]>([
  {
    id: 0,
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    id: 1,
    date: "2016-05-02",
    name: "Lisa",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    id: 2,
    date: "2016-05-04",
    name: "Job",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    id: 3,
    date: "2016-05-01",
    name: "Mob",
    address: "No. 189, Grove St, Los Angeles",
  },
]);
const table = ref();
function edit(scope: any) {
  table.value.whichRowEdit(scope);
}

const confirmEdit = async (scope: any) => {
  const row = scope.row;
  const index = row.index;
  const isAlter = await ElMessageBox.confirm(
    "确认修改" + (index + 1) + "行表格数据吗？",
    "表格数据修改",
    {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "success",
    }
  );
  if (isAlter) {
    tableData.value[index] = row;
    table.value.rowEditComfirm(scope);
  } else {
    operatorCommand.value = "cancel";
    table.value.cancelEdit(scope);
  }
};

const cancel = (scope: any) => {
  table.value.cancelEdit(scope);
};
</script>

<style scoped></style>
