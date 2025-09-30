<script lang="ts" setup>
import { useMouseInElement } from '@vueuse/core';

const { x, elementX, elementPositionX, y, elementY, elementPositionY, isOutside } =
	useMouseInElement();
const props = defineProps({
	title: String,
});
</script>

<template>
	<div class="item-background">
		<div class="menu-item">
			<div class="icon"></div>
			<h1>
				{{ props.title }}
			</h1>
		</div>
	</div>
</template>

<style scoped>
.item-background {
	background: linear-gradient(90deg, rgba(0, 255, 212, 1) 0%, rgb(16, 157, 134) 100%);
	overflow: hidden;
	overflow: clip;
}

.menu-item {
	width: 200px;
	height: 1.8em;
	border-right: 1px solid rgba(0, 0, 0, 0);
	border-left: 1px solid rgba(0, 0, 0, 0);
	border-top: 1px solid rgba(0, 0, 0, 0);
	border-bottom: 1px solid rgba(0, 0, 0, 0);
	background-color: rgba(65, 4, 87, 0.857);
	border-radius: 0.2rem;
	background-clip: content-box;
	display: flex;
	flex-flow: row;
	overflow: hidden;
	overflow: clip;
}

@keyframes pulse {
	0% {
		background-color: rgb(41, 148, 255);
	}
	25% {
		background-color: rgb(42, 113, 184);
	}
	50% {
		background-color: rgb(41, 148, 255);
	}
	75% {
		background-color: rgb(28, 97, 165);
	}
	100% {
		background-color: rgb(41, 148, 255);
	}
}

.icon {
	height: 24px;
	width: 24px;
	background-color: rgba(240, 248, 255, 0.324);
	align-self: center;
	margin-left: 10px;
}

.menu-item h1 {
	margin-left: 10px;
	color: aliceblue;
	font-family: 'Dewave-5';
	font-weight: bold;
	letter-spacing: 0.3rem;
	align-self: center;
}
</style>
