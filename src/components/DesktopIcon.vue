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
			<span></span>
			<h4>{{ props.title || 'titleNotFound.exe' }}</h4>
		</label>
	</RouterLink>
</template>

<style scoped>
label > span {
	display: block;
	width: 5dvh;
	height: 5dvh;
	aspect-ratio: 1/1;
	background-color: blue;
}
</style>
