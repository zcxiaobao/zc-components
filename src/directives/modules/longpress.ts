import { Directive } from "vue";
interface longpressBindingVal {
  cb: (...args: any[]) => any;
  delay: number;
  params: any;
}

interface ElType extends HTMLElement {
  __handleStart__: (...args: any[]) => any;
  __handleCancel__: (...args: any[]) => any;
}
const Longpress: Directive = {
  mounted(el: ElType, binding: { value: longpressBindingVal }) {
    let { cb, delay = 1000, params } = binding.value;
    let timer: number | undefined = undefined;
    el.__handleStart__ = (e: MouseEvent) => {
      if (e.type === "click" && e.button != 0) return;
      if (!timer) {
        timer = setTimeout(() => {
          cb(params);
          timer = undefined;
        }, delay);
      }
    };
    el.__handleCancel__ = () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
    el.addEventListener("mousedown", el.__handleStart__);
    el.addEventListener("mouseout", el.__handleCancel__);
    el.addEventListener("click", el.__handleCancel__);
  },
  beforeUnmount(el: ElType) {
    el.removeEventListener("mousedown", el.__handleStart__);
    el.removeEventListener("mouseout", el.__handleCancel__);
    el.removeEventListener("click", el.__handleCancel__);
  },
};

export default Longpress;
