<script setup lang="ts">
import DesktopIcon from '@/components/DesktopIcon.vue';
import Taskbar from '@/components/Taskbar.vue';
import useWindowManager from '@/composables/useWindowManager';
const { windows, taskbarTabs, appList } = useWindowManager();

import DesktopApp from '@/components/DesktopApp.vue';
import TaskbarApp from '@/components/TaskbarApp.vue';
</script>

<template>
	<main class="main">
		<DesktopIcon
			v-for="app in appList"
			:key="app.appID"
			v-bind="app"
		/>
		<div id="desktop-app-container">
			<DesktopApp
				v-for="window in windows.values"
				:key="window.appData.appID"
			>
			</DesktopApp>
		</div>
		<Taskbar>
			<div id="taskbar-app-container">
				<TaskbarApp v-for="tab in taskbarTabs"></TaskbarApp>
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
