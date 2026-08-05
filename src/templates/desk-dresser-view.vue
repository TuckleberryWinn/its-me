<script lang="ts" setup>
import { type CallbackLibrary, setNewSceneCallbacks } from '@/composables/useSceneRaycaster';
import { type SceneData, swapScene } from '@/managers/threeSceneManager';

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
	position: [0, 0, 0],
	rotation: [0, 0, 0],
};
swapScene(CameraData);
</script>

<template>
	<div class="about">
		<RouterLink to="/">
			<button class="scene-nav-button button-to-computer">To Home</button>
		</RouterLink>
	</div>
</template>

<style scoped>
a > .button-to-computer {
	position: absolute;
	bottom: 30%;
	left: 10%;
}
</style>
