import { Directive } from "vue";
interface debounceBindingVal {
  cb: (...args: any[]) => any;
  delay: number;
  event?: "string";
}
const Throttle: Directive = {
  mounted(el: HTMLElement, binding: { value: debounceBindingVal }) {
    let { event = "click", cb, delay = 300 } = binding.value;

    const handle = function (fn: Function) {
      let timer: number | undefined = undefined;

      return (...args: any[]) => {
        if (!timer) {
          timer = setTimeout(() => {
            fn.call(el, ...args);
            timer = undefined;
          }, delay);
        }
      };
    };
    el.addEventListener(event, handle(cb));
  },
};

export default Throttle;
