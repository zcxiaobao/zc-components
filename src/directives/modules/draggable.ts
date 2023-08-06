import { Directive } from "vue";

interface ElType extends HTMLElement {
  parentNode: HTMLElement;
}

const Draggable: Directive = {
  mounted(el: ElType) {
    el.style.cursor = "move";
    el.style.position = "absolute";

    el.onmousedown = function (e: MouseEvent) {
      let disX: number = e.clientX - el.offsetLeft;
      let disY: number = e.clientY - el.offsetTop;

      document.onmousemove = function (e: MouseEvent) {
        let elLeft: number = e.clientX - disX;
        let elTop: number = e.clientY - disY;
        const maxX: number = el.parentNode.offsetWidth - el.offsetWidth;
        const maxY: number = el.parentNode.offsetHeight - el.offsetHeight;
        if (elLeft < 0) {
          elLeft = 0;
        } else if (elLeft > maxX) {
          elLeft = maxX;
        }

        if (elTop < 0) {
          elTop = 0;
        } else if (elTop > maxY) {
          elTop = maxY;
        }
        el.style.left = maxX + "px";
        el.style.top = maxY + "px";
      };

      document.onmouseup = function () {
        document.onmousemove = document.onmouseup = null;
      };
    };
  },
};
export default Draggable;
