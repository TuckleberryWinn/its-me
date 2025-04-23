<script lang="ts" setup>
import { RouterLink } from 'vue-router';

const props = defineProps({
	linkPath: String,
	iconURL: String,
	title: String,
});
</script>

<template>
	<RouterLink to="/apps/dewm">
		<label>
			<span :style="{ backgroundImage: `url(${props.iconURL})` }"></span>
			<h4 class="font-vt323">{{ props.title || 'Title Not Found.exe' }}</h4>
		</label>
	</RouterLink>
</template>

<style scoped>
a {
	text-decoration: none;
	color: rgb(255, 255, 255);
	border: 1px solid rgba(255, 255, 255, 0);
	margin: 0.35rem;
	width: 6rem;
}

a:hover {
	background-color: rgba(0, 255, 255, 0.203);
	border-color: rgba(255, 255, 255, 0.5);
	box-sizing: border-box;
}

label {
	text-align: center;
}

label > span {
	display: block;
	width: 4.5rem;
	aspect-ratio: 1/1;
	background-repeat: no-repeat;
	background-position: center;
	background-size: 100% 100%;
	image-rendering: pixelated;
	border-radius: 20%;
	margin-left: auto;
	margin-right: auto;
	margin-top: 0.25rem;
}

h4 {
	filter: drop-shadow(0.05rem 0.05rem 0.2rem black);
	font-size: 1.15rem;
	height: 2.3rem;
}
</style>
