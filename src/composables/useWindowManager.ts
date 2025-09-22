import { ref, watch } from 'vue';
import DesktopApp from '@/components/DesktopApp.vue';
import TaskbarApp from '@/components/TaskbarApp.vue';

let windowTarget = document.getElementById('desktop-app-container');
let taskbarTabTarget = document.getElementById('taskbar-app-container');

export const appList = [
	{
		appName: 'ᗪ乇山爪',
		iconURL: '/src/assets/ui/64xDewm.png',
		appID: 'App:1',
	},
	{
		appName: 'exe not found.exe',
		iconURL: '/src/assets/ui/64xGithub.png',
		appID: 'App:2',
	},
	{
		appName: 'Shmoogle Dome',
		iconURL: '/src/assets/ui/48xChrome.png',
		appID: 'App:3',
	},
	{
		appName: 'KIDZ 101.1FM Radio Jungle',
		iconURL: '/src/assets/ui/64xMusicPlayer.png',
		appID: 'App:4',
	},
	{
		appName: 'Notes',
		iconURL: '/src/assets/ui/64xNotes.png',
		appID: 'App:5',
	},
];

export type AppData = {
	appID: string;
	appName: string;
	iconURL: string;
	isMinimized?: boolean;
	isTopWindow?: boolean;
};

export type DesktopWindow = AppData & {
	xPos: number;
	yPos: number;
};

export const appWindows = ref<DesktopWindow[]>([]);
export const taskbarTabs = ref<AppData[]>([]);

const xWindowOffset: number = 25;
const yWindowOffset: number = 50;

const getIndicesFromAppID = (appID: string) => {
	const windowIndex = appWindows.value.findIndex((app) => app.appID === appID);
	const taskbarIndex = taskbarTabs.value.findIndex((app) => app.appID === appID);
	return [windowIndex, taskbarIndex];
};

export const tryOpenWindow = (targetAppID: string) => {
	if (taskbarTabs.value.find((app) => app.appID === targetAppID)) {
		return;
	}
	const targetApp: AppData = appList.find((x) => x.appID === targetAppID)!;
	targetApp.isMinimized = false;
	targetApp.isTopWindow = true;

	let targetX: number = 100;
	let targetY: number = 150;
	//update target position if other windows are open
	if (appWindows.value.length) {
		targetX = appWindows.value[appWindows.value.length - 1].xPos + xWindowOffset;
		targetY = appWindows.value[appWindows.value.length - 1].yPos + yWindowOffset;
	}

	const newWindowData: DesktopWindow = {
		appID: targetApp.appID,
		appName: targetApp.appName,
		iconURL: targetApp.iconURL,
		isMinimized: targetApp.isMinimized,
		isTopWindow: targetApp.isTopWindow,
		xPos: targetX,
		yPos: targetY,
	};

	taskbarTabs.value.push(newWindowData);
	appWindows.value.push(newWindowData);
	findFrontWindow();
};

const closeWindowByID = (appID: string) => {
	appWindows.value = appWindows.value.filter((win) => win.appID !== appID);
	taskbarTabs.value = taskbarTabs.value.filter((tab) => tab.appID !== appID);
	findFrontWindow();
};

export const minimizeWindowByID = (appID: string) => {
	const indices: number[] = getIndicesFromAppID(appID);
	appWindows.value[indices[0]].isMinimized = true;
	taskbarTabs.value[indices[1]].isMinimized = true;
	findFrontWindow();
};

const tryBringWindowToFront = (appID: string) => {
	const indices: number[] = getIndicesFromAppID(appID);
	const tabIndex = taskbarTabs.value.findIndex((tab) => tab.appID === appID);
	appWindows.value[indices[0]].isMinimized = false;
	taskbarTabs.value[tabIndex].isMinimized = false;
	const targetWindow = appWindows.value.splice(indices[0], 1)[0];
	appWindows.value.push(targetWindow);
	findFrontWindow();
};

const findFrontWindow = () => {
	let topFound: boolean = false;
	for (let i = appWindows.value.length - 1; i >= 0; i--) {
		console.log(topFound);
		appWindows.value[i].isTopWindow = false;
	}
	for (let i = appWindows.value.length - 1; i >= 0; i--) {
		if (!appWindows.value[i].isMinimized && !topFound) {
			topFound = true;
			appWindows.value[i].isTopWindow = true;
		}
	}
};

const updateWindowPosition = (appID: string, newXPos: number, newYPos: number) => {
	const targetIndex = appWindows.value.findIndex((win) => win.appID === appID);
	appWindows.value[targetIndex].xPos = newXPos;
	appWindows.value[targetIndex].yPos = newYPos;
};

export const taskbarAppClick = (appID: string) => {
	const windowMinimized = appWindows.value.find((app) => app.appID === appID)?.isMinimized;
	const windowIsOnTop = appWindows.value.find((app) => app.appID === appID)?.isTopWindow;
	const windowIndex = appWindows.value.findIndex((app) => app.appID === appID);
	const taskbarIndex = taskbarTabs.value.findIndex((app) => app.appID === appID);

	console.log(windowMinimized, windowIndex, taskbarIndex);
	if (windowIsOnTop) {
		minimizeWindowByID(appID);
	} else {
		tryBringWindowToFront(appID);
	}
};

export default () => {
	return {
		appList,
		windows: appWindows,
		taskbarTabs,
		tryOpenWindow,
		closeWindowByID,
		tryBringWindowToFront,
		minimizeWindowByID,
		updateWindowPosition,
	};
};
