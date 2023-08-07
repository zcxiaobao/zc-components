import { Directive } from "vue";

interface ElType extends HTMLElement {
  parentNode: HTMLElement;
}

const vDialogDrag: Directive = {
  updated(el: ElType, binding: any) {
    if (binding.value) {
      const dialogHeaderEl: HTMLElement =
        el.querySelector(".el-dialog__header")!;
      const dragDom: HTMLElement = el.querySelector(".el-dialog")!;
      dialogHeaderEl.style.cursor = "move";
      dialogHeaderEl.onmousedown = function (e: MouseEvent) {
        const disX = e.clientX - dialogHeaderEl.offsetLeft;
        const disY = e.clientY - dialogHeaderEl.offsetTop;
        const scrollWidth = document.body.clientWidth;
        const scrollHeight = document.body.clientHeight;
        const dragDomLeft = +dragDom.style.left.replace(/\px/g, "");
        const dragDomTop = +dragDom.style.top.replace(/\px/g, "");
        const minX = dragDom.offsetLeft;
        const minY = dragDom.offsetTop;
        const maxX = scrollWidth - dragDom.offsetWidth - minX;
        const maxY = scrollHeight - dragDom.offsetHeight - minY;
        document.onmousemove = function (e: MouseEvent) {
          let elLeft = e.clientX - disX;
          let elTop = e.clientY - disY;

          if (elLeft < -minX) {
            elLeft = -minX;
          } else if (elLeft > maxX) {
            elLeft = maxX;
          }

          if (elTop < -minY) {
            elTop = -minY;
          } else if (elTop > maxY) {
            elTop = maxY;
          }
          dragDom.style.left = dragDomLeft + elLeft + "px";
          dragDom.style.top = dragDomTop + elTop + "px";
        };

        document.onmouseup = function () {
          document.onmousemove = document.onmouseup = null;
        };
      };
    }
  },
};
export default vDialogDrag;
