<script lang="ts" setup>
import type { AppData } from '@/composables/useWindowManager';
import { taskbarAppClick } from '@/composables/useWindowManager';
import { ref, watch } from 'vue';

const props = defineProps<AppData>();

const isHovered = ref(false);

const marginTop = ref(12);
const topMarginTarget = 4;
const bottomMarginTarget = 16;

const animationClock = setInterval(function () {
	if (props.isTopWindow || isHovered.value) {
		marginTop.value -= 1;
		marginTop.value = Math.max(marginTop.value, topMarginTarget);
	} else {
		marginTop.value += 1;
		marginTop.value = Math.min(marginTop.value, bottomMarginTarget);
	}
	// if (isHovered.value && marginTop.value <= topMarginTarget) {
	// 	console.log('early out top');
	// 	return;
	// }
	// if (isHovered.value) {
	// 	marginTop.value -= 1;
	// }
	// if (!isHovered.value && marginTop.value >= bottomMarginTarget) {
	// 	console.log('early out bottom');
	// 	return;
	// }
	// if (!isHovered.value) {
	// 	marginTop.value += 1;
	// 	return;
	// }
}, 125);

watch(
	() => props.isMinimized,
	(update, outdate) => {
		console.log(isHovered.value);
	},
);
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
	border-top: 3px solid rgba(var(--outer-border), 0.8);
	border-left: 3px solid rgba(var(--outer-border), 0.8);
	border-right: 3px solid rgba(var(--outer-border), 0.8);
	background-color: rgba(var(--inner-border), 0.5);
	padding: 0 1.25rem;
	margin-left: 3px;
	margin-right: 3px;
	margin-top: v-bind(marginTop + 'px');
	border-radius: 0.75rem 0.75rem 0 0;
	animation-name: unHover;
	animation-duration: 2s;
}

.app-button.active-window {
	background-color: rgb(var(--title-accent));
	animation: tabBecomesActive 1s forwards;
}
.app-button.active-window {
	animation: tabBecomesActive 1s backwards;
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
