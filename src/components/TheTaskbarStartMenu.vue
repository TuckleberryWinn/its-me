<script setup lang="ts"></script>

<template>
	<div class="start-menu">
    <div class="taskbar-title">
      <h1>
        Ephemerality OS
      </h1>
    </div>
  </div>
</template>

<style scoped>
.start-menu {
	background-color: rgba(40, 27, 67, 0.621);;
	backdrop-filter: blur(10px);
	width: 200px;
	height: 600px;
  border-top: 6px groove rgba(0, 255, 212, .5);
  border-right: 6px groove rgba(0, 255, 212, .5);
}

.taskbar-title  {
  height: 100%;
  width: 50px;
  background-color: aliceblue;
}
.taskbar-title h1 {
  color: black;
  font-size: 2rem;
  writing-mode: sideways-lr;
  text-orientation: sideways;
  text-align: start;
  height: 100%;
  margin: auto;
}
</style>
