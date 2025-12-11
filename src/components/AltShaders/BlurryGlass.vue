<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue';
import { type Coordinate, activeCoords } from '@/managers/shaderStateManager';
import useWindowData from '@/composables/useWindowData';
const { height, width } = useWindowData();

const rowCount = computed(() => Math.min(Math.ceil(height.value / 75), 30));
const columnCount = computed(() => Math.min(Math.ceil(width.value / 75), 20));

for (let i = 0; i < 10; i++) {
	const localX = Math.ceil(Math.random() * rowCount.value);
	const localY = Math.floor(Math.random() * columnCount.value);
	const newEntry: Coordinate = { x: localX, y: localY };
	activeCoords.value.push(newEntry);
}

let offset = 0;
const lightInterval = setInterval(() => {
	activeCoords.value[offset].x = Math.ceil(Math.random() * columnCount.value);
	activeCoords.value[offset].y = Math.ceil(Math.random() * rowCount.value);
	offset += 1;
	offset %= 10;
}, 100);

onUnmounted(() => {
	clearInterval(lightInterval);
});
</script>

<template>
	<div class="grid-menu shader">
		<div class="grid-menu-background"></div>
		<div class="test-box"></div>
		<div class="test-box2"></div>
		<div
			class="box-row"
			v-for="y in rowCount"
		>
			<div
				class="box-item"
				v-for="x in columnCount"
				:key="`box-${x}-${y}`"
				:class="{
					[`box-${x}-${y}`]: true,
				}"
			></div>
		</div>
		<div class="box-overlay"></div>
	</div>
</template>

<style scoped>
.shader {
	width: 100dvw;
	height: calc(100dvh);
	position: absolute;
	z-index: -1;
}

@media (min-width: 640px) {
	.shader {
		height: calc(100dvh - 48px);
	}
}
.box-row {
	display: flex;
	flex-direction: row;
	width: 100%;
	height: 20%;
	margin: auto;
}
.box-item {
	width: 20%;
	height: 100%;
	margin: auto;
	background-color: rgba(240, 248, 255, 0.034);
	border: 2px solid rgba(1, 90, 1, 0.137);
	transition: 1.8s;
}

.box-highlighted {
	background-color: rgba(59, 207, 237, 0.474);
	transition: 0.2s;
}

.grid-menu {
	overflow: visible;
	display: flex;
	flex-direction: column-reverse;
}
.grid-menu-background {
	position: absolute;
}

.test-box {
	width: 4px;
	height: 100dvh;
	backdrop-filter: invert(10%);
	animation: slideX infinite 10s linear -1s;
	position: absolute;
}
.test-box2 {
	width: 100dvw;
	height: 4px;
	backdrop-filter: invert(20%);
	animation: slideY infinite 10s linear;
	position: absolute;
}
.box-overlay {
	backdrop-filter: blur(4px);
	position: absolute;
	height: 100dvh;
	width: 100dvw;
}

@keyframes slideX {
	0% {
		transform: translate(0, 0);
	}
	50% {
		transform: translate(100dvw, 0);
	}
	100% {
		transform: translate(0, 0);
	}
}
@keyframes slideY {
	0% {
		transform: translate(0, 0);
	}
	50% {
		transform: translate(0, calc(-100dvh + 48px));
	}
	100% {
		transform: translate(0, 0);
	}
}
</style>
