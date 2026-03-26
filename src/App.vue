<script setup lang="ts">
import { RouterView } from 'vue-router';
import { watch, ref, computed } from 'vue';
import { startScene, playScene, pauseScene } from '@/managers/threeSceneManager';
import { setRaycastListeners } from './composables/useSceneRaycaster';
import useWindowData from '@/composables/useWindowData';
const { width, height } = useWindowData(ref(document.body));
import { useFixedAspectRatio } from './managers/sceneGlobals';

import Cursor from './components/Cursor.vue';
import MobileBio from '@/components/MobileBio.vue';
import HoverTooltip from './components/HoverTooltip.vue';
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
const contentSpaceStyle = computed(() => {
	if (useFixedAspectRatio.value) {
		return {
			width:
				width.value > height.value * targetAspectRatio
					? `${height.value * targetAspectRatio}px`
					: `${width.value}px`,
			height:
				width.value > height.value * targetAspectRatio
					? `${height.value}px`
					: `${width.value / targetAspectRatio}px`,
		};
	} else {
		return {
			width: 'inherit',
			height: 'inherit',
		};
	}
});
</script>

<template>
	<div class="page">
		<MobileBio class="view-mobile"></MobileBio>
		<div
			class="content-space view-full"
			:style="contentSpaceStyle"
		>
			<RouterView />
		</div>
		<Cursor />
		<HoverTooltip></HoverTooltip>
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
	overflow: visible;
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

.view-full {
	display: none;
}
.view-mobile {
	display: flex;
	height: 100%;
}

@media (min-width: 640px) {
	.view-full {
		display: block;
	}
	.view-mobile {
		display: none;
	}
}
</style>
