import { DefineComponent, PropType, defineComponent, useAttrs } from "vue";
import { MenuItem } from "./types";
import * as Icons from "@element-plus/icons-vue";

export default defineComponent({
  props: {
    data: {
      type: Array as PropType<MenuItem[]>,
      required: true,
    },
    router: {
      type: Boolean,
      default: false,
    },
    defaultActive: {
      type: String,
      default: "",
    },
  },

  setup(props) {
    const attrs = useAttrs();
    let renderIcon = (icon?: string) => {
      if (!icon) {
        return null;
      }
      const iconComp = (Icons as { [key: string]: DefineComponent })[icon];
      return (
        <>
          <el-icon>
            <iconComp />
          </el-icon>
        </>
      );
    };
    let renderMenu = (data: MenuItem[]) => {
      return data.map((item) => {
        let slots = {
          title() {
            return (
              <>
                {renderIcon(item.icon)}
                <span>{item.name}</span>
              </>
            );
          },
        };

        if (item.children?.length) {
          return (
            <el-sub-menu index={item.index} v-slots={slots}>
              {renderMenu(item.children)}
            </el-sub-menu>
          );
        } else {
          return (
            <el-menu-item index={item.index}>
              {renderIcon(item.icon)}
              <span>{item.name}</span>
            </el-menu-item>
          );
        }
      });
    };
    return () => {
      return (
        <el-menu
          default-active={props.defaultActive}
          router={props.router}
          class="el-menu-vertical-demo"
          {...attrs}
        >
          {renderMenu(props.data)}
        </el-menu>
      );
    };
  },
});
