<script lang="ts" setup>
import useWindowManager, { type AppData } from '@/composables/useWindowManager';

const props = defineProps<AppData>();

const { tryOpenWindow } = useWindowManager();

const openNewWindow = () => {
	console.log(`Try open appID:${props.appID}`);
	tryOpenWindow(props.appID);
};
</script>

<template>
	<div
		class="icon"
		@click="openNewWindow"
	>
		<label>
			<span :style="{ backgroundImage: `url(${iconURL})` }"></span>
			<h4 class="font-vt323">{{ appName || 'Title Not Found.exe' }}</h4>
		</label>
	</div>
</template>

<style scoped>
.icon {
	text-decoration: none;
	color: rgb(255, 255, 255);
	border: 1px solid rgba(255, 255, 255, 0);
	margin: 0.35rem;
	width: 6rem;
}

.icon:hover {
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
	margin-bottom: 1.15rem;
}
</style>
