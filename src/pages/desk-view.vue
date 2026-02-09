<script lang="ts" setup>
import { swapScene } from '@/managers/threeSceneManager';

swapScene(`DeskView`);
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
.about {
}
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
