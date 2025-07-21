import { ref } from 'vue';

export type DesktopWindow = {
	iconURL: string;
	appName: string;
	instanceID: number;
	startingXPosition?: number;
	startingYPosition?: number;
};

export type DesktopIcon = {
	iconURL: string;
	appName: string;
};

export type TaskbarTab = {
	iconURL: string;
	appName: string;
	instanceID: number;
};

let currentX = 100;
let currentY = 150;

const windows = ref<DesktopWindow[]>([]);

const openWindow = (newWindowData: DesktopWindow) => {
	if (!newWindowData.startingXPosition) {
		newWindowData.startingXPosition = currentX;
		currentX += 20;
	}
	if (!newWindowData.startingYPosition) {
		newWindowData.startingYPosition = currentY;
		currentY += 40;
	}

	windows.value.push(newWindowData);
};

const closeWindow = (b: DesktopWindow) => {
	windows.value = windows.value.filter((a) => a !== b);
};
const closeWindowByID = (instanceID: number) => {
	windows.value = windows.value.filter((a) => a.instanceID !== instanceID);
};

export default () => {
	return {
		windows,
		openWindow,
		closeWindow,
		closeWindowByID,
	};
};
