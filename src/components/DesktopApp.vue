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
				<h1>{{ appName }}DEWM</h1>
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
	border: 0.25rem solid rgb(77, 76, 76);
	border-radius: 0.5rem 0.5rem 0 0;
	resize: horizontal;
}
.app-header {
	height: 2rem;
	background-color: blue;
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
	border: 1px solid red;
	border-radius: 0.4rem;
	margin-left: 0.4rem;
}
.control-buttons > div > span {
	height: 1rem;
	width: 1rem;
	background-color: black;
}
</style>
