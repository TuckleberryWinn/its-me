<script lang="ts" setup>
import { xCursorOffset, yCursorOffset } from '@/managers/sceneGlobals';
import { computed, onMounted, ref, watch } from 'vue';
import * as useTooltip from '@/composables/useTooltip';

const tooltipRef = ref<HTMLElement | null>(null);

watch(
	() => useTooltip.textPrompt.value,
	(newVal, oldVal) => {
		useTooltip.widthOffset.value = tooltipRef.value!.clientWidth / 2;
		useTooltip.heightOffset.value = tooltipRef.value!.clientHeight + 20;
		console.log(useTooltip.widthOffset.value);
	},
);
onMounted(() => {
	useTooltip.widthOffset.value = tooltipRef.value!.clientWidth / 2;
	useTooltip.heightOffset.value = tooltipRef.value!.clientHeight + 20;
	console.log(useTooltip.widthOffset.value);
});
</script>

<template>
	<div
		class="tooltip"
		ref="tooltipRef"
		v-show="useTooltip.isActive"
		:style="{
			left: `${xCursorOffset - useTooltip.widthOffset.value}px`,
			top: `${yCursorOffset - useTooltip.heightOffset.value}px`,
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
