import { ref, type Ref } from 'vue';

export default (watchElement: Ref<HTMLElement>) => {
	const width = ref(0);
	const height = ref(0);

	const resize = () => {
		if (!watchElement.value) return;

		const rect = watchElement.value.getBoundingClientRect();
		const clientWidth = rect.width;
		const clientHeight = rect.height;
		if (clientWidth !== width.value || clientHeight !== height.value) {
			width.value = clientWidth;
			height.value = clientHeight;
		}
	};

	const loop = () => {
		requestAnimationFrame(loop);
		resize();
	};
	requestAnimationFrame(loop);

	return {
		width,
		height,
	};
};
