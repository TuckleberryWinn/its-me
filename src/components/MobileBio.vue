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
				<h1 class="font-vt323">Tucker Bishop</h1>
				<h2 class="font-vt323">Salt Lake City based:</h2>
				<ul>
					<li class="font-vt323">> Game developer</li>
					<li class="font-vt323">> Musician</li>
					<li class="font-vt323">> 3D artist</li>
					<li class="font-vt323">> Oracle of edgy humor</li>
				</ul>
				<button class="link">
					<div class="logo discord"></div>
					<h4 class="font-vt323">tuckleberry_winn</h4>
				</button>
				<button class="link">
					<div class="logo itch"></div>
					<h4 class="font-vt323">tuckleberry-winn.itch.io</h4>
				</button>
			</div>
		</div>
	</div>
</template>

<style scoped>
h1 {
	font-size: 3rem;
	color: #d32836;
	text-shadow:
		0 0 2px #240003,
		0 0 2px #240003,
		0 0 10px #871c3e;
}
h2 {
	font-size: 2rem;
	color: #d32836;
	text-align: center;
	text-shadow:
		0 0 2px #240003,
		0 0 2px #240003,
		0 0 10px #871c3e,
		0 0 10px #871c3e;
}

ul {
	padding-bottom: 2rem;
}

ul li {
	font-size: 1.25rem;
	color: #d32836;
	text-shadow:
		0 0 2px #240003,
		0 0 2px #240003,
		0 0 6px #871c3e,
		0 0 8px #871c3e;
}

@property --a {
	syntax: '<percentage>';
	inherits: false;
	initial-value: 0%;
}

#mobile-bio {
	height: inherit;
	width: inherit;
}

.content-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
}

.background {
	background-color: #0a202f;
	z-index: -3;
	position: absolute;
	width: inherit;
	height: inherit;
}

.page-container {
	z-index: 3;
	margin: auto;
	width: 100%;
}

.container-extra {
	position: absolute;
	height: inherit;
	width: inherit;
	z-index: -2;
	background: radial-gradient(
		#00000000 calc(100% - var(--a)),
		rgba(48, 45, 106, 0.5) calc(100% - var(--a) + 1%),
		rgba(113, 1, 93, 0.5) calc(100% - var(--a) + 2%),
		#00000000 calc(100% - var(--a) + 4%)
	);
	filter: blur(5px);
}

.extra1 {
	animation: 3s cubic-bezier(0.29, 0.65, 0.4, 0.77) 0s infinite radialGrow;
}
.extra2 {
	animation: 4s cubic-bezier(0.29, 0.65, 0.4, 0.77) 0s infinite radialGrow;
}
.extra3 {
	animation: 5s cubic-bezier(0.29, 0.65, 0.4, 0.77) 0s infinite radialGrow;
}
.extra4 {
	animation: 6s cubic-bezier(0.29, 0.65, 0.4, 0.77) 0s infinite radialGrow;
}

.grid-container {
	position: absolute;
	width: inherit;
	height: inherit;
	perspective: 1200px;
	z-index: -1;
}
.grid-container .grid {
	z-index: -1;
	position: absolute;
	width: inherit;
	height: inherit;
	background-image:
		linear-gradient(
			to bottom,
			rgba(48, 45, 106, 0.845) 3%,
			transparent 3%,
			transparent 97%,
			rgb(48, 45, 106, 0.845) 97%
		),
		linear-gradient(
			to left,
			rgb(48, 45, 106, 0.845) 3%,
			transparent 3%,
			transparent 97%,
			rgb(48, 45, 106, 0.845) 97%
		);
	background-size: 20% 20dvh;
}
.grid-container .grid-container:before,
.grid-container .grid:after {
	z-index: -1;
	position: absolute;
	content: '';
	width: inherit;
	height: inherit;
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
		0px 0px 40px 12px rgba(48, 45, 106, 0.5),
		0px 0px 50px 4px rgba(48, 45, 106, 0.5) inset;
}

button {
	display: flex;
	align-items: center;
	flex-direction: row;
	max-width: 360px;
	width: 80%;
	min-width: 260px;
	height: 3rem;
	margin-bottom: 1rem;
	background: linear-gradient(180deg, rgba(61, 2, 18, 0.486) 35%, rgba(103, 3, 21, 0.539) 85%);
	border: 2px solid rgb(135, 2, 2);
	border-radius: 1.25rem;
}

button > h4 {
	font-size: 1.3rem;
	color: #d32836;
	padding-left: 0.25rem;
	text-align: left;
	display: inline;
	text-shadow:
		0 0 2px #240003,
		0 0 2px #240003,
		0 0 6px #a9083b;
}

button .logo {
	background-color: #3c0101;
	height: 100%;
	aspect-ratio: 1;
	display: inline;
}

.logo.discord {
	background-image: url(../assets/logos/discord.svg);
	background-position: center;
	background-repeat: no-repeat;
	background-size: 80% 80%;
}

.logo.itch {
	background-image: url(../assets/logos/itch.svg);
	background-position: center;
	background-repeat: no-repeat;
	background-size: 90% 90%;
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
