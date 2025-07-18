<script lang="ts" setup>
import { useDraggable } from '@vueuse/core';

const props = defineProps({
	appName: String,
	iconURL: String,
});
</script>

<template>
	<div class="app-window">
		<div class="app-header">
			<div class="app-title">
				<h1>{{ appName }}ᗪ乇山爪</h1>
			</div>
			<div class="control-buttons">
				<div class="control-minimize">-</div>
				<div class="control-maximize">+</div>
				<div class="control-close">X</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.app-window {
	width: min(60%, 1200px);
	min-width: 16rem;
	min-height: 9rem;
	height: auto;
	aspect-ratio: 16/9;
	background-color: grey;
	border: 0.155rem solid #00ffd4;
	border-radius: 0.5rem 0.5rem 0 0;
	resize: horizontal;
}
.app-header {
	height: 2rem;
	background: linear-gradient(0deg,rgba(90, 0, 138, 1) 8%, rgba(66, 145, 214, 1) 35%, rgba(0, 255, 212, 1) 65%, #00ffd4 100%);;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.app-header > div {
	padding: 0 0.5rem;
}

.app-header > h1 {
	color: white;
	font-size: 1.6rem;
}

.app-title {
}

.control-buttons {
}

.control-buttons > div {
	display: inline-block;
	height: 1.5rem;
	aspect-ratio: 1;
	border: 2px solid rgb(79, 7, 142);
	border-radius: 0.4rem;
	margin-left: 0.4rem;
  background-color: rgba(1, 110, 187, 0.7);
}

.control-buttons > .control-close {
  background-color: rgba(255, 7, 7, 0.7);
}
.control-buttons > div > span {
	height: 1rem;
	width: 1rem;
	background-color: black;
}
</style>
