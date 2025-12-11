<script setup lang="ts">
import { ref, watch } from 'vue';
import { store } from '@/store/store';
import ThreeChannelColorPicker from '../ShaderController/ThreeChannelColorPicker.vue';

const shaderList = [
	{
		Name: 'Block City',
		DefaultSetting: {
			PrimaryColor: '#FF0000',
			SecondaryColor: '#FF0000',
		},
		UserSetting: {
			PrimaryColor: '#BB3300',
			SecondaryColor: '#BB3300',
		},
	},
	{
		Name: 'Block City2',
	},
	{
		Name: 'Block City3',
	},
];
</script>

<template>
	<div class="shader-controller">
		<div class="shader-controller-carousel">
			<button><--</button>
			<select
				name="myDropdown"
				id="myDropdown"
			>
				<option
					value="option1"
					v-for="shader in shaderList"
				>
					{{ shader.Name }}
				</option>
			</select>
			<button>--></button>
		</div>
		<div>-----------------</div>
		<div class="shader-control-panel">
			<template v-for="n in 3">
				123123
				<div class="panel-wrapper">
					<ThreeChannelColorPicker />
				</div>
				<div
					v-if="n !== 3"
					class="thin-divider"
					style="color: aliceblue; text-align: center"
				>
					<div class="gap-line"></div>
				</div>
			</template>
		</div>
		<div class="settings-button clickable"></div>
	</div>
</template>

<style scoped>
.shader-controller {
	background-color: rgba(14, 50, 84, 0.367);
	width: 100%;
	height: 100%;
	min-width: 240px;
}
.settings-button {
	position: absolute;
	right: 6px;
	top: 50px;
	width: 20px;
	height: 20px;
	background-color: aqua;
	border: 2px solid rgb(9, 79, 155);
	border-radius: 25%;
}
.panel-wrapper {
	width: calc(100% - 10px);
	background-color: rgba(137, 43, 226, 0.331);
	margin: auto;
	background-color: rgba(14, 50, 84, 0.4);
	margin: auto;
	width: calc(100% - 14px);
	border-top: 7px outset rgba(14, 50, 84, 0.25);
}

.gap-line {
	height: 7px;
}
</style>
