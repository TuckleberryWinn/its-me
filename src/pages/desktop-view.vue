<script setup lang="ts">
import { type SceneData, swapScene } from '@/managers/threeSceneManager';
import { type CallbackLibrary, setNewSceneCallbacks } from '@/composables/useSceneRaycaster';

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
	position: [-3.5, 1.2975, -1.48],
	rotation: [-0.1, 1.5708, 0],
};
swapScene(CameraData);
</script>

<template>
	<RouterLink to="/screen-emulator-view">
		<button class="scene-nav-button button-login">Start Computer</button>
	</RouterLink>
</template>

<style scoped>
.button-login {
	position: absolute;
	left: 40%;
	top: 50%;
}
</style>
