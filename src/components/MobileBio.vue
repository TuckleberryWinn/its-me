<script lang="ts" setup>
import { ref, computed } from 'vue';
import MobileBioLink from './MobileBioLink.vue';
import useWindowData from '@/composables/useWindowData';
const gridContainerElement = ref();
const { width, height } = useWindowData(gridContainerElement);

const gridCenter = computed(() => ({ transform: `translate3d(0, 0, -${height.value}px)` }));
const gridTop = computed(() => ({
	transform: `rotateX(-90deg) translate3d(0, ${height.value / 2}px, -${height.value / 2}px)`,
}));
const gridRight = computed(() => ({
	transform: `rotateY(-90deg) translate3d(-${height.value / 2}px, 0, -${width.value / 2}px) scaleX(${height.value / width.value})`,
}));
const gridBottom = computed(() => ({
	transform: `rotateX(90deg) translate3d(0, -${height.value / 2}px, -${height.value / 2}px)`,
}));
const gridLeft = computed(() => ({
	transform: `rotateY(90deg) translate3d(${height.value / 2}px, 0, -${width.value / 2}px) scaleX(${height.value / width.value})`,
}));

const bioLinks = [
	{
		link: 'Discord',
		displayText: 'tuckleberry_winn',
		url: 'javascript:;',
		logo: '/logos/sheet_discord.png',
	},
	{
		link: 'https://github.com/TuckleberryWinn',
		displayText: 'TuckleberryWinn',
		url: 'javascript:;',
		logo: '/logos/sheet_github.png',
	},
	{
		link: 'https://www.instagram.com/tuckleberry_winn/',
		displayText: 'tuckleberry_winn',
		url: 'javascript:;',
		logo: '/logos/sheet_instagram.png',
	},
	{
		link: 'https://tuckleberry-winn.itch.io/',
		displayText: 'Tuckleberry Winn',
		url: 'javascript:;',
		logo: '/logos/sheet_itch.png',
	},
	{
		link: 'https://x.com/Tuckergg',
		displayText: 'Tuckergg',
		url: 'javascript:;',
		logo: '/logos/sheet_twitter.png',
	},
];
</script>

<template>
	<div id="mobile-bio">
		<div class="background"></div>
		<div
			class="grid-container"
			ref="gridContainerElement"
		>
			<span
				class="grid"
				:style="gridCenter"
			></span>
			<span
				class="grid"
				:style="gridTop"
			></span>
			<span
				class="grid grid-right"
				:style="gridRight"
			></span>
			<span
				class="grid"
				:style="gridBottom"
			></span>
			<span
				class="grid"
				:style="gridLeft"
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
				<MobileBioLink
					v-for="n in bioLinks"
					:key="n.link"
					v-bind="n"
				></MobileBioLink>
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
	height: 100%;
	display: flex;
	align-items: center;
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
	background-size: 25% 25%;
}
.grid-container .grid-container:before,
.grid-container .grid:after {
	z-index: -1;
	position: absolute;
	content: '';
	width: inherit;
	height: inherit;
}

.grid-container .grid:nth-child(1):after {
	box-shadow:
		0px 0px 40px 12px rgba(48, 45, 106, 0.5),
		0px 0px 50px 4px rgba(48, 45, 106, 0.5) inset;
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
