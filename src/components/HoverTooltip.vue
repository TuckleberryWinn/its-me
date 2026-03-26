<script lang="ts" setup>
const props = defineProps({
	style: String,
	content: String,
});
</script>

<template>
	<div class="tooltip"></div>
</template>

<style scoped>
.tooltip {
	position: absolute;
	width: 4rem;
	height: 2rem;
	background-color: aquamarine;
}
</style>
