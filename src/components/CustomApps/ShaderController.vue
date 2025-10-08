<script setup lang="ts">
import { ref, watch } from 'vue';
import { store } from '@/store/store';

const colorChannels = ref({
	R: 0,
	G: 0,
	B: 0,
});

const targetColor = ref('');
targetColor.value = store.BlurryGlass.PrimaryColor;

const setUpChannels = (() => {
	const colorValues: Array<string> = targetColor.value
		.replace(/[^0-9]/g, ' ')
		.split(' ')
		.filter((x) => x);

	colorChannels.value.R = Number(colorValues[0]);
	colorChannels.value.G = Number(colorValues[1]);
	colorChannels.value.B = Number(colorValues[2]);
	console.log(colorValues);
})();

console.log(store);
watch(colorChannels.value, (newVal, oldVal) => {
	colorChannels.value.R = Number(newVal.R);
	colorChannels.value.G = Number(newVal.G);
	colorChannels.value.B = Number(newVal.B);

	targetColor.value = `rgb(${colorChannels.value.R}, ${colorChannels.value.G}, ${colorChannels.value.B})`;
	console.log(store.BlurryGlass.PrimaryColor);
	store.BlurryGlass.PrimaryColor = targetColor.value;
	console.log(store.BlurryGlass.PrimaryColor);
});
</script>

<template>
	<div class="shader-controller-container">
		<div class="shader-controller">
			<div class="color-picker-box">
				<template
					v-for="(val, channel) in colorChannels"
					:key="channel"
				>
					<div class="color-channel">
						<div class="channel-icon">{{ channel }}</div>
						<input
							class="color-slider"
							type="range"
							min="0"
							max="255"
							step="1"
							v-model="colorChannels[channel]"
						/>
						<div class="channel-value">{{ colorChannels[channel] }}</div>
					</div>
				</template>
			</div>
			<div class="color-output"><input type="color" /></div>
		</div>
	</div>
</template>

<style scoped>
.shader-controller-container {
	background-color: rgba(44, 76, 105, 0.125);
	width: 100%;
	height: 100%;
	min-width: 240px;
}
.shader-controller {
	background-color: rgba(6, 94, 171, 0.222);
	width: calc(100% - 10px);
	height: calc(100% - 10px);
	margin: auto;
	margin-top: 5px;
	display: grid;
	grid-template-columns: 1fr 80px;
	grid-template-rows: 90px;
	grid-template-areas: 'color-picker-box color-output';
}

.color-output {
	background-color: v-bind(targetColor);
	box-shadow:
		0px 0px 2px 2px v-bind(targetColor),
		0px 0px 4px 3px v-bind(targetColor);
	align-self: center;
	justify-self: center;
	height: 70%;
	aspect-ratio: 1;
	border-radius: 1.25rem;
	transform: rotate(45deg);
	border: 2px solid rgb(255, 255, 255);
	margin: 10px;
	display: flex;
}

.color-output input {
	width: 100%;
	height: 100%;
	opacity: 0;
}

.color-picker-box {
	grid-area: color-picker-box;
}

.color-channel {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	height: 30px;
}

.color-slider {
	margin-left: min(10px, 5%);
	margin-right: min(10px, 5%);
	width: 100%;
	appearance: none;
	background: transparent;
}

input[type='range']::-webkit-slider-runnable-track {
	background: linear-gradient(
		to bottom,
		#0b0451 0%,
		#0b0451 35%,
		#22d6ff 50%,
		#0b0451 65%,
		#0b0451 100%
	);
	border: 2px solid #22d6ff;
	height: 1rem;
	border-radius: 0.45rem;
}

input[type='range']::-moz-range-track {
	background-color: #000;
	border: 2px solid #22d6ff;
	height: 1rem;
	border-radius: 0.45rem;
}
input[type='range']::-webkit-slider-thumb {
	appearance: none;
	background: transparent;
	border: 4px solid #5f0b80;
	box-shadow: 0px 0px 3px 2px rgb(57, 1, 77);
	height: calc(0.8rem - 1px);
	width: max(7%, 1.5rem);
	border-radius: 0.3rem;
}

.channel-icon,
.channel-value {
	box-sizing: content-box;
	border: 0.1rem solid rgb(3, 9, 114);
	background-color: rgba(14, 58, 138, 0.54);
	color: rgba(36, 200, 245, 0.816);
	border-radius: 0.2rem;
	text-shadow:
		1.25px 1.25px 1px rgb(0, 0, 0),
		-1.25px -1.25px 1px rgb(0, 0, 0),
		-1.25px 1.25px 1px rgb(0, 0, 0),
		1.25px -1.25px 1px rgb(0, 0, 0);
	box-shadow:
		1.25px 1.25px 3.5px rgb(0, 0, 0),
		-1.25px -1.25px 3.5px rgb(0, 0, 0),
		-1.25px 1.25px 3.5px rgb(0, 0, 0),
		1.25px -1.25px 3.5px rgb(0, 0, 0);
	font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
	font-weight: 600;
	height: 22px;
	font-size: 1.5rem;
	line-height: 22px;
}

.channel-icon {
	text-align: center;
	aspect-ratio: 1;
	margin-left: 5px;
	min-width: 25px;
}
.channel-value {
	min-width: 50px;
	text-align: right;
	margin-right: 5px;
}
</style>
