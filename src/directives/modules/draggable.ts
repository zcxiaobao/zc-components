import { Directive } from "vue";
const Draggable: Directive = {
  mounted() {
    console.log("drag");
  },
};
export default Draggable;
