<script lang="ts" setup>
import { ref } from 'vue';

const emit = defineEmits(['response']);

const minHeight = ref(440);
const minWidth = ref(492);

const registerMinSize = () => {
	const payload = [minHeight.value, minWidth.value];
	emit('response', payload);
};
registerMinSize();
</script>

<template>
	<div id="under-construction">
		<h2>
			Thank you for stopping by! I will be updating this project regularly with the intention of it
			being the hub for my games, art, music, case studies, and write ups.
		</h2>
		<br />
		<h2>
			If you're here early, you're likely looking for the mobile view that has my Discord and Itch
			links. Get that screen under 640px wide and hit me up!
		</h2>
		<div class="gif"></div>
	</div>
</template>

<style scoped>
h2 {
	font-size: 1.25rem;
	color: aliceblue;
	text-align: center;
}

#under-construction {
	max-width: 640px;
	margin: auto;
}
.gif {
	background-image: url(/src/assets/images/construction.gif);
	width: 100%;
	min-height: 16rem;
	background-repeat: no-repeat;
	background-size: contain;
	background-position: center;
	overflow: visible;
}
</style>
