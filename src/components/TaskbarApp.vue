<script lang="ts" setup>
import type { AppData } from '@/composables/useWindowManager';
import { taskbarAppClick } from '@/composables/useWindowManager';
import { ref, watch } from 'vue';

const props = defineProps<AppData>();

const isHovered = ref(false);
</script>

<template>
	<div
		class="app-button clickable"
		:class="{ appID, 'active-window': isTopWindow }"
		@click="taskbarAppClick(appID)"
		@mouseenter="isHovered = true"
		@mouseleave="isHovered = false"
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
	border-top: 4px solid rgba(var(--outer-border), 0.8);
	border-left: 4px solid rgba(var(--outer-border), 0.8);
	border-right: 4px solid rgba(var(--outer-border), 0.8);
	background-color: rgba(201, 57, 230, 0.586);
	padding: 0 1.25rem;
	margin-left: 3px;
	margin-right: 3px;
	margin-top: v-bind(marginTop + 'px');
	border-radius: 0.75rem 0.75rem 0 0;
	animation-name: unHover;
	animation-duration: 2s;
	margin-top: 15px;
	transition: 1s ease-in;
}

.app-button.active-window {
	background-color: rgb(106, 3, 106);
	border-color: rgb(213, 61, 178);
	animation: tabBecomesActive 1s forwards;
	margin-top: 6px;
	transition: 1s ease-in;
}

h1 {
	line-height: 32px;
	color: rgb(var(--blue-white));
	font-size: 1.75rem;
	font-kerning: normal;
}

@keyframes tabBecomesActive {
	from {
		/* top-margin: v-bind(topMarginTarget);
		background-color: yellow; */
	}
	to {
		/* margin-top: v-bind(marginTop);
		background-color: red; */
	}
}
</style>
