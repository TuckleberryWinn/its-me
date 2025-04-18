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
		<div class="taskbar-tabs"></div>
		<div class="icons-right"></div>
	</div>
</template>

<style scoped>
.taskbar {
	position: fixed;
	bottom: 0;
	width: 100%;
	background: #004172;
}

.taskbar .icons-left {
	display: inline-block;
  vertical-align: bottom;
}

.taskbar .icons-left label {
	display: inline-block;
	padding-left: 0.5dvh;
	padding-right: 0.5dvh;
  padding-top: .5dvh;
  padding-bottom: .5dvh;
	vertical-align: middle;
}

.taskbar .icons-left span {
	height: 3.5dvh;
	aspect-ratio: 1 / 1;
	display: block;
	background-repeat: no-repeat;
	background-position: center;
	background-size: 100% 100%;
}

.taskbar .icons-left input {
	display: none;
}

.taskbar .icons-left label:hover {
	background-color: rgba(255, 255, 255, 0.1);
}

label span ~ input:checked {
	background-color: #ffffff;
}

.taskbar .icons-left #start-menu {
	padding-left: 0.3dvh;
	background-image: url(/src/assets/ui/icon-windows.png);
}

.taskbar .icons-left #folder {
	background-image: url(/src/assets/ui/icon-folder.png);
}

.taskbar .icons-left #chrome {
	background-image: url(/src/assets/ui/icon-chrome.png);
}
</style>
