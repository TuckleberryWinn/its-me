<script lang="ts" setup>
import useWindowManager from '@/composables/useWindowManager';
const { windows, taskbarTabs, appList } = useWindowManager();

import DesktopApp from '@/components/DesktopApp.vue';
import TaskbarApp from '@/components/TaskbarApp.vue';
import DesktopIcon from '@/components/DesktopIcon.vue';
import Taskbar from '@/components/Taskbar.vue';
import ScanlineShader from '@/components/ScanlineShader.vue';

import BlurryGlass from '@/components/AltShaders/BlurryGlass.vue';
import BoxStyles from '@/components/AltShaders/BoxStyles.vue';

import { type SceneData, swapScene } from '@/managers/threeSceneManager';
import { type CallbackLibrary, setNewSceneCallbacks } from '@/composables/useSceneRaycaster';
import { useFixedAspectRatio } from '@/managers/sceneGlobals';
import { onUnmounted } from 'vue';

const SceneCallbacks: CallbackLibrary = {
	onFocus: {},
	onUnfocus: {},
	onLeftMouseDown: {},
	onLeftMouseUp: {},
	onRightMouseDown: {},
	onRightMouseUp: {},
};
setNewSceneCallbacks(SceneCallbacks);

useFixedAspectRatio.value = false;

onUnmounted(() => {
	useFixedAspectRatio.value = true;
});
</script>

<template>
	<div id="top-level">
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
		</div>
		<ScanlineShader />
		<div class="backdrop-overlay"></div>
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

#top-level {
	height: 100dvh;
	width: 100dvw;
}

.backdrop-overlay {
	height: 100dvh;
	width: 100dvw;
	background-color: black;
	position: absolute;
	top: 0;
	z-index: -2;
}
</style>
