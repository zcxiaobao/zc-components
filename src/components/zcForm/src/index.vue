<template>
  <el-form
    ref="form"
    v-if="model"
    :model="model"
    :rules="rules"
    v-bind="$attrs"
    label-width="120px"
    :validate-on-rule-change="false"
  >
    <template v-for="(item, index) in props.options" :key="index">
      <template v-if="!item.children || !item.children.length">
        <el-form-item :label="item.label" :prop="item.prop">
          <el-upload
            v-if="item.type === 'upload'"
            v-bind="item.uploadAttrs"
            :on-upload-preview="onPreview"
            :on-upload-remove="onRemove"
            :on-upload-success="onSuccess"
            :on-upload-error="onError"
            :on-upload-progress="onProgress"
            :on-upload-change="onChange"
            :before-upload="beforeUpload"
            :before-remove="beforeRemove"
            :http-request="httpRequest"
            :on-upload-exceed="onExceed"
          >
            <slot name="uploadArea"></slot>
            <slot name="uploadTips"></slot>
          </el-upload>
          <div v-else-if="item.type === 'editor'" class="editor-box">
            <Toolbar
              :mode="item.wangEditorAttrs.mode"
              :defaultConfig="item.wangEditorAttrs.toolbarConfig"
              class="editor-toolbar"
              :editor="editorRef"
            />
            <Editor
              :style="{ height: item.wangEditorAttrs.height }"
              v-model="item.value"
              class="editor-content"
              :mode="item.wangEditorAttrs.mode"
              :defaultConfig="item.wangEditorAttrs.editorConfig"
              @onCreated="handleCreated"
              @onBlur="handleBlur"
            />
          </div>
          <component
            v-model="model[item.prop!]"
            :is="`el-${item.type}`"
            v-bind="item.attrs"
            v-else
            :placeholder="item.placeholder"
          ></component>
        </el-form-item>
      </template>
      <template v-else>
        <el-form-item :label="item.label" :prop="item.prop">
          <component
            :placeholder="item.placeholder"
            v-model="model[item.prop!]"
            :is="`el-${item.type}`"
            v-bind="item.attrs"
          >
            <component
              :label="child.label"
              :is="`el-${child.type}`"
              :value="child.value"
              v-for="(child, index) in item.children"
              :key="index"
            >
            </component>
          </component>
        </el-form-item>
      </template>
    </template>
    <el-form-item>
      <slot name="action" :model="model" :form="form"></slot>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import "@wangeditor/editor/dist/css/style.css";
import { useFormItem } from "element-plus";

import { PropType, ref, onMounted, shallowRef, onBeforeUnmount } from "vue";
import { FormOptionItem } from "./types";
import { deepClone } from "../../../utils/index";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";

// 不知道为什么值为undefined
const { formItem } = useFormItem();

const props = defineProps({
  options: {
    type: Array as PropType<FormOptionItem[]>,
    required: true,
  },
  httpRequest: {
    type: Function,
  },
});

let model = ref<any>(null);
let rules = ref<any>(null);
let form = ref();
let editorRef = shallowRef();

const handleCreated = (editor) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};
const handleBlur = () => {};

// 销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

onMounted(() => {
  let m: any = {};
  let r: any = {};
  props.options.forEach((item: FormOptionItem) => {
    m[item.prop!] = item.value;
    r[item.prop!] = item.rules;
  });

  model.value = deepClone(m);
  rules.value = deepClone(r);
});

// 表单相关方法
let validate = () => {
  return form.value!.validate;
};

let resetFields = () => {
  form.value!.resetFields();
};

let getFormData = () => {
  return model.value;
};

defineExpose({
  validate,
  resetFields,
  getFormData,
});

// 上传组件的所有方法
let emits = defineEmits([
  "on-upload-preview",
  "on-upload-remove",
  "on-upload-success",
  "on-upload-error",
  "on-upload-progress",
  "on-upload-change",
  "before-upload",
  "before-remove",
  "on-upload-exceed",
]);

let onPreview = (file: File) => {
  emits("on-upload-preview", file);
};
let onRemove = (file: File, fileList: FileList) => {
  emits("on-upload-remove", { file, fileList });
};
let onSuccess = (response: any, file: File, fileList: FileList) => {
  // 上传图片成功 给表单上传项赋值
  let uploadItem = props.options.find((item) => item.type === "upload")!;
  model.value[uploadItem.prop!] = { response, file, fileList };
  emits("on-upload-success", { response, file, fileList });
};
let onError = (err: any, file: File, fileList: FileList) => {
  emits("on-upload-error", { err, file, fileList });
};
let onProgress = (event: any, file: File, fileList: FileList) => {
  emits("on-upload-progress", { event, file, fileList });
};
let onChange = (file: File, fileList: FileList) => {
  emits("on-upload-change", { file, fileList });
};
let beforeUpload = (file: File) => {
  emits("before-upload", file);
};
let beforeRemove = (file: File, fileList: FileList) => {
  emits("before-remove", { file, fileList });
};
let onExceed = (files: File, fileList: FileList) => {
  emits("on-upload-exceed", { files, fileList });
};
</script>

<style scoped lang="scss">
.editor-box {
  /* 防止富文本编辑器全屏时 tabs组件 在其层级之上 */
  z-index: 2;
  width: 100%;
  border: 1px solid var(--el-border-color-darker);
  .editor-toolbar {
    z-index: 2;
    border-bottom: 1px solid var(--el-border-color-darker);
  }
  .editor-content {
    overflow-y: hidden;
  }
}
</style>
