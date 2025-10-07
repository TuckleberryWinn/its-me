import { reactive, ref, toValue } from 'vue';

export type Store = {
	userName: string;
	shaderData: ShaderData;
};

export type ShaderData = {
	R: number;
	G: number;
	B: number;
};

const defaultGameState: Store = {
	userName: 'Yung Tuckabeezy 😎',
	shaderData: {
		R: 32,
		G: 201,
		B: 243,
	},
};

console.log('store loading');

const SAVE_KEY: string = 'ThisGame.lul';
let loadedState: Store | null = null;

try {
	loadedState = JSON.parse(localStorage.getItem(SAVE_KEY) || '');
} catch (error) {
	console.error('Unable to load game save from local storage');
}

export function resetSaveAndReload() {
	localStorage.clear();
	location.reload();
}

export const store = reactive<Store>(loadedState || defaultGameState);

setInterval(() => {
	localStorage.setItem(SAVE_KEY, JSON.stringify(store));
}, 10000); // autosave every 10 sec

setInterval(function () {}, 200); // 200ms = 5 ticks per second for updates that don't need to happen as frequently.
