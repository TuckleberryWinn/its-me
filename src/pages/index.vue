<script setup lang="ts">
import DesktopIcon from '@/components/DesktopIcon.vue';
</script>

<template>
	<main class="main">
		<DesktopIcon />
		<DesktopIcon />
		<DesktopIcon />
	</main>
</template>

<style scoped>
.main {
	background-color: rgba(224, 62, 62, 0.014);
	height: 200px;
	display: grid;
	grid-template-columns: auto;
}
</style>
