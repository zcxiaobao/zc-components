<template>
  <el-table
    :data="tableData"
    :cell-class-name="tableCellClassName"
    style="width: 100%"
    v-bind="$attrs"
  >
    <template v-for="(item, index) in tableOptions" :key="index">
      <el-table-column
        :prop="item.prop"
        :label="item.label"
        v-if="item.prop || !item.operatorCol"
      >
        <template #default="scope">
          <template v-if="scope.row.rowEdit">
            <el-input v-model="scope.row[item.prop!]" large="small" />
          </template>
          <template v-else>
            <template v-if="scope.$index + scope.column.id === currentEditCell">
              <div style="display: flex; align-items: center">
                <el-input v-model="currentEditCellContent" large="small" />
                <div class="btn-group">
                  <slot v-if="item.cellEditSlot"></slot>
                  <div @click.stop="operatorCell()" class="cell-btns" v-else>
                    <el-icon-check
                      class="alter"
                      @click.stop="alterCell(scope)"
                    ></el-icon-check>

                    <el-icon-close
                      class="close"
                      @click.stop="closeCell()"
                    ></el-icon-close>
                  </div>
                </div>
              </div>
            </template>
            <template v-else>
              <div style="display: flex; align-items: center">
                <slot v-if="item.slot" :scope="scope" :name="item.slot"></slot>
                <span v-else>{{ scope.row[item.prop!] }}</span>
                <el-icon @click="editCell(scope)" v-if="item.editable">
                  <el-icon-edit></el-icon-edit>
                </el-icon>
              </div>
            </template>
          </template>
        </template>
      </el-table-column>
    </template>
    <el-table-column
      v-if="operatorCol"
      :label="operatorCol && operatorCol.label"
    >
      <template #default="scope">
        <slot name="operator" :scope="scope" v-if="!scope.row.rowEdit"></slot>
        <slot name="edit-operator" :scope="scope" v-else></slot>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { PropType, computed, ref, watch, onMounted } from "vue";
import { deepClone } from "../../../utils/index";

const props = defineProps({
  options: {
    type: Array as PropType<TableOptionItem[]>,
    require: true,
  },
  data: {
    type: Array as PropType<any[]>,
    require: true,
  },
  isEditRow: {
    type: Boolean,
    default: false,
  },
  // 编辑行按钮标识
  operatorCommand: {
    type: String as PropType<OpeartorCommand>,
    default: "",
  },
});

const emits = defineEmits(["cellEdit", "rowEdit", "update:operatorCommand"]);
// 拷贝一份表格数据
const tableData = ref<any[]>(deepClone(props.data));
// 拷贝一份按钮的标识
let cloneOperatorCommand = ref<OpeartorCommand>(props.operatorCommand);
// 当前编辑的单元格标识
const currentEditCell = ref<string>("");
// 当前编辑的单元格内容
const currentEditCellContent = ref<string>("");
// 当前编辑的行内容
// const currentRowEditContent = ref<any>({});
// 单元格编辑
const editCell = function (scope: any) {
  console.log(scope);
  currentEditCell.value = scope.$index + scope.column.id;
  currentEditCellContent.value = scope.row[scope.column.property];
};
// 确认修改单元格内容
const alterCell = function (scope: any) {
  // 修改后如何返回给父组件???
  currentEditCell.value = "";
  currentEditCellContent.value = "";
  emits("cellEdit", scope, currentEditCellContent);
};

// 取消修改单元格内容
const closeCell = function () {
  currentEditCell.value = "";
  currentEditCellContent.value = "";
};
const operatorCell = function () {
  // currentEditCell.value = "";
};

// 除操作项以外的表格数据
const tableOptions = computed(() =>
  props.options!.filter((item) => item.operatorCol !== true)
);
// 操作项
const operatorCol = computed(() =>
  props.options!.find((item) => item.operatorCol === true)
);

// const rowClick = function (row: any, column: any) {
//   if (column.label === operatorCol.value?.label) {
//     if (!cloneOperatorCommand.value) return;
//     if (cloneOperatorCommand.value === "edit") {
//       if (props.isEditRow) {
//         row.rowEdit = true;
//         tableData.value.forEach((item) => {
//           if (item !== row) item.rowEdit = false;
//         });
//         emits("update:operatorCommand", "");
//       }
//     } else {
//       if (cloneOperatorCommand.value === "cancel") {
//         for (let prop in row) {
//           row[prop] = props.data![row.index][prop];
//         }
//       } else if (cloneOperatorCommand.value === "confirm") {
//         emits("rowEdit", row, column);
//       }
//       tableData.value.forEach((item) => {
//         item.rowEdit = false;
//       });
//     }
//   }
// };

// 行编辑函数部分
const ensureClickOperator = (column: any) => {
  if (column.label === operatorCol.value?.label) return true;
  return false;
};

const whichRowEdit = (scope: any) => {
  const { row, column } = scope;
  if (ensureClickOperator(column)) {
    row.rowEdit = true;
    tableData.value.forEach((item) => {
      if (item !== row) item.rowEdit = false;
    });
  }
};
const rowEditComfirm = (scope: any) => {
  scope.row.rowEdit = false;
};

const cancelEdit = (scope: any) => {
  const row = scope.row;
  scope.row.rowEdit = false;
  for (let prop in row) {
    row[prop] = props.data![row.index][prop];
  }
};

defineExpose({
  whichRowEdit,
  rowEditComfirm,
  cancelEdit,
});

watch(
  () => props.data,
  (val) => {
    tableData.value = deepClone(val);
    tableData.value.forEach((item) => (item.rowEdit = false));
  },
  { deep: true }
);

// 监听
watch(
  () => props.operatorCommand,
  (val) => {
    if (val) cloneOperatorCommand.value = val;
  }
);

onMounted(() => {
  tableData.value.forEach((item) => (item.rowEdit = false));
});

// 为 row 和 column 上添加 index 属性，以便来确定所点击单元格行列
const tableCellClassName = ({ row, column, rowIndex, columnIndex }) => {
  //注意这里是解构
  //利用单元格的 className 的回调方法，给行列索引赋值
  row.index = rowIndex;
  column.index = columnIndex;
};
</script>

<style scoped lang="scss">
.cell-btns {
  display: flex;
  svg {
    width: 1em;
    height: 1em;
    margin-left: 8px;
    position: relative;
    // top: 8px;
    cursor: pointer;
  }
  .alter {
    color: red;
  }
  .close {
    color: green;
  }
}
</style>
