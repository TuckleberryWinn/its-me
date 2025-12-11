<script setup lang="ts">
import useWindowManager from '@/composables/useWindowManager';
const { windows, taskbarTabs, appList } = useWindowManager();
import { watch } from 'vue';

import { startScene, playScene, pauseScene } from '@/managers/threeSceneManager';
import useWindowData from '@/composables/useWindowData';
const { width } = useWindowData();

import MobileBio from '@/components/MobileBio.vue';
import DesktopApp from '@/components/DesktopApp.vue';
import TaskbarApp from '@/components/TaskbarApp.vue';
import DesktopIcon from '@/components/DesktopIcon.vue';
import Taskbar from '@/components/Taskbar.vue';
import ScanlineShader from '@/components/ScanlineShader.vue';

import Cursor from '@/components/Cursor.vue';
import BlurryGlass from '@/components/AltShaders/BlurryGlass.vue';
import BoxStyles from '@/components/AltShaders/BoxStyles.vue';

startScene();
if (width.value > 640) {
	playScene();
} else {
	pauseScene();
}
watch(width, () => {
	if (width.value > 640) {
		playScene();
	} else {
		pauseScene();
	}
});
</script>

<template>
	<div id="top-level">
		<MobileBio class="view-mobile"></MobileBio>
		<div class="view-full">
			<main class="main">
				<BlurryGlass />
				<BoxStyles />
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
						:key="window.appID"
						v-bind="window"
					>
					</DesktopApp>
				</div>
				<Taskbar>
					<div id="taskbar-app-container">
						<TaskbarApp
							v-for="tab in taskbarTabs"
							:key="tab.appID"
							v-bind="tab"
						></TaskbarApp>
					</div>
				</Taskbar>
			</main>
			<Cursor />
		</div>
		<ScanlineShader />
	</div>
</template>

<style scoped>
.main {
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	align-content: flex-start;
}

#taskbar-app-container {
	display: flex;
	flex-wrap: nowrap;
}

.view-full {
	display: none;
}
.view-mobile {
	display: flex;
}

@media (min-width: 640px) {
	.view-full {
		display: block;
	}
	.view-mobile {
		display: none;
	}
}
</style>
