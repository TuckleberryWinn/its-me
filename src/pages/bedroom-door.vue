<script lang="ts" setup>
import { type CallbackLibrary, setNewSceneCallbacks } from '@/composables/useSceneRaycaster';
import { type SceneData, swapScene } from '@/managers/threeSceneManager';
import ScreenEdgeNavigation from '@/components/ScreenEdgeNavigation.vue';

const SceneCallbacks: CallbackLibrary = {
	onFocus: {},
	onUnfocus: {},
	onLeftMouseDown: {},
	onLeftMouseUp: {},
	onRightMouseDown: {},
	onRightMouseUp: {},
};
setNewSceneCallbacks(SceneCallbacks);

const CameraData: SceneData = {
	position: [-4.2, 1.8, -1.1],
	rotation: [-0.15, 3.6, 0],
};
swapScene(CameraData);
</script>

<template>
	<div class="about">
		<RouterLink to="/bookcase-view">
			<ScreenEdgeNavigation
				direction="right"
				prompt="Look towards bookcase"
			></ScreenEdgeNavigation>
		</RouterLink>
	</div>
</template>

<style scoped></style>
