<script lang="ts" setup>
import type { AppData } from '@/composables/useWindowManager';
import { taskbarAppClick } from '@/composables/useWindowManager';
import { ref } from 'vue';

const props = defineProps<AppData>();
</script>

<template>
	<div
		class="app-button clickable"
		:class="{ appID, 'active-window': isTopWindow }"
		@click="taskbarAppClick(appID)"
	>
		<span class="icon clickable"></span>
		<h1 class="clickable font-vt323">{{ appName }}</h1>
	</div>
</template>

<style scoped>
* {
	--header-background: 31, 22, 51;
	--outer-border: 60, 110, 166;
	--inner-border: 17, 69, 81;
	--title-accent: 232, 131, 234;
	--control-button: 232, 131, 234;
	--close-button: 211, 45, 207;

	--blue-white: 215, 233, 254;
}

.app-button {
	border-top: 3px solid rgba(var(--outer-border), 0.8);
	border-left: 3px solid rgba(var(--outer-border), 0.8);
	border-right: 3px solid rgba(var(--outer-border), 0.8);
	background-color: rgba(var(--inner-border), 0.5);
	padding: 0 1.25rem;
	margin-left: 3px;
	margin-right: 3px;
	margin-top: 12px;
	border-radius: 0.75rem 0.75rem 0 0;
	animation-name: unHover;
	animation-duration: 2s;
}

.app-button:hover {
	animation-name: hover;
	animation-duration: 2s;
}

.app-button.active-window {
	background-color: rgb(var(--title-accent));
	margin-top: 4px;
}

.app-button:hover {
	background-color: rgba(83, 199, 220, 0.68);
}

h1 {
	line-height: 32px;
	color: rgb(var(--blue-white));
	font-size: 1.75rem;
	font-kerning: normal;
}

@keyframes hover {
	from {
		margin-top: 12px;
	}
	to {
		margin-top: 4px;
	}
}
@keyframes unHover {
	from {
		margin-top: 4px;
	}
	to {
		margin-top: 12px;
	}
}
</style>
