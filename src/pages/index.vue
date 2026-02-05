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
	</div>
</template>

<style scoped>
.about {
	height: 100%;
}

a > .button-sit-down {
	position: absolute;
	top: 60%;
	right: 20%;
}
</style>
