<script setup lang="ts">
import { RouterView } from 'vue-router';
import PageHeader from './components/PageHeader.vue';
import PageFooter from './components/PageFooter.vue';

import { startScene } from './composables/threeSceneManager';
startScene();
</script>

<template>
	<div id="pageContent">
		<PageHeader />
		<RouterView />
		<PageFooter />
	</div>
</template>

<style>
#pageContent {
	background-color: rgba(133, 139, 142, 0.192);
}
.threeCanvas {
	position: absolute;
	left: 0;
	top: 0;
	z-index: -1;
}
</style>
