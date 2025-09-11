<script lang="ts" setup>
import useWindowManager, { type DesktopWindow } from '@/composables/useWindowManager';
import { UseDraggable as Draggable } from '@vueuse/components';
import { useDraggable as useDrag } from '@vueuse/core';
import { ConvexObjectBreaker } from 'three/examples/jsm/Addons.js';
import { ref, useTemplateRef } from 'vue';

const { closeWindowByID, tryBringWindowToFront, updateWindowPosition } = useWindowManager();

const handle = useTemplateRef<HTMLElement>('handle');

const props = defineProps<DesktopWindow>();

const dragWindow = useTemplateRef<HTMLElement>('dragWindow');
const dragResize = useTemplateRef<HTMLElement>('appBody');

const { x, y } = useDrag(handle, {
	onStart() {
		tryBringWindowToFront(props.appData.appID);
	},
	onEnd() {
		updateWindowPosition(props.appData.appID, x.value, y.value);
	},
});

x.value = props.xPos;
y.value = props.yPos;

const startingWidth = (function () {
	if (innerWidth * 0.5 < innerHeight * 1.5) {
		return innerWidth * 0.5 + 'px';
	} else {
		return innerHeight * 1.5 + 'px';
	}
})();

const textValue = ref('');

enum ResizeContext {
	none = 'none',
	horizontal = 'horizontal',
	vertical = 'vertical',
	diagnal = 'diagnal',
}
const resizeContext = ref('none');

const horizontalResizeTrigger = () => {
	resizeContext.value = ResizeContext.horizontal;
	console.log('horizontal');
};
const verticalResizeTrigger = () => {
	resizeContext.value = ResizeContext.vertical;
	console.log('vertical');
};
const bothResizeTrigger = () => {
	resizeContext.value = ResizeContext.diagnal;
	console.log('diag');
};
const exitResizeTrigger = () => {
	resizeContext.value = ResizeContext.none;
	console.log('exit');
};

const styleObject = ref({
	width: '',
	height: '',
});

window.addEventListener('mousemove', (e) => {
	//Calc width between window start and cursor
	const xOffset: number = e.clientX - x.value;
	const yOffset: number = e.clientY - y.value;
	console.log(e.clientX - x.value);

	styleObject.value.width = `${xOffset}px`;
	styleObject.value.height = `${yOffset}px`;
});
</script>

<template>
	<Draggable
		class="app-window"
		v-slot="{ x, y }"
		ref="dragWindow"
		:handle="handle"
		:initial-value="{ x: xPos, y: yPos }"
		:class="appData.appID"
		:style="{ width: styleObject.width, height: styleObject.height }"
	>
		<div
			class="app-header draggable"
			ref="handle"
		>
			<div class="app-title draggable">
				<h1 class="draggable">{{ appData.appName }} {{ Math.round(x) }}, {{ Math.round(y) }}</h1>
			</div>
			<div class="control-buttons draggable">
				<div class="control-minimize clickable"></div>
				<div
					class="control-close clickable"
					@click="closeWindowByID(appData.appID)"
				></div>
			</div>
		</div>
		<div
			ref="appBody"
			class="app-body"
		>
			<div
				class="resize resizeEW d-side"
				@mousedown="horizontalResizeTrigger"
				@mouseup="exitResizeTrigger"
			></div>
			<div
				class="resize resizeNS d-bottom"
				@mousedown="verticalResizeTrigger"
				@mouseup="exitResizeTrigger"
			></div>
			<div
				class="resize resizeSE d-corner"
				@mousedown="bothResizeTrigger"
				@mouseup="exitResizeTrigger"
			></div>
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
	background-color: rgba(0, 0, 0, 0.922);
	position: fixed;
	border: 1.5px solid greenyellow;
}
.app-header {
	height: 40px;
	background-color: #000000;
	display: flex;
	justify-content: space-between;
	align-items: center;
	cursor: move;
	border-bottom: 1px solid greenyellow;
}

.control-buttons {
	height: 100%;
	display: flex;
	align-items: center;
}

.control-buttons > div {
	display: inline-block;
	height: 24px;
	aspect-ratio: 1;
	margin-right: 8px;
}

.control-buttons > .control-minimize {
	background-color: rgba(15, 239, 26, 0.25);
	border: 1px solid rgb(8, 242, 0);
	background-image: url('@/assets/ui/24x_MinimizeIcon.png');
	image-rendering: pixelated;
	background-size: cover;
	background-position: center;
}
.control-buttons > .control-minimize:hover {
	background-color: rgba(15, 239, 26, 0.4);
}
.control-buttons > .control-minimize:active {
	background-color: rgba(15, 239, 26, 0.7);
}

.control-buttons > .control-close {
	background-color: rgba(241, 0, 0, 0.25);
	border: 1px solid rgb(255, 13, 13);
	background-image: url('@/assets/ui/24x_CloseIcon.png');
	image-rendering: pixelated;
	background-size: cover;
	background-position: center;
}

.control-buttons > .control-close:hover {
	background-color: rgba(241, 0, 0, 0.4);
}
.control-buttons > .control-close:active {
	background-color: rgba(241, 0, 0, 0.7);
}

.app-title {
	padding: 0 0.5rem;
	user-select: none;
}

h1 {
	font-weight: 600;
	text-shadow:
		-1px 1px 1px #00ff08,
		-2px 2px 1px #00ff08,
		1px -1px 1px #00ff08,
		2px -2px 1px #00ff08,
		1px 1px 1px #00ff08,
		2px 2px 1px #00ff08,
		-1px -1px 1px #00ff08,
		-2px -2px 1px #00ff08;
	overflow: visible;
	color: #0000009b;
	font-size: 24px;
}

.app-body {
}

.resize {
	position: absolute;
}

.d-side {
	width: 10px;
	height: calc(100% - 55px);
	right: 0;
}
.d-bottom {
	height: 10px;
	width: calc(100% - 15px);
	bottom: 0;
}
.d-corner {
	height: 20px;
	width: 20px;
	bottom: 0;
	right: 0;
	background: linear-gradient(
		315deg,
		rgba(20, 255, 11, 1) 0%,
		rgba(20, 255, 11, 1) 30%,
		rgba(20, 255, 11, 0) 31%
	);
}
</style>
