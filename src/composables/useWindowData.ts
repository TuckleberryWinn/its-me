import { ref } from 'vue';

const width = ref(0);
const height = ref(0);

const resize = () => {
	const clientWidth = window.innerWidth;
	const clientHeight = window.innerHeight;
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

export default () => {
	return {
		width,
		height,
	};
};
