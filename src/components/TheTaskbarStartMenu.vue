<script setup lang="ts">
import { ref } from 'vue';
import { useMouseInElement } from '@vueuse/core';

const { x, y, isOutside } = useMouseInElement();
import TheTitleColumn from './TheTaskbarStartMenu/TheTitleColumn.vue';
import MenuItem from './TheTaskbarStartMenu/MenuItem.vue';
import GridMenu from './TheTaskbarStartMenu/GridMenu.vue';

const menuContents = [
	{
		title: 'Options',
	},
	{
		title: 'Stuff',
	},
	{
		title: 'Videos',
	},
	{
		title: 'Pictures',
	},
	{
		title: 'Humanity',
	},
];

const updateHoverPosition = (event: MouseEvent) => {
	//Lord forgive my magic numbers.  -12 and -54 are offsets to account for borders, the toolbar, the start menu title bar, and centering the gradiant
	styleObject.value.left = Math.floor(x.value / 4) * 4 - 48;
	styleObject.value.bottom = Math.floor((window.innerHeight - y.value - 90) / 4) * 4;
	styleObject.value.isInside = !isOutside.value;
};

const styleObject = ref({
	bottom: 122,
	left: 15,
	isInside: false,
});
</script>

<template>
	<div class="start-menu">
		<TheTitleColumn />
		<div
			class="start-menu-selection-menu"
			@mousemove="updateHoverPosition"
		>
			<MenuItem
				v-for="item in menuContents"
				:key="item.title"
				v-bind="item"
			/>
			<span
				class="hover-effect"
				:style="{ left: `${styleObject.left}px`, bottom: `${styleObject.bottom}px` }"
			/>
		</div>
		<GridMenu />
	</div>
</template>

<style scoped>
.start-menu {
	background-color: rgba(40, 27, 67, 0.621);
	backdrop-filter: blur(10px);
	border-top: 5px groove rgba(0, 255, 212, 0.9);
	border-right: 5px groove rgba(0, 255, 212, 0.9);
	overflow: hidden;
	display: flex;
}

.start-menu-selection-menu {
	padding: 0.03rem;
	background-color: rgba(137, 43, 226, 0.238);
	overflow: hidden;
}

.hover-effect {
	width: 96px;
	height: 96px;
	position: absolute;
	pointer-events: none;
	z-index: 1;
	display: flex;
	overflow: clip;
}

:hover > .hover-effect {
	animation: pulse infinite 1s;
	mask-image: radial-gradient(
		rgba(255, 255, 255, 1) 0%,
		rgba(255, 255, 255, 1) 10%,
		rgba(255, 255, 255, 0) 11%,
		rgba(255, 255, 255, 1) 40%,
		rgba(255, 255, 255, 0) 41%,
		rgba(255, 255, 255, 0) 69%,
		rgba(255, 255, 255, 1) 70%,
		rgba(255, 255, 255, 0) 71%
	);
}

@keyframes pulse {
	0% {
		background-color: rgb(41, 148, 255);
	}
	25% {
		background-color: rgb(42, 113, 184);
	}
	50% {
		background-color: rgb(41, 148, 255);
	}
	75% {
		background-color: rgb(28, 97, 165);
	}
	100% {
		background-color: rgb(41, 148, 255);
	}
}
</style>
