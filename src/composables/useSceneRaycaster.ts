import * as THREE from 'three';
import { ref, watch } from 'vue';
import { camera, renderer, scene } from '../managers/threeSceneManager';

export const mouseOverObjects = ref<THREE.Object3D[]>([]);
export const leftClickSnapshot = ref<THREE.Object3D[]>([]);
export const rightClickSnapshot = ref<THREE.Object3D[]>([]);

export const rayCaster = new THREE.Raycaster();

const hoverRaycast = (ev: MouseEvent) => {
	console.log(ev.clientX, window.innerHeight - ev.clientY);
	const coords = new THREE.Vector2(
		(ev.clientX / renderer.domElement.clientWidth) * 2 - 1,
		((window.innerHeight - ev.clientY) / renderer.domElement.clientHeight) * 2 - 1,
	);
	rayCaster.setFromCamera(coords, camera);

	const intersections = rayCaster.intersectObjects(scene.children, true);
	console.log(intersections);
	// if (intersections.length > 0) {
	// 	const nearTarget = intersections[0].object;
	// 	console.log(intersections);
	// }
};

const clickDownRaycast = (ev: MouseEvent) => {};
const clickUpRaycast = (ev: MouseEvent) => {};

export const setRaycastListeners = () => {
	window.addEventListener('mousemove', hoverRaycast);
	window.addEventListener('mousedown', clickDownRaycast);
	window.addEventListener('mouseup', clickUpRaycast);
	window.addEventListener('contextmenu', (ev: MouseEvent) => {
		ev.preventDefault();
	});
};

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
