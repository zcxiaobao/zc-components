import { Directive, DirectiveBinding } from "vue";
import { ElMessage } from "element-plus";
interface ElType extends HTMLElement {
  copyContent: string;
  __handleClick__: (...args: any[]) => any;
}
const Copy: Directive = {
  mounted(el: ElType, binding: DirectiveBinding) {
    el.copyContent = binding.value;
    el.__handleClick__ = async function () {
      if (!el.copyContent) {
        ElMessage.warning("没有可复制内容");
        return;
      }
      await navigator.clipboard.writeText(el.copyContent);
      ElMessage.success("复制成功，剪贴板内容：" + el.copyContent);
    };
    el.addEventListener("click", el.__handleClick__);
  },
  updated(el: ElType, binding: DirectiveBinding) {
    el.copyContent = binding.value;
  },

  beforeUnmount(el: ElType) {
    el.removeEventListener("click", el.__handleClick__);
  },
};

export default Copy;
