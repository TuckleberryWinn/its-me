<script setup lang="ts">
import { RouterView } from 'vue-router';
import PageHeader from './components/PageHeader.vue';
import PageFooter from './components/PageFooter.vue';

import { startScene, endScene } from './managers/threeSceneManager';
import { onUnmounted } from 'vue';

startScene();

onUnmounted(() => {
	endScene();
});
</script>

<template>
	<div id="pageContent">
		<PageHeader />
		<RouterView />
		<PageFooter />
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
</style>
