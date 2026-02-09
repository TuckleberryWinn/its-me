<script lang="ts" setup>
import { swapScene } from '@/managers/threeSceneManager';

swapScene(`DeskDresserView`);
</script>

<template>
	<div class="about">
		<RouterLink to="/">
			<button
				class="scene-nav-button button-to-computer"
				@click="swapScene('DeskCornerView')"
			>
				Towards PC
			</button>
		</RouterLink>
	</div>
</template>

<style scoped>
.about {
	height: 100%;
}

a > .button-to-computer {
	position: absolute;
	bottom: 30%;
	left: 10%;
}
</style>
