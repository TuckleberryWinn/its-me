import * as THREE from 'three';
import { ref, watch } from 'vue';
import { camera, renderer, activeScene } from '../managers/threeSceneManager';
import { outlinePass } from '../managers/threeSceneManager';

export const mouseOverObject = ref<string>('');
export const leftClickSnapshot = ref<string>('');
export const rightClickSnapshot = ref<string>('');

export type RaycastCallback = {
	[key: string]: () => void;
};

export type CallbackLibrary = {
	onFocus: RaycastCallback;
	onUnfocus: RaycastCallback;
	onLeftMouseDown: RaycastCallback;
	onLeftMouseUp: RaycastCallback;
	onRightMouseDown: RaycastCallback;
	onRightMouseUp: RaycastCallback;
};

let activeObjectCallbacks: CallbackLibrary = {
	onFocus: {
		Bedroom_Floor: () => {
			console.log('Gain Focus');
		},
	},
	onUnfocus: {
		Bedroom_Floor: () => {
			console.log('Lose Focus');
		},
	},
	onLeftMouseDown: {
		Bedroom_Floor: () => {
			console.log('L Mouse Down');
		},
	},
	onLeftMouseUp: {
		Bedroom_Floor: () => {
			console.log('L Mouse Up');
		},
	},
	onRightMouseDown: {
		Bedroom_Floor: () => {
			console.log('R Mouse Down');
		},
	},
	onRightMouseUp: {
		Bedroom_Floor: () => {
			console.log('R Mouse Up');
		},
	},
};

const rayCaster = new THREE.Raycaster();

const hoverRaycast = (ev: MouseEvent) => {
	const coords = new THREE.Vector2(
		(ev.clientX / renderer.domElement.clientWidth) * 2 - 1,
		((window.innerHeight - ev.clientY) / renderer.domElement.clientHeight) * 2 - 1,
	);
	rayCaster.setFromCamera(coords, camera);

	const intersections = rayCaster.intersectObjects(activeScene.children, true);
	if (intersections.length > 0) {
		outlinePass.selectedObjects = [intersections[0].object];
		mouseOverObject.value = intersections[0].object.name;
	}
};

const clickDownRaycast = (ev: MouseEvent) => {
	if (ev.button == 0) {
		//left click
		leftClickSnapshot.value = mouseOverObject.value;
		if (leftClickSnapshot.value in activeObjectCallbacks.onLeftMouseDown) {
			activeObjectCallbacks.onLeftMouseDown[leftClickSnapshot.value]();
		}
	} else if (ev.button == 2) {
		//right click
		rightClickSnapshot.value = mouseOverObject.value;
		if (rightClickSnapshot.value in activeObjectCallbacks.onRightMouseDown) {
			activeObjectCallbacks.onRightMouseDown[rightClickSnapshot.value]();
		}
	}
};

const clickUpRaycast = (ev: MouseEvent) => {
	if (ev.button == 0 && leftClickSnapshot.value == mouseOverObject.value) {
		//left click
		if (leftClickSnapshot.value in activeObjectCallbacks.onLeftMouseUp) {
			activeObjectCallbacks.onLeftMouseUp[leftClickSnapshot.value]();
		}
		leftClickSnapshot.value = '';
	} else if (ev.button == 2 && rightClickSnapshot.value == mouseOverObject.value) {
		//right click
		if (rightClickSnapshot.value in activeObjectCallbacks.onRightMouseUp) {
			activeObjectCallbacks.onRightMouseUp[rightClickSnapshot.value]();
		}
		rightClickSnapshot.value = '';
	}
};

const onObjectFocus = (object: string) => {
	if (object in activeObjectCallbacks.onFocus) {
		activeObjectCallbacks.onFocus[object]();
	}
};

const onObjectDefocus = (object: string) => {
	if (object in activeObjectCallbacks.onUnfocus) {
		activeObjectCallbacks.onUnfocus[object]();
	}
};

//Watches the objects under mouse raycast and sends updates when focus is gained/lost in 3D space
watch(mouseOverObject, (newVal, oldVal) => {
	onObjectDefocus(oldVal);
	onObjectFocus(newVal);
});

export const setRaycastListeners = () => {
	window.addEventListener('mousemove', hoverRaycast);
	window.addEventListener('mousedown', clickDownRaycast);
	window.addEventListener('mouseup', clickUpRaycast);
	window.addEventListener('contextmenu', (ev: MouseEvent) => {
		ev.preventDefault();
	});
};

export const setNewSceneCallbacks = (sceneLibrary: CallbackLibrary) => {
	activeObjectCallbacks = sceneLibrary;
};

const mouseModel = activeScene.getObjectByName('Computer_Mouse');
const mouseOrigin = mouseModel!.position.clone();

window.addEventListener('mousemove', (ev: MouseEvent) => {
	const canvas = renderer.domElement;
	const clientWidth = canvas.clientWidth;
	const clientHeight = canvas.clientHeight;
	const mouseX = ev.clientX / clientWidth - 0.5;
	const mouseY = ev.clientY / clientHeight - 0.5;

	mouseModel!.position.x = mouseOrigin!.x + mouseY * 0.075;
	mouseModel!.position.z = mouseOrigin!.z - mouseX * 0.075;
});

console.log(mouseModel);
