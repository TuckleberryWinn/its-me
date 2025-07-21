<script lang="ts" setup></script>

<template>
	<div class="taskbar">
		<div class="icons-left">
			<label>
				<span id="start-menu"></span>
				<input type="checkbox" />
			</label>
			<label>
				<span id="folder"></span>
				<input type="checkbox" />
			</label>
			<label>
				<span id="chrome"></span>
				<input type="checkbox" />
			</label>
		</div>
		<div class="taskbar-apps">
			<slot />
		</div>
		<div class="taskbar-tabs"></div>
		<div class="icons-right"></div>
	</div>
</template>

<style scoped>
.taskbar {
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	height: 48px;
	background-color: rgba(66, 88, 97, 0.22);
	backdrop-filter: blur(10px);
	display: flex;
}

.icons-left {
	display: inline-block;
	vertical-align: bottom;
}

.icons-left label {
	display: inline-block;
	padding-left: 4px;
	padding-right: 4px;
	padding-top: 8px;
	padding-bottom: 8px;
	vertical-align: middle;
}

.icons-left span {
	height: 32px;
	aspect-ratio: 1 / 1;
	display: block;
	background-repeat: no-repeat;
	background-position: center;
	background-size: 100% 100%;
	image-rendering: pixelated;
}

.icons-left input {
	display: none;
}

.icons-left label:hover {
	background-color: rgba(255, 255, 255, 0.1);
}

label span ~ input:checked {
	background-color: #ffffff;
}

.icons-left #start-menu {
	padding-left: 0.3dvh;
	background-image: url(/src/assets/ui/48xWindows.png);
}

.icons-left #folder {
	background-image: url(/src/assets/ui/48xFolder.png);
}

.icons-left #chrome {
	background-image: url(/src/assets/ui/48xChrome.png);
}

.taskbar-apps {
	display: flex;
	margin: 6px 12px 6px 0px;
}
</style>
