import { defineComponent, PropType } from "vue";
import { DetailItem } from "./types";

export default defineComponent({
  name: "RenderTooltip",
  props: {
    render: {
      type: Function,
      required: true,
    },
    item: {
      type: Object as PropType<DetailItem>,
    },
  },
  setup(props) {
    return () => {
      return <span>{props.render(props.item)}</span>;
    };
  },
});
