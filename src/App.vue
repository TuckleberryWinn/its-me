<script setup lang="ts">
import { RouterView } from 'vue-router';
import { startScene, endScene } from './managers/threeSceneManager';
import { onUnmounted } from 'vue';

startScene();

onUnmounted(() => {
	endScene();
});
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
	z-index: -2;
	min-width: 100%;
	min-height: 100%;
	max-width: 100%;
	max-height: 100%;
}
</style>
