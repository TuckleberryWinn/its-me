import { ref } from 'vue';

export const useFixedAspectRatio = ref(true);

export const xCursorOffset = ref(0);
export const yCursorOffset = ref(0);

document.addEventListener('mousemove', (x) => {
	xCursorOffset.value = Math.floor(x.pageX / 4) * 4;
	yCursorOffset.value = Math.floor(x.pageY / 4) * 4;
});
