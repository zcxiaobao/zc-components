import { Directive } from "vue";
interface debounceBindingVal {
  cb: (...args: any[]) => any;
  delay: number;
  event?: "string";
  isImmediate?: boolean;
}
const Debounce: Directive = {
  mounted(el: HTMLElement, binding: { value: debounceBindingVal }) {
    let {
      event = "click",
      cb,
      delay = 300,
      isImmediate = false,
    } = binding.value;

    const handle = function (fn: Function) {
      let timer: number | undefined = undefined;
      let isInvoked: boolean = false;
      return (...args: any[]) => {
        if (isImmediate && !isInvoked) {
          fn.call(el, ...args);
          isInvoked = true;
        }
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          fn.call(el, ...args);
          isInvoked = false;
        }, delay);
      };
    };
    el.addEventListener(event, handle(cb));
  },
};

export default Debounce;
