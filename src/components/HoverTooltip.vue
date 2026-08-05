<script lang="ts" setup>
import { xCursorOffset, yCursorOffset } from '@/managers/sceneGlobals';
import { nextTick, ref, watch } from 'vue';
import * as useTooltip from '@/composables/useTooltip';

const tooltipRef = ref<HTMLElement | null>(null);

const widthOffset = ref(0);
const heightOffset = ref(0);

watch(
	() => useTooltip.textPrompt.value,
	async (newVal, oldVal) => {
		await nextTick();
		widthOffset.value = tooltipRef.value!.clientWidth / 2;
		heightOffset.value = tooltipRef.value!.clientHeight + 40;
	},
);
</script>

<template>
	<div
		class="tooltip"
		ref="tooltipRef"
		v-show="useTooltip.isActive.value"
		:style="{
			left: `${xCursorOffset - widthOffset}px`,
			top: `${yCursorOffset - heightOffset}px`,
		}"
	>
		{{ useTooltip.textPrompt }}
	</div>
</template>

<style scoped>
.tooltip {
	position: absolute;
	background-color: rgb(55, 239, 239);
	padding: 0.6rem;
	border: 6px solid rgb(5, 143, 143);
	border-radius: 8px;
	white-space: nowrap;
}
</style>
