<script lang="ts" setup>
import useWindowManager, { type DesktopWindow } from '@/composables/useWindowManager';
import { UseDraggable as Draggable } from '@vueuse/components';
import { useDraggable } from '@vueuse/core';
import { ref, useTemplateRef } from 'vue';

const { closeWindowByID } = useWindowManager();

const handle = useTemplateRef<HTMLElement>('handle');

const props = defineProps<DesktopWindow>();

const dragWindow = useTemplateRef<HTMLElement>('dragWindow');

const startingWidth = (function () {
	if (innerWidth * 0.5 < innerHeight * 1.5) {
		return innerWidth * 0.5 + 'px';
	} else {
		return innerHeight * 1.5 + 'px';
	}
})();

const textValue = ref('');
</script>

<template>
	<Draggable
		class="app-window"
		v-slot="{ x, y }"
		ref="dragWindow"
		:handle="handle"
		:initial-value="{ x: xPos, y: yPos }"
		:class="appData.appID"
	>
		<div
			class="app-header"
			ref="handle"
		>
			<div class="app-title">
				<h1>{{ appData.appName }} {{ Math.round(x) }}, {{ Math.round(y) }}</h1>
			</div>
			<div class="control-buttons">
				<div class="control-minimize">-</div>
				<div
					class="control-close"
					@click="closeWindowByID(appData.appID)"
				>
					X
				</div>
			</div>
		</div>
		<div class="app-body">
			<textarea v-model="textValue"></textarea>
			<div>
				<input
					type="text"
					:key="textValue"
				/>
			</div>
		</div>
	</Draggable>
</template>

<style scoped>
.app-window {
	width: v-bind(startingWidth);
	min-width: 16rem;
	min-height: 9rem;
	height: auto;
	background-color: grey;
	border: 0.155rem solid #00ffd4;
	border-radius: 0.5rem 0.5rem 0 0;
	resize: horizontal;
	position: fixed;
}
.app-header {
	height: 40px;
	background: linear-gradient(
		0deg,
		rgb(90, 0, 138) 8%,
		rgb(66, 145, 214) 35%,
		rgb(0, 255, 212) 65%,
		rgb(0, 255, 212) 100%
	);
	display: flex;
	justify-content: space-between;
	align-items: center;
	cursor: move;
}

.control-buttons > div {
	display: inline-block;
	height: 28px;
	aspect-ratio: 1;
	border: 2px solid rgb(79, 7, 142);
	border-radius: 0.4rem;
	margin-right: 6px;
	background-color: rgba(1, 110, 187, 0.7);
	cursor: default;
}

.control-buttons > .control-close {
	background-color: #f826fc;
}

.app-title {
	padding: 0 0.5rem;
	user-select: none;
}

h1 {
	font-weight: 600;
	text-shadow:
		-1px 1px 1px #9de0f9,
		-2px 2px 1px #9de0f9,
		1px -1px 1px #9de0f9,
		2px -2px 1px #9de0f9,
		1px 1px 1px #6bd7ff,
		2px 2px 1px #6bd7ff,
		-1px -1px 1px #6bd7ff,
		-2px -2px 1px #6bd7ff;
	overflow: visible;
	color: #f826fc;
	font-size: 24px;
}

.app-body {
	aspect-ratio: 16 / 9;
}
</style>
