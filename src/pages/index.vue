<script setup lang="ts">
import DesktopIcon from '@/components/DesktopIcon.vue';
import Taskbar from '@/components/Taskbar.vue';
import useWindowManager from '@/composables/useWindowManager';
const { windows, openWindow, closeWindow } = useWindowManager();

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
		appName: 'Shmoogle Dome',
		iconURL: '/src/assets/ui/48xChrome.png',
	},
];

import DesktopApp from '@/components/DesktopApp.vue';
import TaskbarApp from '@/components/TaskbarApp.vue';
</script>

<template>
	<main class="main">
		<DesktopIcon
			v-for="item in testList"
			:key="item.appName"
			v-bind="item"
		/>
		<div class="desktop-app-container">
			<DesktopApp
				v-for="window in windows"
				v-bind="window"
			/>
		</div>
		<Taskbar>
			<div class="taskbar-app-container">
				<span
					class="window-tab"
					v-for="windowToClose in windows"
					:key="windowToClose.instanceID"
					v-bind="windowToClose"
				>
					<span> {{ windowToClose.appName }}</span>
					<button @click="closeWindow(windowToClose)">X</button>
				</span>
				<TaskbarApp> </TaskbarApp>
			</div>
		</Taskbar>
	</main>
</template>

<style scoped>
.window-tab {
	display: inline-block;
	border: 2px solid white;
	height: 1rem;
	color: white;
}
.main {
	height: auto;
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	align-content: flex-start;
	height: 91dvh;
}
</style>
