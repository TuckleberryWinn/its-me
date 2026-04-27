<script lang="ts" setup>
import { ref } from 'vue';
import { xCursorOffset, yCursorOffset } from '@/managers/sceneGlobals';
import cursorAcid from '@/assets/ui/48xCursorSet-Sheet.png';

const frameInterval = ref(0);

setInterval(() => {
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
		currentCursor.value = Cursor.default;
	}
});
</script>

<template>
	<div
		:style="{
			left: `${xCursorOffset - 16}px`,
			top: `${yCursorOffset - 16}px`,
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
