<script setup lang="ts">
import DesktopIcon from '@/components/DesktopIcon.vue';

const testList = [
	{
		appName: 'DEWM',
		iconURL: '/src/assets/ui/64xDewm.png',
	},
	{
		appName: 'exe not found.exe',
		iconURL: '/src/assets/ui/64xGithub.png',
	},
	{
		appName: 'bop box',
		iconURL: 'icons/goat_but_bigger.png',
	},
];

import DesktopApp from '@/components/DesktopApp.vue';
</script>

<template>
	<main class="main">
		<DesktopIcon
			v-for="item in testList"
			:key="item.appName"
			v-bind="item"
		/>
		<DesktopApp />
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
