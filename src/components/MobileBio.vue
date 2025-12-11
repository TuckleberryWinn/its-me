<script lang="ts" setup>
import { ref } from 'vue';
import useWindowData from '@/composables/useWindowData';
const { height, width } = useWindowData();
</script>

<template>
	<div id="mobile-bio">
		<div class="background"></div>
		<div class="grid-container">
			<span
				class="grid"
				v-for="n in 5"
			></span>
		</div>
		<div class="container-extra extra1"></div>
		<div class="container-extra extra2"></div>
		<div class="container-extra extra3"></div>
		<div class="container-extra extra4"></div>

		<div class="page-container">
			<div class="content-container">
				<h1>Tucker Bishop</h1>
				<p>H</p>

				<button
					v-for="n in 5"
					class="link"
				>
					{{ n }}
				</button>
			</div>
		</div>
	</div>
</template>

<style scoped>
h1 {
	font-size: 2rem;
	color: rgb(27, 169, 240);
	text-align: center;
}
p {
	font-size: 1rem;
	color: rgb(25, 212, 237);
	text-align: center;
}

@property --a {
	syntax: '<percentage>';
	inherits: false;
	initial-value: 0%;
}

#mobile-bio {
	height: 100dvh;
	width: 100dvw;
}

.background {
	background-color: rgb(47, 1, 50);
	height: 100%;
	width: 100%;
	z-index: -3;
	position: absolute;
}

.page-container {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 3;
}

.container-extra {
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: -2;
	background: radial-gradient(
		#00000000 calc(100% - var(--a)),
		rgba(99, 3, 67, 0.722) calc(100% - var(--a) + 1%),
		rgba(70, 4, 69, 0.81) calc(100% - var(--a) + 2%),
		#00000000 calc(100% - var(--a) + 4%)
	);
	filter: blur(6px);
}

.extra1 {
	animation: 1s cubic-bezier(0.29, 0.65, 0.4, 0.77) 0s infinite radialGrow;
}
.extra2 {
	animation: 2s cubic-bezier(0.29, 0.65, 0.4, 0.77) 0s infinite radialGrow;
}
.extra3 {
	animation: 4s cubic-bezier(0.29, 0.65, 0.4, 0.77) 0s infinite radialGrow;
}
.extra4 {
	animation: 8s cubic-bezier(0.29, 0.65, 0.4, 0.77) 0s infinite radialGrow;
}

.grid-container {
	position: absolute;
	width: 100dvw;
	height: 100dvh;
	perspective: 1200px;
	z-index: -1;
}
.grid-container .grid {
	z-index: -1;
	position: absolute;
	width: 100dvw;
	height: 100dvh;
	background-image:
		linear-gradient(
			to bottom,
			rgba(137, 5, 111, 0.845) 3%,
			transparent 3%,
			transparent 97%,
			rgb(137, 5, 111, 0.845) 97%
		),
		linear-gradient(
			to left,
			rgb(137, 5, 111, 0.845) 3%,
			transparent 3%,
			transparent 97%,
			rgb(137, 5, 111, 0.845) 97%
		);
	background-size: 20% 20dvh;
}
.grid-container .grid-container:before,
.grid-container .grid:after {
	z-index: -1;
	position: absolute;
	content: '';
	width: 100dvw;
	height: 100dvh;
}
.grid-container .grid:nth-child(1) {
	transform: rotateX(90deg) translate3d(0, -50dvh, -50dvh);
}
.grid-container .grid:nth-child(2) {
	transform: rotateX(-90deg) translate3d(0, 50dvh, -50dvh);
}
.grid-container .grid:nth-child(3) {
	transform: rotateY(90deg) translate3d(calc(50dvw * (v-bind(height) / v-bind(width))), 0, -50dvw)
		scaleX(calc(v-bind(height) / v-bind(width)));
}
.grid-container .grid:nth-child(4) {
	transform: rotateY(-90deg) translate3d(calc(-50dvw * (v-bind(height) / v-bind(width))), 0, -50dvw)
		scaleX(calc(v-bind(height) / v-bind(width)));
}
.grid-container .grid:nth-child(5) {
	transform: translate3d(0, 0, -100dvh);
}
.grid-container .grid:nth-child(5):after {
	box-shadow:
		0px 0px 40px 12px rgba(117, 6, 72, 0.5),
		0px 0px 50px 4px rgba(117, 6, 72, 0.5) inset;
}

button.link {
	display: block;
	max-width: 500px;
	width: 75dvw;
	min-width: 260px;
	height: 3rem;
	margin-bottom: 1rem;
	background: linear-gradient(180deg, rgba(13, 56, 209, 0.358) 35%, rgba(7, 189, 199, 0.539) 85%);
	border: 2px solid rgb(28, 185, 205);
	border-radius: 1.25rem;
}

button.link {
	font-size: 1.6rem;
	color: rgb(255, 27, 198);
}

@keyframes radialGrow {
	0% {
		--a: 0%;
	}
	100% {
		--a: 115%;
	}
}
</style>
