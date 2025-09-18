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

function setTopWindow(appID: string) {
	appWindows.value.forEach((x) => (x.isTopWindow = x.appID === appID));
	taskbarTabs.value.forEach((x) => (x.isTopWindow = x.appID === appID));
}

export const tryOpenWindow = (targetAppID: string) => {
	//all possible arguments are created from the same source file.
	const targetApp: AppData = appList.find((x) => x.appID === targetAppID)!;

	if (taskbarTabs.value.find((app) => app.appID === targetAppID)) {
		console.log(`Window already open`);
		return;
	}
	console.log('length: ', appWindows.value);
	let targetX: number = 100;
	let targetY: number = 150;
	//update target position if other windows are open
	if (appWindows.value.length) {
		console.log('length: ', appWindows.value);
		targetX = appWindows.value[appWindows.value.length - 1].xPos + xWindowOffset;
		targetY = appWindows.value[appWindows.value.length - 1].yPos + yWindowOffset;
	}

	const newWindowData: DesktopWindow = {
		appID: targetApp.appID,
		appName: targetApp.appName,
		iconURL: targetApp.iconURL,
		isMinimized: false,
		isTopWindow: false,
		xPos: targetX,
		yPos: targetY,
	};

	console.log(taskbarTabs.value);
	console.log(newWindowData);

	taskbarTabs.value.push(newWindowData);
	appWindows.value.push(newWindowData);
	setTopWindow(targetApp.appID);
	console.log(appWindows.value);
};

const closeWindowByID = (instanceID: string) => {
	appWindows.value = appWindows.value.filter((win) => win.appID !== instanceID);
	taskbarTabs.value = taskbarTabs.value.filter((tab) => tab.appID !== instanceID);
	console.log(appWindows.value);
};

const tryBringWindowToFront = (appID: string) => {
	if (!appWindows.value.length) {
		console.log('bug fixed <3');
		return;
	}
	console.log(`Bring ${appID} to front.`);
	const targetIndex = appWindows.value.findIndex((win) => win.appID === appID);
	appWindows.value.push(appWindows.value.splice(targetIndex, 1)[0]);

	setTopWindow(appID);
};

const updateWindowPosition = (appID: string, newXPos: number, newYPos: number) => {
	const targetIndex = appWindows.value.findIndex((win) => win.appID === appID);
	appWindows.value[targetIndex].xPos = newXPos;
	appWindows.value[targetIndex].yPos = newYPos;
};

const minimizeFrontWindow = () => {
	const targetWin: DesktopWindow = appWindows.value.pop()!;
	appWindows.value.unshift(targetWin);
	appWindows.value[0].isTopWindow = false;
	const arrayLength = appWindows.value.length - 1;

	if (appWindows.value[arrayLength].isMinimized) return;
	appWindows.value[arrayLength].isTopWindow = true;
};

export const taskbarAppClick = (appID: string) => {
	const windowMinimized = appWindows.value.find((app) => app.appID === appID)?.isMinimized;
	const windowIsOnTop = appWindows.value.find((app) => app.appID === appID)?.isTopWindow;
	const windowIndex = appWindows.value.findIndex((app) => app.appID === appID);
	const taskbarIndex = taskbarTabs.value.findIndex((app) => app.appID === appID);

	console.log(windowMinimized, windowIndex, taskbarIndex);
	if (windowIsOnTop) {
		appWindows.value[windowIndex].isMinimized = true;
		taskbarTabs.value[taskbarIndex].isMinimized = true;
		minimizeFrontWindow();
	} else if (windowMinimized) {
		appWindows.value[windowIndex].isMinimized = false;
		taskbarTabs.value[taskbarIndex].isMinimized = false;
		tryBringWindowToFront(appID);
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
		updateWindowPosition,
	};
};
