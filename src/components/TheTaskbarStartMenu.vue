<script setup lang="ts">
import { ref } from 'vue';
import { useMouseInElement } from '@vueuse/core';

const { x, y, isOutside } = useMouseInElement();
import TheTitleColumn from './TheTaskbarStartMenu/TheTitleColumn.vue';
import MenuItem from './TheTaskbarStartMenu/MenuItem.vue';
import GridMenu from './TheTaskbarStartMenu/GridMenu.vue';

type Menu = {
	title: string;
};

const menuContents: Array<Menu> = [
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
		title: 'Human Things',
	},
];

const activeMenu = ref('none');
const hoverEffectOnMouse = ref(true);
const clickMenuItem = (menuName: string) => {
	if (activeMenu.value == menuName) {
		activeMenu.value = 'none';
		hoverEffectOnMouse.value = true;
	} else if (activeMenu.value == 'none') {
		activeMenu.value = menuName;
		hoverEffectOnMouse.value = false;
	}
};

const updateHoverPosition = (event: MouseEvent) => {
	//Lord forgive my magic numbers.  -12 and -54 are offsets to account for borders, the toolbar, the start menu title bar, and centering the gradiant
	styleObject.value.left = Math.floor(x.value / 4) * 4 - 88;
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
			class="start-menu-list"
			@mousemove="updateHoverPosition"
		>
			<MenuItem
				class="menu-item"
				v-for="item in menuContents"
				:key="item.title"
				:title="item.title"
				v-bind="{ activeMenu }"
				@click="clickMenuItem(item.title)"
			/>
			<span
				class="hover-effect"
				:style="{ left: `${styleObject.left}px`, bottom: `${styleObject.bottom}px` }"
				:class="{ hidden: !hoverEffectOnMouse }"
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
	display: flex;
	height: 400px;
}

.start-menu-list {
	padding: 0.03rem;
	background-color: rgba(137, 43, 226, 0.238);
	overflow: hidden;
	position: relative;
}

.menu-item {
	z-index: 3;
	position: relative;
}

.hover-effect {
	width: 96px;
	height: 96px;
	position: absolute;
	pointer-events: none;
	z-index: 2;
	display: flex;
	overflow: clip;
	transition: transform 1s;
	transform: scale(1);
}

.hover-effect.hidden {
	transition: 1s;
	transform: scale(0);
}

:hover > .hover-effect {
	animation: pulse infinite 1.5s;
	mask-image: radial-gradient(
		rgba(255, 255, 255, 1) 0%,
		rgba(255, 255, 255, 1) 5%,
		rgba(255, 255, 255, 0) 6%,
		rgba(255, 255, 255, 0) 12%,
		rgba(255, 255, 255, 1) 25%,
		rgba(255, 255, 255, 1) 32%,
		rgba(255, 255, 255, 0) 33%,
		rgba(255, 255, 255, 0) 41%,
		rgba(255, 255, 255, 1) 42%,
		rgba(255, 255, 255, 1) 48%,
		rgba(255, 255, 255, 0) 49%,
		rgba(255, 255, 255, 0) 57%,
		rgba(255, 255, 255, 1) 58%,
		rgba(255, 255, 255, 1) 60%,
		rgba(255, 255, 255, 0) 61%,
		rgba(255, 255, 255, 0) 69%,
		rgba(255, 255, 255, 1) 70%,
		rgba(255, 255, 255, 0) 71%
	);
}

@keyframes scalePulse {
	0% {
		transform: scale(1);
	}
	47% {
		transform: scale(1.5);
		opacity: 1;
	}
	50% {
		transform: scale(1.7);
		opacity: 0.2;
	}
	53% {
		transform: scale(1.5);
		opacity: 1;
	}
	100% {
		transform: scale(1);
	}
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
</style>
