import { ref } from 'vue';
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
};

export type DesktopWindow = {
	appData: AppData;
	xPos: number;
	yPos: number;
};

export const windows = ref<DesktopWindow[]>([]);
export const taskbarTabs = ref<AppData[]>([]);

const xWindowOffset: number = 25;
const yWindowOffset: number = 50;

export const tryOpenWindow = (targetAppID: string) => {
	//all possible arguments are created from the same source file.
	const targetApp: AppData = appList.find((app) => app.appID === targetAppID)!;

	if (taskbarTabs.value.find((app) => app.appID === targetAppID)) {
		console.log(`Window already open`);
		return;
	}
	console.log('length: ', windows.value);
	let targetX: number = 100;
	let targetY: number = 150;
	//update target position if other windows are open
	if (windows.value.length) {
		console.log('length: ', windows.value);
		targetX = windows.value[windows.value.length - 1].xPos + xWindowOffset;
		targetY = windows.value[windows.value.length - 1].yPos + yWindowOffset;
	}

	const newWindowData: DesktopWindow = {
		appData: targetApp,
		xPos: targetX,
		yPos: targetY,
	};

	console.log(taskbarTabs.value);
	console.log(newWindowData);

	taskbarTabs.value.push(targetApp);
	windows.value.push(newWindowData);
	console.log(windows.value);
};

const closeWindowByID = (instanceID: string) => {
	windows.value = windows.value.filter((win) => win.appData.appID !== instanceID);
	taskbarTabs.value = taskbarTabs.value.filter((tab) => tab.appID !== instanceID);
	console.log(windows.value);
};

const tryBringWindowToFront = (appID: string) => {
	if (!windows.value.length) {
		console.log('bug fixed <3');
		return;
	}
	console.log(`Bring ${appID} to front.`);
	const targetIndex = windows.value.findIndex((win) => win.appData.appID === appID);
	windows.value.push(windows.value.splice(targetIndex, 1)[0]);
};

const updateWindowPosition = (appID: string, newXPos: number, newYPos: number) => {
	const targetIndex = windows.value.findIndex((win) => win.appData.appID === appID);
	windows.value[targetIndex].xPos = newXPos;
	windows.value[targetIndex].yPos = newYPos;
};

export default () => {
	return {
		appList,
		windows,
		taskbarTabs,
		tryOpenWindow,
		closeWindowByID,
		tryBringWindowToFront,
		updateWindowPosition,
	};
};
