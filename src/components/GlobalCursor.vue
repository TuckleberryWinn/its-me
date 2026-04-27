<script setup lang="ts">
import { ref } from 'vue';
import { xCursorOffset, yCursorOffset } from '@/managers/sceneGlobals';
import cursorSheet from '@/assets/ui/64x_global_cursors-Sheet.png';
import { currentGlobalCursor } from '@/composables/useTooltip';

const frameInterval = ref(0);

setInterval(() => {
	frameInterval.value += 1;
	frameInterval.value %= 8;
}, 125);
</script>
<template>
	<div
		:style="{
			left: `${xCursorOffset - 32}px`,
			top: `${yCursorOffset - 32}px`,
			backgroundImage: `url(${cursorSheet})`,
			backgroundPosition: `${frameInterval * -64}px ${currentGlobalCursor * -64}px`,
		}"
		class="cursor"
	></div>
</template>
<style scoped>
.cursor {
	width: 64px;
	aspect-ratio: 1;
}
</style>
