<script lang="ts" setup>
import useWindowManager, { type DesktopWindow } from '@/composables/useWindowManager';
import { UseDraggable as Draggable } from '@vueuse/components';
import { useDraggable as useDrag } from '@vueuse/core';
import { ConvexObjectBreaker } from 'three/examples/jsm/Addons.js';
import { ref, useTemplateRef } from 'vue';

const { closeWindowByID, tryBringWindowToFront, updateWindowPosition } = useWindowManager();

const handle = useTemplateRef<HTMLElement>('handle');

const textValue = ref('');
const props = defineProps<DesktopWindow>();

const { x, y } = useDrag(handle, {
	onStart() {
		tryBringWindowToFront(props.appData.appID);
	},
	onEnd() {
		updateWindowPosition(props.appData.appID, x.value, y.value);
	},
});
//Set drag values to initial window position
x.value = props.xPos;
y.value = props.yPos;

const startingWidth = (() => {
	if (innerWidth * 0.5 < innerHeight * 1.5) {
		return innerWidth * 0.5 + 'px';
	} else {
		return innerHeight * 1.5 + 'px';
	}
})();

enum ResizeContext {
	none = 'none',
	horizontal = 'horizontal',
	vertical = 'vertical',
	diagnal = 'diagnal',
}
const resizeContext = ref<ResizeContext>(ResizeContext.none);
const mouseDown = ref(false);

const horizontalResizeTrigger = () => {
	if (mouseDown.value) return;
	resizeContext.value = ResizeContext.horizontal;
	console.log('horizontal');
};
const verticalResizeTrigger = () => {
	if (mouseDown.value) return;
	resizeContext.value = ResizeContext.vertical;
	console.log('vertical');
};
const bothResizeTrigger = () => {
	if (mouseDown.value) return;
	resizeContext.value = ResizeContext.diagnal;
	console.log('diag');
};
const exitResizeTrigger = () => {
	if (mouseDown.value) return;
	resizeContext.value = ResizeContext.none;
	console.log('exit');
};

const styleObject = ref({
	width: '',
	height: '',
});

window.addEventListener('mousedown', () => {
	mouseDown.value = true;
	console.log('click down', mouseDown.value);
});
window.addEventListener('mouseup', () => {
	mouseDown.value = false;
	console.log('click up', mouseDown.value);
});
window.addEventListener('mousemove', (e) => {
	//Calc width between window start and cursor

	if (!mouseDown.value) return;
	const xOffset: number = e.clientX - x.value;
	const yOffset: number = e.clientY - y.value;
	console.log(e.clientX - x.value);

	if (
		resizeContext.value == ResizeContext.horizontal ||
		resizeContext.value == ResizeContext.diagnal
	) {
		styleObject.value.width = `${xOffset}px`;
	}

	if (
		resizeContext.value == ResizeContext.vertical ||
		resizeContext.value == ResizeContext.diagnal
	) {
		styleObject.value.height = `${yOffset}px`;
	}
});
</script>

<template>
	<Draggable
		class="app-window"
		v-slot="{ x, y }"
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
				<h1 class="draggable font-vt323">
					{{ appData.appName }} {{ Math.round(x) }}, {{ Math.round(y) }}
				</h1>
			</div>
			<div class="control-buttons draggable">
				<div class="control-minimize clickable"></div>
				<div
					class="control-close clickable"
					@click="closeWindowByID(appData.appID)"
				></div>
			</div>
		</div>
		<div class="app-divider"></div>
		<div
			ref="appBody"
			class="app-body"
		>
			<div
				class="resize resizeEW d-side"
				@mousedown="tryBringWindowToFront(props.appData.appID)"
				@mouseover="horizontalResizeTrigger"
				@mouseout="exitResizeTrigger"
			></div>
			<div
				class="resize resizeNS d-bottom"
				@mousedown="tryBringWindowToFront(props.appData.appID)"
				@mouseover="verticalResizeTrigger"
				@mouseout="exitResizeTrigger"
			></div>
			<div
				class="resize resizeSE d-corner"
				@mousedown="tryBringWindowToFront(props.appData.appID)"
				@mouseover="bothResizeTrigger"
				@mouseout="exitResizeTrigger"
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
* {
	--header-background: 31, 22, 51;
	--outer-border: 60, 110, 166;
	--inner-border: 17, 69, 81;
	--title: 211, 45, 207;
	--title-accent: 211, 45, 207;
	--title-accent: 232, 131, 234;
	--control-button: 232, 131, 234;
	--close-button: 211, 45, 207;

	--blue-white: 215, 233, 254;
}

