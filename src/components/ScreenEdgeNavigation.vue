<script setup lang="ts">
import * as useTooltip from '@/composables/useTooltip';
import { ref, computed, useTemplateRef } from 'vue';
import useWindowData from '@/composables/useWindowData';
const hoverRegion = ref();
const { width, height } = useWindowData(hoverRegion);

const props = defineProps({
	prompt: {
		type: String,
		default: 'No tooltip provided!',
	},
	direction: {
		type: String,
		default: 'Error',
	},
});
const gridCenter = computed(() => ({ transform: `translate3d(0, 0, -${height.value}px)` }));
console.log(props.direction);
const directionalLayout = computed(() => {
	if (props.direction == 'up') {
		return `rotateX(-90deg) translate3d(0, ${height.value / 2}px, -${height.value / 2}px)`;
	} else if (props.direction == 'right') {
		return `rotateY(-90deg) translate3d(-${height.value / 2}px, 0, -${width.value / 2}px) scaleX(${height.value / width.value})`;
	} else if (props.direction == 'down') {
		return `rotateX(90deg) translate3d(0, -${height.value / 2}px, -${height.value / 2}px)`;
	} else if (props.direction == 'left') {
		return `rotateY(90deg) translate3d(${height.value / 2}px, 0, -${width.value / 2}px) scaleX(${height.value / width.value})`;
	} else {
		console.warn(
			'ScreenEdgeNavigation was not passed proper direction prop.  Received: ',
			props.direction,
		);
		return '';
	}
});
</script>

<template>
	<div
		class="hover-region"
		ref="hoverRegion"
	>
		<div
			:class="direction"
			:style="{ transform: directionalLayout }"
			@mouseenter="useTooltip.addUIPrompt(prompt, direction)"
			@mouseleave="useTooltip.removeUIPrompt()"
		></div>
	</div>
</template>

<style scoped>
.hover-region {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	user-select: none;
	width: 100dvw;
	height: 100dvh;
	perspective: 1500px;
	pointer-events: none;
}
.hover-region > div {
	position: fixed;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.175);
	pointer-events: all;
	z-index: 2;
}
</style>
