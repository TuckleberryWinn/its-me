<script setup lang="ts">
import { onLongPress } from '@vueuse/core';
import { ref, watch } from 'vue';

const colorChannels = ref({
	R: 0,
	G: 0,
	B: 0,
});

watch(colorChannels.value, (newVal, oldVal) => {
	console.log(newVal.R, newVal.G, newVal.B);
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
	background-color: rgba(102, 214, 11, 0.744);
	box-shadow:
		0px 0px 2px 2px rgb(103, 214, 11, 0.4),
		0px 0px 4px 3px rgb(103, 214, 11, 0.4);
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
