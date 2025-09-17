<script lang="ts" setup>
import type { AppData } from '@/composables/useWindowManager';
import { ref } from 'vue';

const props = defineProps<AppData>();

const tabVerticalPull = ref(0);

const mouseHover = () => {
	tabVerticalPull.value += 1;
	tabVerticalPull.value = Math.min(tabVerticalPull.value, 8);
};

const styleObject = ref({
	marginTop: '12px',
});
</script>

<template>
	<div
		class="app-button clickable"
		:class="appID"
		:style="styleObject"
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
	background-color: rgba(var(--inner-border), 0.5);
	padding: 0 1.25rem;
	margin-left: 3px;
	margin-right: 3px;
	border-radius: 0.75rem 0.75rem 0 0;
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
</style>
