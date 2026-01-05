<script setup lang="ts"></script>

<template>
	<div class="emoji-grid">
		<div class="grid-header"></div>
		<div class="grid-left"></div>
		<div class="grid-body">
			<div class="radial-ripple"></div>
			<div
				class="mini-grid"
				v-for="n in 4"
			>
				<div
					v-for="n in 13"
					:key="`grid-item-${n}`"
					:class="`grid-item-${n}`"
				></div>
			</div>
		</div>
		<div class="grid-right"></div>
		<div class="grid-footer"></div>
	</div>
</template>

<style scoped>
.grid-header {
	grid-area: header;
	background-color: rgb(43, 4, 97);
}
.grid-left {
	grid-area: body-left;
	background-color: rgb(43, 4, 97);
}
.grid-body {
	grid-area: body;
	background-color: rgb(3, 80, 80);
	display: flex;
	flex-wrap: wrap;
}
.grid-right {
	grid-area: body-right;
	background-color: rgb(43, 4, 97);
}
.grid-footer {
	grid-area: footer;
	background-color: rgb(43, 4, 97);
}
.emoji-grid {
	width: 100dvw;
	height: 100dvh;
	display: grid;
	grid-template-columns: 2rem 1fr 2rem;
	grid-template-rows: 2rem 1fr 2rem;
	grid-template-areas:
		'header header header'
		'body-left body body-right'
		'footer footer footer';
}

.mini-grid {
	width: 50%;
	height: 50%;
	display: grid;
	grid-template-columns: repeat(7 1fr);
	grid-template-rows: repeat(7 1fr);
	gap: 6px;
	padding: 3px;
	grid-template-areas:
		'🧁 🍫 🍫 🍫 🍫 🍫 🍫'
		'🧁 🥪 🍣 🍣 🍣 🍣 🍭'
		'🧁 🥪 🍟 🌭 🌭 🍩 🍭'
		'🧁 🥪 🍟 🍕 🍿 🍩 🍭'
		'🧁 🥪 🍔 🍔 🍿 🍩 🍭'
		'🧁 🌮 🌮 🌮 🍿 🍩 🍭'
		'🍪 🍪 🍪 🍪 🍪 🍩 🍭';
}

.mini-grid > div {
	background-color: rgba(0, 0, 0, 0.931);
	border: 10px solid black;
	z-index: 1;
}

.grid-item-1 {
	grid-area: 🍕;
}
.grid-item-2 {
	grid-area: 🍔;
}
.grid-item-3 {
	grid-area: 🍟;
}
.grid-item-4 {
	grid-area: 🌭;
}
.grid-item-5 {
	grid-area: 🍿;
}
.grid-item-6 {
	grid-area: 🌮;
}
.grid-item-7 {
	grid-area: 🥪;
}
.grid-item-8 {
	grid-area: 🍣;
}
.grid-item-9 {
	grid-area: 🍩;
}
.grid-item-10 {
	grid-area: 🍪;
}
.grid-item-11 {
	grid-area: 🧁;
}
.grid-item-12 {
	grid-area: 🍫;
}
.grid-item-13 {
	grid-area: 🍭;
}

@property --a {
	syntax: '<percentage>';
	inherits: false;
	initial-value: 0%;
}

.radial-ripple {
	position: absolute;
	height: calc(100% - 4rem);
	width: calc(100% - 4rem);
	background: radial-gradient(
		#00000000 calc(100% - var(--a)),
		rgba(48, 45, 106, 0.5) calc(100% - var(--a) + 1%),
		rgba(207, 26, 174, 0.877) calc(100% - var(--a) + 2%),
		#00000000 calc(100% - var(--a) + 4%)
	);
	filter: blur(2px);
	animation: 2s cubic-bezier(0.29, 0.65, 0.4, 0.77) 0s infinite radialGrow;
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
