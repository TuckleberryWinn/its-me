<script setup lang="ts">
import DesktopIcon from '@/components/DesktopIcon.vue';
const testList = [
	{
		linkPath: '/dewm',
		iconURL: '/src/assets/ui/64xDewm.png',
		title: 'DEWM',
	},
	{
		linkPath: '/',
		iconURL: '/src/assets/ui/64xGithub.png',
		title: 'exe not found.exe',
	},
	{
		linkPath: '/goats',
		iconURL: 'icons/goat_but_bigger.png',
		title: 'bop box',
	},
];
</script>

<template>
	<main class="main">
		<DesktopIcon
			v-for="item in testList"
			:key="item.linkPath"
			v-bind="item"
		/>
	</main>
</template>

<style scoped>
.main {
	height: auto;
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	align-content: flex-start;
	height: 91dvh;
}
</style>
