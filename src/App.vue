<script setup lang="ts">
import { useRoute, RouterView } from 'vue-router';
import { watch, ref, computed } from 'vue';
import { startScene, playScene, pauseScene } from '@/managers/threeSceneManager';
import { setRaycastListeners } from './composables/useSceneRaycaster';
import useWindowData from '@/composables/useWindowData';
const { width, height } = useWindowData(ref(document.body));
import { useFixedAspectRatio } from './managers/sceneGlobals';

import DesktopCursor from './components/DesktopCursor.vue';
import GlobalCursor from './components/GlobalCursor.vue';
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

//Watches for url to toggle which cursor to use
const route = useRoute();
const isDesktopView = computed(() => route.path === '/screen-emulator-view');
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
		<HoverTooltip></HoverTooltip>
		<DesktopCursor v-if="isDesktopView" />
		<GlobalCursor v-else></GlobalCursor>
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
/* MOBILE VIEW TEMP OVERRIDE HERE. SET BACK TO 640px ONCE SCENE IS READY */
@media (min-width: 6400px) {
	.view-full {
		display: block;
	}
	.view-mobile {
		display: none;
	}
}
</style>
