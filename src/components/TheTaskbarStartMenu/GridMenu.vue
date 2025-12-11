<script lang="ts" setup></script>

<template>
	<div>123</div>
</template>

<style scoped>
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
	background-color: rgba(45, 231, 237, 0.859) !important;
	transition: 0.2s;
}

.grid-menu {
	width: 600px;
	height: 600px;
	overflow: visible;
	display: flex;
	flex-direction: column-reverse;
}
.grid-menu-background {
	width: 600px;
	height: 600px;
	position: absolute;
}

.test-box {
	width: 2px;
	height: 600px;
	backdrop-filter: invert(10%);
	animation: slideX infinite 10s linear;
	position: absolute;
}
.test-box2 {
	width: 600px;
	height: 2px;
	backdrop-filter: invert(20%);
	animation: slideY infinite 10s linear;
	position: absolute;
}
.box-overlay {
	backdrop-filter: blur(4px);
	height: 600px;
	width: 600px;
	position: absolute;
}

@keyframes slideX {
	0% {
		transform: translate(0, 0);
	}
	50% {
		transform: translate(600px, 0);
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
		transform: translate(0, -600px);
	}
	100% {
		transform: translate(0, 0);
	}
}
</style>
