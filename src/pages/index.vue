<script lang="ts" setup>
import { swapScene } from '@/managers/threeSceneManager';
</script>

<template>
	<div class="about">
		<h2>About</h2>
		<RouterLink to="/desktop-view"
			><button @click="swapScene('ScreenView')">Start Computer</button></RouterLink
		>
	</div>
</template>

<style>
.about {
	background-color: rgba(92, 83, 83, 0.489);
}
</style>
