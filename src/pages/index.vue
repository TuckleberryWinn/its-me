<script lang="ts" setup>
import { activeScene, type SceneData, swapScene } from '@/managers/threeSceneManager';
import { type CallbackLibrary, setNewSceneCallbacks } from '@/composables/useSceneRaycaster';
import { testFunction } from '@/composables/useContextMaterials';

const SceneCallbacks: CallbackLibrary = {
	onFocus: {
		Bedroom_Floor: () => {
			console.log('~Gain Focus');
		},
	},
	onUnfocus: {
		Bedroom_Floor: () => {
			console.log('~Lose Focus');
		},
	},
	onLeftMouseDown: {
		Bedroom_Floor: () => {
			console.log('~L Mouse Down');
		},
	},
	onLeftMouseUp: {
		Bedroom_Floor: () => {
			console.log('~L Mouse Up');
		},
	},
	onRightMouseDown: {
		Bedroom_Floor: () => {
			console.log('~R Mouse Down');
		},
	},
	onRightMouseUp: {
		Bedroom_Floor: () => {
			console.log('~R Mouse Up');
			testFunction();
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
