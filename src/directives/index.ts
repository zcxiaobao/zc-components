import { App } from "vue";

// 默认返回格式为 Record<string, unknown>
const modules = import.meta.glob("./modules/**.ts", {
  // eager 急切模式，直接返回加载完成的 Module
  eager: true,
});
let mapDirectives = new Map();

Object.keys(modules).forEach((key) => {
  if (modules[key] && (modules[key] as any).default) {
    const path = key.replace(/^\.\/|\.ts|\.js/g, "").split("/");
    const newKey = path[path.length - 1];
    mapDirectives.set(newKey, (modules[key] as any).default);
  }
});

export default {
  install(app: App) {
    mapDirectives.forEach((dirctive, key) => {
      app.directive(key, dirctive);
    });
  },
};
