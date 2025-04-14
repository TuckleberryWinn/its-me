<script setup lang="ts">
import { RouterView } from 'vue-router';
import PageHeader from './components/PageHeader.vue';
import PageFooter from './components/PageFooter.vue';

import { startScene } from './composables/threeSceneManager';
startScene();
</script>

<template>
	<div class="page">
		<PageHeader />
		<RouterView />
		<PageFooter />
	</div>
</template>

<style scoped>
.page {
	background-color: rgb(133, 139, 142);
}
</style>
