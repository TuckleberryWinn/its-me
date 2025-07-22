import { ref } from 'vue';
import DesktopApp from '@/components/DesktopApp.vue';
import TaskbarApp from '@/components/TaskbarApp.vue';

const windowTarget = document.getElementById("desktop-app-container")
const taskbarTabTarget = document.getElementById("taskbar-app-container")

export type AppData = {
  appID: number;
  appName: string;
  iconURL: string;
};

export type DesktopWindow = {
  appData: AppData
	startingXPosition?: number;
	startingYPosition?: number;
};



let currentX = 100;
let currentY = 150;

const windows = ref<DesktopWindow[]>([]);

const openWindow = (newApp: AppData) => {

let newWindow: typeof DesktopApp = DesktopApp;
newWindow.startingXPosition = currentX
newWindow.startingYPosition = currentY

console.log(newWindow)

let newTaskbarTab = TaskbarApp


	// if (!newWindowData.startingXPosition) {
	// 	newWindowData.startingXPosition = currentX;
	// 	currentX += 20;
	// }
	// if (!newWindowData.startingYPosition) {
	// 	newWindowData.startingYPosition = currentY;
	// 	currentY += 40;
	// }

	// windows.value.push(newWindowData);
};

const closeWindow = (b: DesktopWindow) => {
	windows.value = windows.value.filter((a) => a !== b);
};
const closeWindowByID = (instanceID: number) => {
  let windowToClose = document.getElementById(instanceID.toString())
  if (!windowToClose) {
    return;
  }
  windowToClose.remove()
	windows.value = windows.value.filter((a) => a.appID !== instanceID);
};

export default () => {
	return {
		windows,
		openWindow,
		closeWindow,
		closeWindowByID,
	};
};
