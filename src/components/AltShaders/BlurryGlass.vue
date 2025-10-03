<script setup lang="ts">
import { ref } from 'vue';

type Coordinate = {
	x: Number;
	y: Number;
};

const activeCoords = ref<Coordinate[]>([]);

for (let i = 0; i < 10; i++) {
	const localX = Math.ceil(Math.random() * 25);
	const localY = Math.ceil(Math.random() * 25);
	const newEntry: Coordinate = { x: localX, y: localY };
	activeCoords.value.push(newEntry);
}

let offset = 0;
setInterval(() => {
	activeCoords.value[offset].x = Math.ceil(Math.random() * 25);
	activeCoords.value[offset].y = Math.ceil(Math.random() * 25);
	offset += 1;
	offset %= 10;
}, 50);
</script>

<template>
	<div class="grid-menu shader">
		<div class="grid-menu-background"></div>
		<div class="test-box"></div>
		<div class="test-box2"></div>
		<div
			class="box-row"
			v-for="x in 18"
		>
			<div
				class="box-item"
				v-for="y in 32"
				:key="`box-${x}-${y}`"
				:class="{
					'box-highlighted':
						(x === activeCoords[0].x && y === activeCoords[0].y) ||
						(x === activeCoords[1].x && y === activeCoords[1].y) ||
						(x === activeCoords[2].x && y === activeCoords[2].y) ||
						(x === activeCoords[3].x && y === activeCoords[3].y) ||
						(x === activeCoords[4].x && y === activeCoords[4].y) ||
						(x === activeCoords[5].x && y === activeCoords[5].y) ||
						(x === activeCoords[6].x && y === activeCoords[6].y) ||
						(x === activeCoords[7].x && y === activeCoords[7].y) ||
						(x === activeCoords[8].x && y === activeCoords[8].y) ||
						(x === activeCoords[9].x && y === activeCoords[9].y),
				}"
			></div>
		</div>
		<div class="box-overlay"></div>
	</div>
</template>

<style scoped>
.shader {
	width: 100dvw;
	height: calc(100dvh - 48px);
	position: absolute;
	z-index: -1;
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
	background-color: rgba(59, 207, 237, 0.859) !important;
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
	width: 2px;
	height: 100dvh;
	backdrop-filter: invert(10%);
	animation: slideX infinite 10s linear -1s;
	position: absolute;
}
.test-box2 {
	width: 100dvw;
	height: 2px;
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
