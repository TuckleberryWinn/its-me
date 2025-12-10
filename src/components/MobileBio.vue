<script lang="ts" setup>
import { ref } from 'vue';
import BlurryGlass from './AltShaders/BlurryGlass.vue';
</script>

<template>
	<div id="mobile-bio">
		<div class="background"></div>
		<BlurryGlass />
		<div>
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
			<div class="container-extra1"></div>
		</div>
	</div>
</template>

<style scoped>
h1 {
	font-size: 2rem;
	color: rgb(5, 204, 42);
	text-align: center;
}
p {
	font-size: 1rem;
	color: rgb(5, 204, 42);
	text-align: center;
}

/* .background {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgb(47, 1, 50);
} */

@property --a {
	syntax: '<percentage>';
	inherits: false;
	initial-value: 10%;
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
	animation: 3s linear 1s infinite alternate radialGrow;
	background: radial-gradient(
		rgba(0, 0, 0, 0) calc(var(--a)),
		rgba(0, 157, 255, 0.357) calc(var(--a) + 1%),
		rgba(6, 169, 250, 0.339) calc(var(--a) + 2%),
		rgba(255, 255, 255, 0) calc(var(--a) + 3%)
	);
}

.container-extra1 {
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	/* background: radial-gradient(
		rgba(0, 0, 0, 0) v-bind(100 - innerRadius + '%'),
		rgba(0, 157, 255, 0.357) v-bind(100 - innerRadius + 1 + '%'),
		rgba(6, 169, 250, 0.339) v-bind(100 - innerRadius + 2 + '%'),
		rgba(255, 255, 255, 0) v-bind(100-innerRadius + 3 + '%')
	); */
}

button.link {
	display: block;
	max-width: 500px;
	width: 75dvw;
	min-width: 260px;
	height: 3rem;
	margin-bottom: 1rem;
	background: linear-gradient(
		180deg,
		rgba(138, 3, 156, 0.235) 35%,
		rgba(0, 204, 255, 0) 40%,
		rgba(3, 211, 48, 0.427) 85%
	);
	border: 2px solid rgb(41, 224, 8);
	border-radius: 1.25rem;
}

button.link {
	font-size: 1.6rem;
	color: white;
}

@keyframes radialGrow {
	0% {
		--a: 0%;
	}
	100% {
		--a: 100%;
	}
}
</style>
