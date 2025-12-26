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
.emulator {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.control-panel {
	height: 2.5rem;
  background: linear-gradient(180deg,
  rgba(40, 27, 67, 1) 0%,
  rgba(40, 27, 67, 0.4) 14%,
  rgba(40, 27, 67, 0.5) 84%,
  rgba(40, 27, 67, 1) 92%,
  rgba(0, 255, 212, 1) 100%);
}

.app-container {
	align-items: center;
  margin: auto
}

.app-display {
	width: 360px;
	height: 740px;
}
</style>
