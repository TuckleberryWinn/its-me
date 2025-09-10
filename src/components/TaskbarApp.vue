<script lang="ts" setup>
import type { AppData } from '@/composables/useWindowManager';

const props = defineProps<AppData>();
</script>

<template>
	<div
		class="app-button clickable"
		:class="appID"
	>
		<span class="icon clickable"></span>
		<h1 class="clickable">{{ appName }}</h1>
	</div>
</template>

<style scoped>
.app-button {
	border-top: 4px solid rgba(0, 0, 0, 0.8);
	border-left: 4px solid rgba(0, 0, 0, 0.8);
	border-right: 4px solid rgba(0, 0, 0, 0.8);
	background-color: rgba(83, 200, 220, 0.5);
	padding: 0 1.25rem;
	margin-top: 6px;
	margin-left: 3px;
	margin-right: 3px;
	border-radius: 0.75rem 0.75rem 0 0;
}

.app-button:hover {
	background-color: rgba(83, 199, 220, 0.68);
}

h1 {
	line-height: 38px;
}
</style>
