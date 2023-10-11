import { App } from "vue";
import menu from "./Menu";
import iconSelect from "./iconSelect";
import dialog from "./zcDialog";
import select from "./zcSelect";
import virualSelect from "./zcVituralSelect";
import detail from "./detail";
import table from "./zcTable";

const components = [
  menu,
  iconSelect,
  dialog,
  select,
  virualSelect,
  detail,
  table,
];

export default {
  install(app: App) {
    components.map((c) => {
      app.use(c);
    });
  },
};
