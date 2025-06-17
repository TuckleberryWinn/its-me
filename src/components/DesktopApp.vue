<script lang="ts" setup>
const props = defineProps({
	appName: String,
	iconURL: String,
});
</script>

<template>
	<div class="app-window">
		<div class="app-header">
			<h1>{{ appName }}DEWM</h1>
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
}

.app-header > h1 {
	color: white;
	font-size: 1.6rem;
}
</style>
