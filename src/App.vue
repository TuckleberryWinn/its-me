<script setup lang="ts">
import { RouterView } from 'vue-router';
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
	z-index: -5;
	min-width: 100%;
	min-height: 100%;
	max-width: 100%;
	max-height: 100%;
}
</style>
