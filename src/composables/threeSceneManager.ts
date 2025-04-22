import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { render } from 'vue';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.1, 3000);

camera.position.set(0, 1.12, 3.77);

camera.rotation.set(-0.17, 0, 0);

const renderer = new THREE.WebGLRenderer();

const loader = new GLTFLoader();

loader.load('models/desktop_floor.glb', async (gltf) => {
	await scene.add(gltf.scene);
});

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0xff3ff0 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const ambientLight = new THREE.AmbientLight(0xffffff);
ambientLight.position.set(0, 0, 0);
scene.add(ambientLight);

let width;
let height;

const deg = Math.PI / 180;
const resize = () => {
	const canvas = renderer.domElement;
	const clientWidth = canvas.clientWidth;
	const clientHeight = canvas.clientHeight;
	const dpr = window.devicePixelRatio;
	width = clientWidth * dpr;
	height = clientHeight * dpr;
	if (canvas.width !== width || canvas.height !== height) {
		const aspect = width / height;
		const desiredMinimumFov = Math.PI / 4; //90 deg
		// this ensures that I always have a 90deg square in the center of both landscape and portrait viewports
		camera.fov =
			(aspect >= 1 ? desiredMinimumFov : 2 * Math.atan(Math.tan(desiredMinimumFov / 2) / aspect)) /
			deg;
		camera.aspect = aspect;
		camera.updateProjectionMatrix();
		renderer.setPixelRatio(dpr);
		renderer.setSize(clientWidth, clientHeight, false);
	}
};

function animate() {
	resize();
	renderer.render(scene, camera);
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
}

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);

export const startScene = () => {
	const targetCanvas = renderer.domElement;
	const pageRef = document.getElementById('pageContent');
	targetCanvas.className = 'threeCanvas';
	document.body.insertBefore(targetCanvas, pageRef);
};

console.log(scene);
