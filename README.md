# Vue3 自定义右键菜单组件

### 最新版本说明

> - 支持自定义菜单项左侧图标，目前仅支持 ElementPlus 中图标，如 CopyDocument，菜单项 icon 参数传 copy-document 即可（中划线格式）

### 效果图

![效果图](https://tva2.sinaimg.cn/large/925b4b59gy1gylfcejquhj20hp06mwey.jpg)
![效果图](https://wx1.sinaimg.cn/mw2000/925b4b59gy1gymims3q8gj210s0azq4a.jpg)

### 安装

```
npm i vue-contextmenu-next
```

### 使用

```
<template>
  <button @contextmenu.prevent="handleContextMenu">
    右键按钮弹出自定义菜单
  </button>
</template>
<script lang="ts" setup>
import { $contextmenu } from "vue-contextmenu-next/index";

const handleContextMenu = ($event: MouseEvent) => {
  $contextmenu({
    x: $event.x,
    y: $event.y,
    menuList: [
      {
        text: "一级菜单",
        icon: "add-location",
        onClick: () => {},
        children: [
          {
            text: "二级菜单",
            icon: "apple",
            children: [
              {
                text: "三级菜单",
              },
            ],
          },
        ],
      },
      {
        text: "一级菜单",
        icon: "camera-filled",
        onClick: () => {},
      },
      {
        text: "一级菜单",
        icon: "list",
        onClick: () => {},
      },
    ],
  });
};
</script>
<style>
html,
body {
  width: 100vw;
  height: 100vh;
}
</style>


```

### 参数说明

- #### 菜单参数

|       参数        |           描述           |  类型  | 默认值  | 必填 |
| :---------------: | :----------------------: | :----: | :-----: | :--: |
|         x         |          X 坐标          | Number |    0    |  否  |
|         y         |          Y 坐标          | Number |    0    |  否  |
|       width       |         菜单宽度         | String |  200px  |  否  |
|      height       |         菜单高度         | String |  auto   |  否  |
|    itemHeight     |        菜单项高度        | String |  40px   |  否  |
|     maxHeight     |       菜单最大高度       | String |  500px  |  否  |
|      bgColor      |       菜单背景颜色       | String |  #fff   |  否  |
|   hoverBgColor    | 菜单项鼠标悬浮时背景颜色 | String | #ecf5ff |  否  |
|    hoverColor     | 菜单项鼠标悬浮时字体颜色 | String | #409eff |  否  |
| customLayoutClass |    菜单容器自定义类名    | String |   无    |  否  |
|  customItemClass  |     菜单项自定义类名     | String |   无    |  否  |
|     menuList      |        菜单项列表        | Array  |   无    |  是  |

- #### 菜单项参数

|   参数    |      描述      |   类型   |    默认值     | 必填 |
| :-------: | :------------: | :------: | :-----------: | :--: |
|   text    |   菜单项文本   |  String  |      无       |  是  |
|   icon    | 菜单项左侧图标 |  String  | copy-document |  否  |
| renderKey | 菜单项渲染 key |  String  |  随机字符串   |  否  |
|  onClick  | 菜单项点击事件 | Function |      无       |  否  |
| children  |  菜单项子菜单  |  String  |    菜单项     |  否  |
