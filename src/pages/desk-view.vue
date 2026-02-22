<script lang="ts" setup>
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
	position: [-3, 1.23, -1.48],
	rotation: [0, 1.5708, 0],
};
swapScene(CameraData);
</script>

<template>
	<div class="about">
		<RouterLink to="/">
			<button class="scene-nav-button button-get-up">Get Up</button>
		</RouterLink>
		<RouterLink to="/desktop-view">
			<button class="scene-nav-button button-start-pc">Start Computer</button>
		</RouterLink>
	</div>
</template>

<style>
a > .button-start-pc {
	position: absolute;
	top: 50%;
	right: 45%;
}
a > .button-get-up {
	position: absolute;
	bottom: 5%;
	left: 10%;
}
</style>
