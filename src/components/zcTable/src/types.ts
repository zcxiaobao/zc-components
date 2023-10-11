interface TableOptionItem {
  label: string;
  prop?: string;
  width?: number;
  // 操作项
  operatorCol?: boolean;
  // 自定义项
  slot?: string;
  // 单元格是否可编辑
  editable?: boolean;
  // 是否自定义可编辑单元格操作项
  cellEditSlot?: boolean;
}

type OpeartorCommand = "edit" | "cancel" | "confirm" | string;
