<template>
  <div class="my-context-menu-list-box" :class="customLayoutClass">
    <div
      v-for="menu in menuList"
      class="context-menu-item"
      :class="customItemClass"
      :key="menu.renderKey"
      @click="handleItemClick(menu, $event)"
      @mouseenter="handleItemEnter(menu, $event)"
    >
      <div class="icon">
        <v-el-icon :name="menu.icon || 'copy-document'"></v-el-icon>
      </div>
      <div class="text">{{ menu.text }}</div>
      <div class="arrow">
        <svg
          v-if="menu.children"
          t="1642748940773"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="4223"
          width="100"
          height="100"
        >
          <path
            d="M931.84 498.346667L112.64 20.48C105.813333 17.066667 102.4 17.066667 95.573333 20.48s-10.24 6.826667-10.24 13.653333v955.733334c0 6.826667 3.413333 10.24 10.24 13.653333 3.413333 0 6.826667 3.413333 6.826667 3.413333 3.413333 0 6.826667 0 10.24-3.413333l819.2-477.866667c6.826667-3.413333 6.826667-10.24 6.826667-13.653333s-3.413333-10.24-6.826667-13.653333z"
            fill=""
            p-id="4224"
          ></path>
        </svg>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {
  ContextMenuItem,
  ContextMenuOptions,
  createContextMenu,
  createContextItemMenu,
} from "../utils/contextmenu";
import { randomStr, getDomXY } from "../utils/index";
import {
  defineComponent,
  PropType,
  computed,
  toRefs,
  ref,
  onUnmounted,
  reactive,
} from "vue";

export default defineComponent({
  props: {
    options: {
      type: Object as PropType<ContextMenuOptions>,
      required: true,
    },
  },
  setup(props) {
    const {
      x,
      y,
      width,
      height,
      itemHeight,
      maxHeight,
      bgColor,
      hoverBgColor,
      hoverColor,
      customLayoutClass,
      customItemClass,
      menuList,
    } = toRefs(reactive(props.options));
    let child: any = {
      vm: null,
      container: null,
    };

    menuList.value = menuList.value.map((menu) => ({
      ...menu,
      renderKey: randomStr(),
    }));

    let styleVar = computed(() => {
      return {
        left: (x?.value || 0) + "px",
        top: (y?.value || 0) + "px",
        width: width?.value || "200px",
        height: height?.value || "auto",
        itemHeight: itemHeight?.value || "40px",
        maxHeight: maxHeight?.value || "500px",
        bgColor: bgColor?.value || "#fff",
        hoverBgColor: hoverBgColor?.value || "#ecf5ff",
        hoverColor: hoverColor?.value || "#409eff",
      };
    });

    let handleItemEnter = (menu: ContextMenuItem, $event: MouseEvent) => {
      close();
      let { x, y } = getDomXY($event.target as HTMLElement);
      let { children } = menu;

      if (!children) return;

      child.vm = createContextItemMenu({
        x: x + (Number(width?.value) || 200),
        y,
        menuList: children,
      });

      child.container = document.createElement("div");
      child.vm.mount(child.container);

      document.body.appendChild(child.container);
    };

    let handleItemClick = (menu: ContextMenuItem, $event: MouseEvent) => {
      let { onClick } = menu;
      onClick && onClick();

      createContextMenu.destroy();
      $event.stopPropagation();
    };

    let close = () => {
      if (child.vm && child.container) {
        child.vm.unmount();
        document.body.removeChild(child.container);

        child.vm = null;
        child.container = null;
      }
    };

    onUnmounted(() => {
      close();
      document.body.removeEventListener("click", () => {}, false);
    });

    return {
      x,
      y,
      width,
      height,
      maxHeight,
      bgColor,
      hoverBgColor,
      customLayoutClass,
      customItemClass,
      menuList,
      styleVar,
      handleItemEnter,
      handleItemClick,
    };
  },
});
</script>
<style>
.my-context-menu-list-box {
  position: fixed;
  padding: 1px 0;
  left: v-bind("styleVar.left");
  top: v-bind("styleVar.top");
  z-index: 999999;
  width: v-bind("styleVar.width");
  height: v-bind("styleVar.height");
  max-height: v-bind("styleVar.maxHeight");
  background: v-bind("styleVar.bgColor");
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
}
.my-context-menu-list-box > .context-menu-item {
  width: 100%;
  height: v-bind("styleVar.itemHeight");
  padding: 5px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.5px solid #eee;
}
.context-menu-item:hover {
  background-color: v-bind("styleVar.hoverBgColor");
  color: v-bind("styleVar.hoverColor");
}
.context-menu-item:last-child {
  border-bottom: none;
}
.context-menu-item > div {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.context-menu-item > div.icon {
  width: 40px;
  flex-shrink: 0;
}
.context-menu-item > div.text {
  flex: 1;
}
.context-menu-item > div.arrow {
  width: 40px;
  flex-shrink: 0;
}
.context-menu-item > div svg {
  width: 1rem;
  height: 1rem;
}
</style>
