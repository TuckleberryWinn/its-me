import * as THREE from 'three';
import { ref, watch } from 'vue';
import { camera, renderer, scene } from '../managers/threeSceneManager';

export const mouseOverObject = ref<string[]>([]);
export const leftClickSnapshot = ref<string[]>([]);
export const rightClickSnapshot = ref<string[]>([]);

export const rayCaster = new THREE.Raycaster();

const hoverRaycast = (ev: MouseEvent) => {
	const coords = new THREE.Vector2(
		(ev.clientX / renderer.domElement.clientWidth) * 2 - 1,
		((window.innerHeight - ev.clientY) / renderer.domElement.clientHeight) * 2 - 1,
	);
	rayCaster.setFromCamera(coords, camera);

	const intersections = rayCaster.intersectObjects(scene.children, true);
	if (intersections) {
		mouseOverObject.value = [...new Set(intersections.map((x) => x.object.name))];
	}
};
const clickDownRaycast = (ev: MouseEvent) => {
	if (ev.button == 0) {
		//left click
		leftClickSnapshot.value = mouseOverObject.value;
	} else if (ev.button == 2) {
		//right click
		rightClickSnapshot.value = mouseOverObject.value;
	}
};
const clickUpRaycast = (ev: MouseEvent) => {
	let clickedObjects: string[] = [];
	const hoverSet = new Set(mouseOverObject.value);
	if (ev.button == 0) {
		//left click
		clickedObjects = [...new Set(leftClickSnapshot.value.filter((x) => hoverSet.has(x)))];
		leftClickSnapshot.value = [];
	} else if (ev.button == 2) {
		//right click
		clickedObjects = [...new Set(rightClickSnapshot.value.filter((x) => hoverSet.has(x)))];
		rightClickSnapshot.value = [];
	}
	console.log(ev.button, clickedObjects);
};

export const setRaycastListeners = () => {
	window.addEventListener('mousemove', hoverRaycast);
	window.addEventListener('mousedown', clickDownRaycast);
	window.addEventListener('mouseup', clickUpRaycast);
	window.addEventListener('contextmenu', (ev: MouseEvent) => {
		ev.preventDefault();
	});
};

export const onObjectFocus = (object: string) => {
	console.log('add to tracked: ', object);
};
export const onObjectDefocus = (object: string) => {
	console.log('mark untracked: ', object);
};

//Watches the objects under mouse raycast and sends updates when focus is gained/lost in 3D space
watch(mouseOverObject, (oldVal, newVal) => {
	const gainedFocus = oldVal.filter((x) => !newVal.includes(x));
	if (gainedFocus.length > 0) {
		gainedFocus.forEach((x) => {
			onObjectFocus(x);
		});
	}
	const lostFocus = newVal.filter((x) => !oldVal.includes(x));
	if (lostFocus.length > 0) {
		lostFocus.forEach((x) => {
			onObjectDefocus(x);
		});
	}
});

const mouseModel = scene.getObjectByName('Computer_Mouse001');
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
