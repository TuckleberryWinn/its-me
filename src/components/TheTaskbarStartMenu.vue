<script setup lang="ts">
import TheTitleColumn from './TheTaskbarStartMenu/TheTitleColumn.vue';
</script>

<template>
	<div class="start-menu">
		<TheTitleColumn />
		<div class="start-menu-selection-menu"></div>
	</div>
</template>

<style scoped>
.start-menu {
	background-color: rgba(40, 27, 67, 0.621);
	backdrop-filter: blur(10px);
	width: 200px;
	height: 300px;
	border-top: 5px groove rgba(0, 255, 212, 0.5);
	border-right: 5px groove rgba(0, 255, 212, 0.5);
	overflow: hidden;
	display: flex;
}

.start-menu-selection-menu {
	background-color: blueviolet;
}
</style>
