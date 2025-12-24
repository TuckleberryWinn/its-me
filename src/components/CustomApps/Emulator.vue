<script lang="ts" setup>
import MobileView from '@/components/MobileBio.vue';
import { ref } from 'vue';

const currentView = ref('mobile');
</script>

<template>
	<div class="emulator">
		<div class="control-panel"></div>
		<div class="app-container">
			<div class="app-display">
				<MobileView></MobileView>
			</div>
		</div>
	</div>
</template>

<style scoped>
.control-panel {
	height: 2.5rem;
	background-color: aquamarine;
}

.app-container {
	width: 100%;
	height: 100%;
	align-items: center;
}

.app-display {
	/* background-color: rgba(18, 62, 100, 0.547); */
	width: 360px;
	height: 740px;
	border: 2px solid blueviolet;
}
</style>
