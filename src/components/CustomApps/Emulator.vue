<script lang="ts" setup>
import MobileView from '@/components/MobileBio.vue';
import { ref } from 'vue';

const virtualPhones = [
	{
		name: 'Spamdung Fallacy',
		height: 740,
		width: 360,
	},
	{
		name: 'eyePWN',
		height: 874,
		width: 403,
	},
];

const currentView = ref(virtualPhones[0]);
</script>

<template>
	<div class="emulator">
		<div class="control-panel">
			<select v-model="currentView">
				<optgroup label="Phone">
					<option
						v-for="phone in virtualPhones"
						:key="phone.name"
						:value="phone"
					>
						{{ phone.name }}
					</option>
				</optgroup>
			</select>
			<div>
				<p>Size: {{ currentView.width }}px x {{ currentView.height }}px</p>
			</div>
			<!-- <pre>currentView: {{ currentView }}</pre> -->
		</div>
		<div class="app-container">
			<div
				class="app-display"
				:style="{
					width: `${currentView.width}px`,
					height: `${currentView.height}px`,
				}"
			>
				<MobileView></MobileView>
			</div>
		</div>
	</div>
</template>

<style scoped>
.emulator {
	width: 100%;
	display: flex;
	flex-direction: column;
}

.control-panel {
	height: 2.5rem;
	background: linear-gradient(
		180deg,
		rgba(40, 27, 67, 1) 0%,
		rgba(40, 27, 67, 0.4) 14%,
		rgba(40, 27, 67, 0.5) 84%,
		rgba(40, 27, 67, 1) 92%,
		rgba(0, 255, 212, 1) 100%
	);
	display: flex;
	flex-direction: row;
	align-items: center;
}

.control-panel > select {
	appearance: none;
	-webkit-appearance: none;
	-moz-appearance: none;
	background: none;
	color: aqua;
	border-left: 3px solid aqua;
	border-right: 3px solid aqua;
	padding: 5px 1px 5px 10px;
	font-size: 18px;
	border-radius: 24px;
	background-image: url('data:image/svg+xml;utf8,<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 9L12 15L18 9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor"/></svg>');
}

.control-panel > div > p {
	color: pink;
	padding-left: 1rem;
}

.app-container {
	align-items: center;
	margin: auto;
}
</style>
