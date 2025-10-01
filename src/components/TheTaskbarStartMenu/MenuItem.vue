<script lang="ts" setup>
import { useMouseInElement } from '@vueuse/core';
import { ref, watch } from 'vue';

const { x, elementX, elementPositionX, y, elementY, elementPositionY, isOutside } =
	useMouseInElement();
const props = defineProps({
	title: String,
	activeMenu: String,
});

const isActiveMenu = ref(false);
watch(
	() => props.activeMenu,
	(newVal, oldVal) => {
		isActiveMenu.value = props.title == props.activeMenu;
	},
);
</script>

<template>
	<div
		class="menu-item"
		:class="{ 'active-menu': isActiveMenu }"
	>
		<div class="icon"></div>
		<h1>
			{{ props.title }}
		</h1>
	</div>
</template>

<style scoped>
.menu-item {
	width: 200px;
	height: 40px;
	border-right: 3px solid rgba(0, 0, 0, 0);
	border-left: 3px solid rgba(0, 0, 0, 0);
	border-top: 3px solid rgba(0, 0, 0, 0);
	border-bottom: 3px solid rgba(0, 0, 0, 0);
	background-color: rgba(65, 4, 87, 0.46);
	border-radius: 0.2rem;
	background-clip: content-box;
	display: flex;
	border: 2px solid transparent;
	border-image: linear-gradient(50deg, rgb(0, 255, 212) 0%, rgb(1, 19, 16) 100%);
	border-image-slice: 1;
}

.active-menu {
	animation: pulse infinite 1.5s;
}

@keyframes pulse {
	0% {
		background-color: rgb(41, 148, 255);
	}
	33% {
		background-color: rgb(66, 160, 253);
	}
	66% {
		background-color: rgb(34, 118, 202);
	}
	100% {
		background-color: rgb(41, 148, 255);
	}
}

.icon {
	height: 24px;
	width: 24px;
	background-color: rgba(240, 248, 255, 0.324);
	align-self: center;
	margin-left: 10px;
}

.menu-item h1 {
	margin-left: 10px;
	color: aliceblue;
	font-family: 'Dewave-5';
	font-weight: bold;
	letter-spacing: 0.3rem;
	align-self: center;
}
</style>
