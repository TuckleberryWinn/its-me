<script lang="ts" setup>
import { type CallbackLibrary, setNewSceneCallbacks } from '@/composables/useSceneRaycaster';
import { type SceneData, swapScene } from '@/managers/threeSceneManager';
import { loadDresserShaderCube } from '@/composables/useSceneObjects';
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
loadDresserShaderCube();
</script>

<template>
	<div class="about">
		<RouterLink to="/desk-dresser-view">
			<ScreenEdgeNavigation direction="bottom"></ScreenEdgeNavigation>
			<button class="scene-nav-button button-to-computer">Towards PC</button>
		</RouterLink>
	</div>
</template>

<style scoped>
.about {
	overflow: visible;
}
a > .button-to-computer {
	position: absolute;
	bottom: 30%;
	right: 10%;
}
</style>
