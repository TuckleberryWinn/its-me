<script lang="ts" setup>
import { swapScene } from '@/managers/threeSceneManager';

swapScene(`DeskCornerView`);
</script>

<template>
	<div class="about">
		<RouterLink to="/desk-view">
			<button
				class="scene-nav-button button-sit-down"
				@click="swapScene('DeskView')"
			>
				Sit Down
			</button>
		</RouterLink>
		<RouterLink to="/desk-dresser-view">
			<button
				class="scene-nav-button button-step-back"
				@click="swapScene('DeskDresserView')"
			>
				Step Back
			</button>
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
