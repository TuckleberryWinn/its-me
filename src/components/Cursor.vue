<script lang="ts" setup>
import { ref } from 'vue';
import cursorSheet from '@/assets/ui/32x_cursorSheet.png';

const xOffset = ref(0);
const yOffset = ref(0);
const cursorFrame = ref('');
cursorFrame.value = cursorSheet;

document.addEventListener('mousemove', (x) => {
	xOffset.value = x.pageX;
	yOffset.value = x.pageY;
	console.log(xOffset.value, xOffset.value);
});
</script>

<template>
	<div
		:style="{
			left: `${xOffset}px`,
			top: `${yOffset}px`,
			backgroundImage: `url(${cursorFrame})`,
		}"
		class="test"
	></div>
</template>

<style>
.test {
	width: 32px;
	aspect-ratio: 1;
	position: absolute;
	pointer-events: none;
}
</style>
