<template>
	<component
		:is="name"
		:style="style"
		:spin="spin"
		:rotate="rotate"
	></component>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
	props: {
		name: {
			type: String,
			required: true,
		},
		iconOption: {
			type: Object,
			default: () => ({}),
		},
	},
	setup(props) {
		const { style, spin, rotate } = props.iconOption;

		return {
			style,
			spin,
			rotate,
		};
	},
});
</script>
