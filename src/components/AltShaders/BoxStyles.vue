<script setup lang="ts">
import { ref, watch } from 'vue';
import { activeCoords } from '@/managers/shaderStateManager';

const boxStyles = ref<HTMLDivElement | null>(null);

const styleElement = document.createElement('style');

watch(boxStyles, (newVal) => {
	if (!newVal) {
		return;
	}
	newVal.appendChild(styleElement);
});
watch(
	activeCoords,
	(newVal) => {
		styleElement.innerHTML = newVal
			.map(
				(coord) =>
					`body .box-item.box-${coord.x}-${coord.y} {background-color: rgba(56, 220, 241,.6)}`,
			)
			.join('\n');
	},
	{ deep: true },
);
</script>

<template>
	<div
		ref="boxStyles"
		class="box-styles"
	></div>
</template>

<style scoped></style>