.app-window {
	width: v-bind(startingWidth);
	min-width: 16rem;
	min-height: 9rem;
	height: auto;
	background-color: rgba(0, 0, 0, 0.922);
	position: fixed;
	border: 2px solid rgb(var(--outer-border));
	overflow: visible;
	border-radius: 15px 15px 0 0;
}
.app-header {
	border-radius: 12.5px 12.5px 0 0;
	height: 40px;
	background-color: rgb(var(--header-background));
	display: flex;
	justify-content: space-between;
	align-items: center;
	cursor: move;
	border: 3px solid rgb(var(--inner-border));
}
.app-divider {
	border-bottom: 2px solid rgb(var(--outer-border));
}

.control-buttons {
	height: 100%;
	display: flex;
	align-items: center;
	/* 32px * button count  */
	min-width: 64px;
}

.control-buttons > div {
	display: inline-block;
	height: 24px;
	margin-right: 8px;
	aspect-ratio: 1;
}

.control-buttons > .control-minimize {
	background-color: rgba(var(--control-button), 0.25);
	border: 1px solid rgb(var(--control-button));
	background-image: url('@/assets/ui/24x_MinimizeIcon.png');
	image-rendering: crisp-edges;
	background-size: cover;
	background-position: center;
}
.control-buttons > .control-minimize:hover {
	background-color: rgba(var(--control-button), 0.4);
}
.control-buttons > .control-minimize:active {
	background-color: rgba(var(--control-button), 0.7);
}

.control-buttons > .control-close {
	background-color: rgba(var(--close-button), 0.25);
	border: 1px solid rgb(var(--close-button));
	background-image: url('@/assets/ui/24x_CloseIcon.png');
	image-rendering: crisp-edge0;
	background-size: cover;
	background-position: center;
}

.control-buttons > .control-close:hover {
	background-color: rgba(var(--close-button), 0.4);
}
.control-buttons > .control-close:active {
	background-color: rgba(var(--close-button), 0.7);
}

.app-title {
	padding: 0 0.5rem;
	user-select: none;
}

h1 {
	font-weight: 600;
	text-shadow:
		-0px 0px 1.5px #000,
		-0px 0px 1.5px #000,
		0px -0px 1.5px #000,
		0px -0px 1.5px #000,
		0px 0px 1.5px #000,
		0px 0px 1.5px #000,
		-0px -0px 1.5px #000,
		-0px -0px 1.5px #000,
		-0px 0px 5px rgba(var(--title-accent), 0.8),
		-0px 0px 5px rgba(var(--title-accent), 0.8),
		0px -0px 5px rgba(var(--title-accent), 0.8),
		0px -0px 5px rgba(var(--title-accent), 0.8),
		0px 0px 5px rgba(var(--title-accent), 0.8),
		0px 0px 5px rgba(var(--title-accent), 0.8),
		-0px -0px 5px rgba(var(--title-accent), 0.8),
		-0px -0px 5px rgba(var(--title-accent), 0.8);
	overflow: visible;
	color: rgba(var(--title), 1);
	font-size: 24px;
	line-height: 34px;
	white-space: nowrap;
}

.app-body {
	height: calc(100% - 42.5px);
	border: 3px solid rgb(var(--inner-border));
}

.resize {
	position: absolute;
}

.d-side {
	position: absolute;
	width: 16px;
	height: calc(100% - 55px);
	right: -8px;
}
.d-bottom {
	height: 16px;
	width: calc(100% - 15px);
	bottom: -8px;
}
.d-corner {
	height: 23px;
	width: 23px;
	bottom: -8px;
	right: -8px;
	background: linear-gradient(
		315deg,
		rgba(var(--title-accent), 1) 0%,
		rgba(var(--title-accent), 1) 40%,
		rgba(var(--title-accent), 0) 41%
	);
}
</style>
