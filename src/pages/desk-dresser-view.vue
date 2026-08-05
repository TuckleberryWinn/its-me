<script lang="ts" setup>
import { type CallbackLibrary, setNewSceneCallbacks } from '@/composables/useSceneRaycaster';
import { type SceneData, swapScene } from '@/managers/threeSceneManager';
import { loadDresserShaderCube } from '@/composables/useSceneObjects';
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

const CameraData: SceneData = {
	position: [-2.4, 1.8, 2.6],
	rotation: [-0.3, 0.2, 0],
};
swapScene(CameraData);
loadDresserShaderCube();
</script>

<template>
	<div class="about">
		<RouterLink to="/">
			<button class="scene-nav-button button-to-computer">Towards PC</button>
		</RouterLink>
		<RouterLink to="/bookcase-view">
			<button class="scene-nav-button button-to-bookcase">Towards Bookcase</button>
		</RouterLink>
	</div>
</template>

<style scoped>
a > .button-to-computer {
	position: absolute;
	bottom: 50%;
	left: 30%;
}
a > .button-to-bookcase {
	position: absolute;
	bottom: 30%;
	left: 10%;
}
</style>
