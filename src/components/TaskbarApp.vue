<script lang="ts" setup>
import type { AppData } from '@/composables/useWindowManager';

const props = defineProps<AppData>();
</script>

<template>
	<div
		class="button"
		:class="appID"
	>
		<span class="icon"></span>
		<h1>{{ appName }}</h1>
	</div>
</template>

<style scoped>
.button {
	border: 2px solid black;
	background-color: pink;
	height: 90%;
	padding: 8px;
}
</style>
