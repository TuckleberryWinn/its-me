<script lang="ts" setup>
import useWindowData from '@/composables/useWindowData';
import { ref, computed } from 'vue';
const { width, height } = useWindowData(ref(document.body));

defineProps({
	link: String,
	displayText: String,
	url: String,
	logo: String,
});

const iconHeight = computed(() => {
	console.log(width.value, height.value, '123123213');
	return height.value > 640 ? 64 : 48;
});

const frameInterval = ref(0);

setInterval(() => {
	frameInterval.value += 1;
	frameInterval.value %= 24;
}, 125);
</script>

<template>
	<a
		:href="link"
		target="_blank"
	>
		<button>
			<div
				class="logo"
				:style="{
					backgroundImage: `url(${logo})`,
					backgroundPosition: `${frameInterval * iconHeight}px ${iconHeight}px`,
				}"
			></div>
			<div class="font-vt323 link-text">{{ displayText }}</div>
		</button>
	</a>
</template>

<style scoped>
a {
	color: inherit;
	text-decoration: inherit;
	width: 100%;
	justify-items: center;
}
button {
	display: flex;
	align-items: center;
	flex-direction: row;
	max-width: 380px;
	width: 80%;
	min-width: 300px;
	margin-bottom: 1rem;
	background: linear-gradient(180deg, rgba(61, 2, 18, 0.486) 35%, rgba(103, 3, 21, 0.539) 85%);
	border: 2px solid rgb(135, 2, 2);
	border-radius: 1.25rem;
}

button > h4 {
	font-size: 1.3rem;
	color: #d32836;
	padding-left: 0.25rem;
	text-align: left;
	display: inline;
	text-shadow:
		0 0 2px #240003,
		0 0 2px #240003,
		0 0 6px #a9083b;
}
button .logo {
	background-color: #3c0101;
	height: 64px;
	aspect-ratio: 1;
	display: inline;
	background-size: auto 100%;
}

.link-text {
	font-size: 1.5rem;
	margin: auto;
	color: #a9083b;
	text-shadow:
		-2px -2px 0 #2f0202,
		2px -2px 0 #2f0202,
		-2px 2px 0 #2f0202,
		2px 2px 0 #2f0202;
}
</style>
