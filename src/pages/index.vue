<script setup lang="ts">
import DesktopIcon from '@/components/DesktopIcon.vue';
import Taskbar from '@/components/Taskbar.vue';
import useWindowManager from '@/composables/useWindowManager';
const { windows, taskbarTabs, appList } = useWindowManager();

import DesktopApp from '@/components/DesktopApp.vue';
import TaskbarApp from '@/components/TaskbarApp.vue';

const scramble = () => {
	windows.value.sort(() => {
		return Math.random() - 0.5;
	});
};
</script>

<template>
	<main class="main">
		<DesktopIcon
			v-for="app in appList"
			:key="app.appID"
			v-bind="app"
		/>
		<div id="desktop-app-container">
			<h1
				style="color: white"
				v-for="window in windows"
			>
				{{ window }}
			</h1>
			<DesktopApp
				v-for="window in windows"
				:desktop-window="window"
				:key="window.appData.appID"
				v-bind="window"
			>
			</DesktopApp>
		</div>
		<Taskbar>
			<div id="taskbar-app-container">
				<TaskbarApp
					v-for="tab in taskbarTabs"
					:app-data="tab"
					:key="tab.appID"
					v-bind="tab"
				></TaskbarApp>
			</div>
		</Taskbar>
		<component
			:is="'PopupWindowB'"
			@click="scramble"
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
#taskbar-app-container {
	display: flex;
}
</style>
