<script setup lang="ts">
import * as useTooltip from '@/composables/useTooltip';
const props = defineProps({
	direction: String,
});
</script>

<template>
	<div
		class="hover-region"
		:class="direction"
		@mouseenter="useTooltip.addUIPrompt('Look Towards Desk')"
		@mouseleave="useTooltip.removeUIPrompt()"
	></div>
</template>

<style scoped>
.hover-region {
	position: absolute;
	background-color: rgba(0, 0, 0, 0.244);
	user-select: none;
}
.left {
	inset: -100dvh 75% -100dvh -100dvw;
}

.bottom {
	inset: 75% -100dvw -100dvh -100dvw;
}

.right {
	inset: -100dvh -100dvw -100dvh 75%;
}

.top {
	inset: -100dvh -100dvw 75% -100dvw;
}
</style>
