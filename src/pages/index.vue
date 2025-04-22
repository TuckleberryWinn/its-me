<script setup lang="ts">
import DesktopIcon from '@/components/DesktopIcon.vue';
const testList = [
	{
		linkPath: '/dewm',
		iconURL: 'icons/goat.png',
		title: 'DEWM',
	},
	{
		linkPath: '/',
		iconURL: 'icons/goat.png',
		title: 'Goat.mp4.exe',
	},
	{
		linkPath: '/goats',
		iconURL: 'icons/goat_but_bigger.png',
		title: 'Goat.TIFF.exe',
		id: 'icon-but-redder',
		class: 'icon-but-red',
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
