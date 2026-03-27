<script lang="ts" setup>
import { xCursorOffset, yCursorOffset } from '@/managers/sceneGlobals';
import { computed, onMounted, ref, watch } from 'vue';
const props = defineProps({
	style: String,
	content: {
		type: String,
		default: 'If you see this, shit is fucked :<',
	},
});

const tooltipHalfWidth = ref(0);
const tooltipOffsetHeight = ref(0);
const tooltipRef = ref<HTMLElement | null>(null);

watch(
	() => props.content,
	(newVal, oldVal) => {
		tooltipHalfWidth.value = tooltipRef.value!.clientWidth / 2;
		tooltipOffsetHeight.value = tooltipRef.value!.clientHeight + 20;
		console.log(tooltipHalfWidth.value);
	},
);
onMounted(() => {
	tooltipHalfWidth.value = tooltipRef.value!.clientWidth / 2;
	tooltipOffsetHeight.value = tooltipRef.value!.clientHeight + 20;
	console.log(tooltipHalfWidth.value);
});
</script>

<template>
	<div
		class="tooltip"
		ref="tooltipRef"
		:style="{
			left: `${xCursorOffset - tooltipHalfWidth}px`,
			top: `${yCursorOffset - tooltipOffsetHeight}px`,
		}"
	>
		{{ props.content }}
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
