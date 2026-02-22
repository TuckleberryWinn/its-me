<script lang="ts" setup>
import { type SceneData, swapScene } from '@/managers/threeSceneManager';
import { type CallbackLibrary, setNewSceneCallbacks } from '@/composables/useSceneRaycaster';

const SceneCallbacks: CallbackLibrary = {
	onFocus: {
		Floor017: () => {
			console.log('~Gain Focus');
		},
	},
	onUnfocus: {
		Floor017: () => {
			console.log('~Lose Focus');
		},
	},
	onLeftMouseDown: {
		Floor017: () => {
			console.log('~L Mouse Down');
		},
	},
	onLeftMouseUp: {
		Floor017: () => {
			console.log('~L Mouse Up');
		},
	},
	onRightMouseDown: {
		Floor017: () => {
			console.log('~R Mouse Down');
		},
	},
	onRightMouseUp: {
		Floor017: () => {
			console.log('~R Mouse Up');
		},
	},
};
setNewSceneCallbacks(SceneCallbacks);
const CameraData: SceneData = {
	position: [-2.4, 1.7, -0.25],
	rotation: [-0.3, 0.9, 0],
};
swapScene(CameraData);
</script>

<template>
	<div class="about">
		<RouterLink to="/desk-view">
			<button class="scene-nav-button button-sit-down">Sit Down</button>
		</RouterLink>
		<RouterLink to="/desk-dresser-view">
			<button class="scene-nav-button button-step-back">Step Back</button>
		</RouterLink>
	</div>
</template>

<style scoped>
.about {
	height: 100%;
}

a > .button-sit-down {
	position: absolute;
	bottom: 30%;
	right: 20%;
}
a > .button-step-back {
	position: absolute;
	bottom: 5%;
	left: 35%;
}
</style>
