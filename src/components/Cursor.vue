<script lang="ts" setup>
import { ref } from 'vue';
import cursorSheet from '@/assets/ui/32x_cursorSheet.png';

import cursorAcid from '@/assets/ui/48xCursorSet-Sheet.png';

const xOffset = ref(0);
const yOffset = ref(0);
const cursorFrame = ref('');
cursorFrame.value = cursorSheet;

const frameInterval = ref(0);

const cursorAnimator = setInterval(() => {
	frameInterval.value += 1;
	frameInterval.value %= 8;
}, 125);

enum Cursor {
	default = 0,
	pointer = 1,
	rockOn = 2,
	holding = 3,
	frameNE = 4,
	frameSE = 5,
	frameSW = 6,
	frameNW = 7,
	draggable = 8,
	resizeEW = 9,
	resizeNS = 10,
	resizeSE = 11,
}
const currentCursor = ref<Cursor>(Cursor.default);

document.addEventListener('mousemove', (x) => {
	xOffset.value = Math.floor(x.pageX / 4) * 4;
	yOffset.value = Math.floor(x.pageY / 4) * 4;

	if (x.target instanceof HTMLElement == false) {
		return;
	}

	const classes = x.target.classList;
	if (classes.contains('clickable')) {
		currentCursor.value = Cursor.pointer;
	} else if (classes.contains('draggable')) {
		currentCursor.value = Cursor.draggable;
	} else if (classes.contains('resizeNS')) {
		currentCursor.value = Cursor.resizeNS;
	} else if (classes.contains('resizeEW')) {
		currentCursor.value = Cursor.resizeEW;
	} else if (classes.contains('resizeSE')) {
		currentCursor.value = Cursor.resizeSE;
	} else {
		// console.log('not clickable?', classes);
		currentCursor.value = Cursor.default;
	}
	// console.log(x.target);
});
</script>

<template>
	<div
		:style="{
			left: `${xOffset - 16}px`,
			top: `${yOffset - 16}px`,
			backgroundImage: `url(${cursorAcid})`,
			backgroundPosition: `${frameInterval * -48}px ${currentCursor * -48}px`,
		}"
		class="cursor"
	></div>
</template>

<style>
.cursor {
	width: 48px;
	aspect-ratio: 1;
	position: absolute;
	pointer-events: none;
	image-rendering: pixelated;
}
</style>
