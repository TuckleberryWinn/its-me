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
	position: [-1.2, 1.8, 1.9],
	rotation: [-0.25, 1.488, 0],
};
swapScene(CameraData);
</script>

<template>
	<div class="about">
		<RouterLink to="/desk-dresser-view">
			<ScreenEdgeNavigation
				direction="right"
				prompt="Look towards desk"
			></ScreenEdgeNavigation>
		</RouterLink>
		<RouterLink to="/bedroom-door">
			<ScreenEdgeNavigation
				direction="down"
				prompt="Look towards door"
			></ScreenEdgeNavigation>
		</RouterLink>
		<RouterLink to="/bedroom-door">
			<ScreenEdgeNavigation
				direction="left"
				prompt="Look towards door"
			></ScreenEdgeNavigation>
		</RouterLink>
	</div>
</template>

<style scoped></style>
