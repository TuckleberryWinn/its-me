import { ref } from 'vue';

export type Coordinate = {
	x: Number;
	y: Number;
};

export const activeCoords = ref<Coordinate[]>([]);
