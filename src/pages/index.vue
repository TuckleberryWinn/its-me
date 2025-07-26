<script setup lang="ts">
import DesktopIcon from '@/components/DesktopIcon.vue';
import Taskbar from '@/components/Taskbar.vue';
import useWindowManager from '@/composables/useWindowManager';
const { windows, openWindow, closeWindow } = useWindowManager();

const appList = [
	{
		appName: 'ᗪ乇山爪',
		iconURL: '/src/assets/ui/64xDewm.png',
		appID: 1,
	},
	{
		appName: 'exe not found.exe',
		iconURL: '/src/assets/ui/64xGithub.png',
		appID: 2,
	},
	{
		appName: 'Shmoogle Dome',
		iconURL: '/src/assets/ui/48xChrome.png',
		appID: 3,
	},
];

import DesktopApp from '@/components/DesktopApp.vue';
import TaskbarApp from '@/components/TaskbarApp.vue';
</script>

<template>
	<main class="main">
		<DesktopIcon
			v-for="app in appList"
			:key="app.appName"
			v-bind="app"
		/>
		<div id="desktop-app-container">
			<DesktopApp :app-Data="appList[0]" />
			<DesktopApp :app-Data="appList[1]" />
		</div>
		<Taskbar>
			<div id="taskbar-app-container">
				123123123
				<TaskbarApp :app-Data="appList[0]" />
				<TaskbarApp :app-Data="appList[1]" />
				<TaskbarApp />
			</div>
		</Taskbar>
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
#taskbar-app-container {
	display: flex;
}
</style>
