<script setup lang="ts">
import { RouterView } from 'vue-router';
import { watch, ref, computed } from 'vue';
import Cursor from './components/Cursor.vue';
import { startScene, playScene, pauseScene } from '@/managers/threeSceneManager';
import { setRaycastListeners } from './composables/useSceneRaycaster';
import useWindowData from '@/composables/useWindowData';
const { width, height } = useWindowData(ref(document.body));

setRaycastListeners();

startScene();
if (width.value > 640) {
	playScene();
} else {
	pauseScene();
}

watch([width, height], () => {
	if (width.value > 640) {
		playScene();
	} else {
		pauseScene();
	}
});

const targetAspectRatio = 16 / 9;
const contentSpaceStyle = computed(() => ({
	width:
		width.value > height.value * targetAspectRatio
			? `${height.value * targetAspectRatio}px`
			: `${width.value}px`,
	height:
		width.value > height.value * targetAspectRatio
			? `${height.value}px`
			: `${width.value / targetAspectRatio}px`,
}));
</script>

<template>
	<div class="page">
		<div
			class="content-space"
			:style="contentSpaceStyle"
		>
			<RouterView />
		</div>
		<Cursor />
	</div>
</template>

<style>
.page {
	height: 100dvh;
	width: 100dvw;
	display: flex;
}
.content-space {
	/* background-color: rgba(240, 248, 255, 0.253); */
	position: relative;
	margin: auto auto;
}
.threeCanvas {
	position: absolute;
	left: 0;
	top: 0;
	z-index: -5;
	min-width: 100%;
	min-height: 100%;
	max-width: 100%;
	max-height: 100%;
}
</style>
