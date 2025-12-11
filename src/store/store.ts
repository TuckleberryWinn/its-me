import { reactive, ref, toValue } from 'vue';

export type Store = {
	UserName: string;
	BlurryGlass: ShaderData;
};

export type ShaderData = {
	PrimaryColor: string;
};

const defaultGameState: Store = {
	UserName: 'Yung Tuckabeezy 😎',
	BlurryGlass: {
		PrimaryColor: 'rgb(152, 255, 230)',
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

let lastSaveString: string = '';

setInterval(() => {
	const currentString = JSON.stringify(store);
	if (lastSaveString !== currentString) {
		localStorage.setItem(SAVE_KEY, currentString);
		lastSaveString = currentString;
	}
}, 2000); // checks to save changes every 2 seconds

setInterval(function () {}, 200); // 200ms = 5 ticks per second for updates that don't need to happen as frequently.
