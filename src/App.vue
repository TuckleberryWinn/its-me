<script setup lang="ts">
import { RouterView } from 'vue-router';
import { startScene, endScene } from './managers/threeSceneManager';
import { onUnmounted, ref } from 'vue';

import CursorSource from '@/assets/ui/32x_cursorSheet.png';

startScene();

onUnmounted(() => {
	endScene();
});

const cursorSize = 32;

const cursorSpriteSheet = new Image();
cursorSpriteSheet.src = CursorSource;

const cursorBuffer = ref('');
cursorBuffer.value =
	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAIAAAC0Ujn1AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEDSURBVEhLtZJBEoMwDAP7lr6nn+0LqUGChsVOwoGdvTSSNRz6Wh7jxvT7+wn9Y4LZae0e+rXLeBqjh45rBtOYgy4V9KYxlOpqRjmNiY4+uJBP41gOI5BM40w620AknTVwGgfSWQMK0tnOaRpV6ewCatLZxn8aJemsAGXp7JhGLBX1wYlUtE4jkIpnwKGM9xeepG7mwblMpl2/CUbCJ7+6CnQzAw5lvD/8DxGIpbMClKWzdjpASTq7gJp0tnGaDlCVzhpQkM52OB3gQDrbQCSdNSTTAc7kMAL5dIDjjj64UE4HmEh1NaM3HWAIulQwmA4wd+i4ZjwdYDR00GqWsyPrizLD76QCPOHqP2cAAAAAElFTkSuQmCC';

const cursorTracker = (event) => {
	const computed = Object.fromEntries([...event.target.computedStyleMap().entries()]);
	console.log(computed.cursor);
};

document.body.addEventListener('mousemove', cursorTracker);
</script>

<template>
	<div class="page">
		<RouterView />
	</div>
</template>

<style>
.threeCanvas {
	position: absolute;
	left: 0;
	top: 0;
	z-index: -1;
	min-width: 100%;
	min-height: 100%;
	max-width: 100%;
	max-height: 100%;
}

.page {
	height: 100vh;
	width: 100vw;
	cursor: v-bind(`url('${CursorSource}') `), auto;
}
</style>
