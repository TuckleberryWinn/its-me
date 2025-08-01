import { ref } from 'vue';
import DesktopApp from '@/components/DesktopApp.vue';
import TaskbarApp from '@/components/TaskbarApp.vue';

let windowTarget = document.getElementById('desktop-app-container');
let taskbarTabTarget = document.getElementById('taskbar-app-container');

export const appList = [
	{
		appName: 'ᗪ乇山爪',
		iconURL: '/src/assets/ui/64xDewm.png',
		appID: 1,
	},
	{
		appName: 'exe not found.exe',
		iconURL: '/src/assets/ui/64xGithub.png',
		appID: 2,
	},
	{
		appName: 'Shmoogle Dome',
		iconURL: '/src/assets/ui/48xChrome.png',
		appID: 3,
	},
];

export type AppData = {
	appID: number;
	appName: string;
	iconURL: string;
};

export type DesktopWindow = {
	appData: AppData;
	startingXPosition: number;
	startingYPosition: number;
};

export const windows = ref<DesktopWindow[]>([]);
export const taskbarTabs = ref<AppData[]>([]);

const xWindowOffset: number = 30;
const yWindowOffset: number = 30;

const tryOpenWindow = (targetAppID: number) => {
	//all possible arguments are created from the same source file.
	const targetApp: AppData = appList.find((app) => app.appID === targetAppID)!;

	if (taskbarTabs.value.find((app) => app.appID === targetAppID)) {
		console.log(`Window already open`);
		return;
	}

	//sets target location to open relative to top window. Default location is first window.
	let targetX: number, targetY: number;
	if (windows.value.length === 0) {
		targetX = 100;
		targetY = 150;
	} else {
		// const element = document.getElementById(windows.value[0].appData.appID.toString());
		// const computedStyle = window.getComputedStyle(element);
		// targetX = parseInt(computedStyle.left) + xWindowOffset;
		// targetY = +computedStyle.top + yWindowOffset;

		targetX = 200;
		targetY = 250;
	}

	let windowData: DesktopWindow = {
		appData: targetApp,
		startingXPosition: targetX,
		startingYPosition: targetY,
	};

	console.log(taskbarTabs.value);
	console.log(windowData.startingXPosition);

	taskbarTabs.value.push(targetApp);
	windows.value.push(windowData);
	console.log(windows.value);
};

const closeWindowByID = (instanceID: number) => {
	let windowToClose = document.getElementById(instanceID.toString());
	if (!windowToClose) {
		return;
	}
	windowToClose.remove();
};

export default () => {
	return {
		windows,
		taskbarTabs,
		tryOpenWindow,
		closeWindowByID,
		appList,
	};
};
