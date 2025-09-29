<script setup lang="ts"></script>

<template>
	<div class="start-menu">
		<div class="start-menu-title-background">
			<div class="taskbar-title">
				<h1 class="font-vt323">[ Ephemerality 0S ]</h1>
			</div>
		</div>
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
.start-menu-title-background {
	align-self: flex-end;
	height: 600px;
	width: 40px;
	background: linear-gradient(
		90deg,
		rgba(0, 255, 212, 1) 5%,
		rgba(40, 27, 67, 0.621) 10%,
		rgba(40, 27, 67, 0.621) 90%,
		rgba(0, 255, 212, 1) 95%
	);
}

.start-menu-selection-menu {
	background-color: blueviolet;
}

.taskbar-title {
	height: 100%;
	background: linear-gradient(
		77deg,
		rgba(40, 27, 67, 0) 5%,
		rgba(0, 255, 212, 1) 6%,
		rgba(40, 27, 67, 0) 7%,
		rgba(40, 27, 67, 0) 10%,
		rgba(0, 255, 212, 1) 11%,
		rgba(40, 27, 67, 0) 12%,
		rgba(40, 27, 67, 0) 45%,
		rgba(0, 255, 212, 1) 46%,
		rgba(40, 27, 67, 0) 47%,
		rgba(40, 27, 67, 0) 50%,
		rgba(0, 255, 212, 1) 51%,
		rgba(40, 27, 67, 0) 52%,
		rgba(40, 27, 67, 0) 55%,
		rgba(0, 255, 212, 1) 56%,
		rgba(40, 27, 67, 0) 57%,
		rgba(40, 27, 67, 0) 60%,
		rgba(0, 255, 212, 1) 61%,
		rgba(40, 27, 67, 0) 62%,
		rgba(40, 27, 67, 0) 65%,
		rgba(0, 255, 212, 1) 66%,
		rgba(40, 27, 67, 0) 67%,
		rgba(40, 27, 67, 0) 70%,
		rgba(0, 255, 212, 1) 71%,
		rgba(40, 27, 67, 0) 72%,
		rgba(40, 27, 67, 0) 75%,
		rgba(0, 255, 212, 1) 76%,
		rgba(40, 27, 67, 0) 77%,
		rgba(40, 27, 67, 0) 80%,
		rgba(0, 255, 212, 1) 81%,
		rgba(40, 27, 67, 0) 82%,
		rgba(40, 27, 67, 0) 85%,
		rgba(0, 255, 212, 1) 86%,
		rgba(40, 27, 67, 0) 87%,
		rgba(40, 27, 67, 0) 90%,
		rgba(0, 255, 212, 1) 91%,
		rgba(40, 27, 67, 0) 92%,
		rgba(40, 27, 67, 0) 95%,
		rgba(0, 255, 212, 1) 96%,
		rgba(40, 27, 67, 0) 97%
	);
}
.taskbar-title h1 {
	color: rgb(76, 7, 80);
	font-size: 35px;
	padding-bottom: 0.8rem;
	letter-spacing: -0.07rem;
	writing-mode: sideways-lr;
	text-orientation: sideways;
	text-align: start;
	height: 100%;
	margin: auto;
	text-shadow:
		-1px -1px 2px rgba(0, 255, 212, 1),
		-1px 1px 2px rgba(0, 255, 212, 1),
		1px -1px 2px rgba(0, 255, 212, 1),
		1px 1px 2px rgba(0, 255, 212, 1),
		-1px -1px 2px rgba(0, 255, 212, 1),
		-1px 1px 2px rgba(0, 255, 212, 1),
		1px -1px 2px rgba(0, 255, 212, 1),
		1px 1px 2px rgba(0, 255, 212, 1);
}
</style>
