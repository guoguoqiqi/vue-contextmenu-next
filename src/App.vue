<template>
	<button @contextmenu.prevent="handleContextMenu">
		右键按钮弹出自定义菜单
	</button>
</template>
<script lang="ts" setup>
import { $contextmenu } from "../index";

const handleContextMenu = ($event: MouseEvent) => {
	$contextmenu({
		x: $event.x,
		y: $event.y,
		menuList: [
			{
				text: "一级菜单",
				icon: "RedoOutlined",
				iconOption: {
					spin: true,
				},
				onClick: () => {},
				children: [
					{
						text: "二级菜单",
						icon: "AlarmClock",
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
				icon: "Apple",
				onClick: () => {},
			},
			{
				text: "一级菜单",
				icon: "List",
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
