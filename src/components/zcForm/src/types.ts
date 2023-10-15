import { RuleItem } from "./rule";
import { CSSProperties } from "vue";
import { IToolbarConfig, IEditorConfig } from "@wangeditor/editor";
// 接收父组件参数，并设置默认值
interface RichEditorProps {
  toolbarConfig?: Partial<IToolbarConfig>; // 工具栏配置 ==> 非必传（默认为空）
  editorConfig?: Partial<IEditorConfig>; // 编辑器配置 ==> 非必传（默认为空）
  height?: string; // 富文本高度 ==> 非必传（默认为 500px）
  mode?: "default" | "simple"; // 富文本模式 ==> 非必传（默认为 default）
  hideToolBar?: boolean; // 是否隐藏工具栏 ==> 非必传（默认为false）
  disabled?: boolean; // 是否禁用编辑器 ==> 非必传（默认为false）
}
export interface FormOptionItem {
  // 表单项显示的元素
  type:
    | "cascader"
    | "checkbox"
    | "checkbox-group"
    | "checkbox-button"
    | "color-picker"
    | "date-picker"
    | "input"
    | "input-number"
    | "radio"
    | "radio-group"
    | "radio-button"
    | "rate"
    | "select"
    | "option"
    | "slider"
    | "switch"
    | "time-picker"
    | "time-select"
    | "transfer"
    | "upload"
    | "editor";
  // 表单项的值
  value?: any;
  // 表单项label
  label?: string;
  // 表单项的标识
  prop?: string;
  // 表单项的验证规则
  rules?: RuleItem[];
  // 表单项的占位符
  placeholder?: string;
  // 表单元素特有的属性
  attrs?: {
    // css样式
    style?: CSSProperties;
    clearable?: boolean;
    showPassword?: boolean;
    disabled?: boolean;
  };
  // 表单项的子元素
  children?: FormOptionItem[];
  // 处理上传组件的属性和方法
  uploadAttrs?: {
    action: string;
    headers?: object;
    method?: "post" | "put" | "patch";
    multiple?: boolean;
    data?: any;
    name?: string;
    withCredentials?: boolean;
    showFileList?: boolean;
    drag?: boolean;
    accept?: string;
    thumbnailMode?: boolean;
    fileList?: any[];
    listType?: "text" | "picture" | "picture-card";
    autoUpload?: boolean;
    disabled?: boolean;
    limit?: number;
  };
  wangEditorAttrs: RichEditorProps;
}
