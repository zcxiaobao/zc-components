import { Directive, DirectiveBinding } from "vue";
interface ElType extends HTMLElement {
  __handleScroll__: (...args: any) => any;
}
interface loadmoreBinding extends DirectiveBinding {
  value: {
    isLoadmore: boolean;
    callback: (...args: any[]) => any;
  };
}
const vLoadmore: Directive = {
  mounted(el: ElType, binding: loadmoreBinding) {
    const { isLoadmore, callback } = binding.value;

    if (isLoadmore) {
      if (typeof callback !== "function") {
        throw new Error("loadmore 指令的参数必须是一个函数");
      }
      const needLoadMoreDom = el.querySelector(
        ".el-select-dropdown .el-select-dropdown__wrap"
      );
      console.log(needLoadMoreDom);
      needLoadMoreDom?.addEventListener("scroll", function (this: HTMLElement) {
        const isBottom =
          this.scrollHeight - this.scrollTop <= this.clientHeight;
        if (isBottom) {
          callback();
        }
      });
    }
  },
};
export default vLoadmore;
