import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as Icons from "@element-plus/icons-vue";
import { UpperCamelCaseToKebabCase } from "./utils";

import zcComponents from "./components";

const app = createApp(App);

for (const [key, component] of Object.entries(Icons)) {
  app.component(`el-icon-${UpperCamelCaseToKebabCase(key)}`, component);
}

app.use(router).use(ElementPlus).use(zcComponents);
app.mount("#app");
