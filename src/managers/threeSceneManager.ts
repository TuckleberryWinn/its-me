import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { deltaTime } from 'three/tsl';
import { render } from 'vue';

const loadText = async (path: string): Promise<string> => {
	return (await fetch(path)).text();
};

const customShaderChunks = {
	gradient: await loadText('./shaders/common/gradient.glsl'),
	voronoi: await loadText('./shaders/common/voronoi.glsl'),
	normal: await loadText('./shaders/common/normal.glsl'),
	brick: await loadText('./shaders/common/brick.glsl'),
};

Object.assign(THREE.ShaderChunk, customShaderChunks);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 3000);

camera.position.set(0, 1.12, 4.4);

camera.rotation.set(-0.17, 0, 0);

const renderer = new THREE.WebGLRenderer();

const loader = new GLTFLoader();

loader.load('models/desktop_floor.glb', (gltf) => {
	// scene.add(gltf.scene);
});

const geometry = new THREE.BoxGeometry(1, 1, 1);
const fragmentShader = await loadText('./shaders/test.frag');
const vertexShader = await loadText('./shaders/worldSpace.vert');
const uniforms = {
	iTime: { value: 0 },
	iResolution: { value: new THREE.Vector3() },
};
const material = new THREE.ShaderMaterial({
	fragmentShader,
	vertexShader,
	uniforms,
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const ambientLight = new THREE.AmbientLight(0xffffff);
ambientLight.position.set(0, 0, 0);
scene.add(ambientLight);

let width;
let height;

// const deg = Math.PI / 180;
const resize = () => {
	const canvas = renderer.domElement;
	const clientWidth = canvas.clientWidth;
	const clientHeight = canvas.clientHeight;
	const dpr = window.devicePixelRatio;
	width = clientWidth * dpr;
	height = clientHeight * dpr;
	if (canvas.width !== width || canvas.height !== height) {
		const aspect = width / height;
		// const desiredMinimumFov = Math.PI / 4; //90 deg
		// this ensures that I always have a 90deg square in the center of both landscape and portrait viewports
		// camera.fov =
		// 	(aspect >= 1 ? desiredMinimumFov : 2 * Math.atan(Math.tan(desiredMinimumFov / 2) / aspect)) /
		// 	deg;
		camera.aspect = aspect;
		camera.updateProjectionMatrix();
		renderer.setPixelRatio(dpr);
		renderer.setSize(clientWidth, clientHeight, false);
	}
};

console.log(scene);

const clock = new THREE.Clock();

let isRendering = false;
function animate(time: number) {
	if (!isRendering) return;

	const dt = Math.min(0.05, clock.getDelta());

	resize();
	uniforms.iResolution.value.set(1, 1, 1);
	uniforms.iTime.value = time / 1000;
	renderer.render(scene, camera);
	cubeDance(dt);
}

let speed = 1;
function cubeDance(dt: number) {
	if (cube.rotation.y > 1) {
		speed = -1;
	}

	// if (cube.rotation.y <= 0) {
	// 	speed = 5;
	// }
	cube.rotation.y += speed * dt;
}
renderer.setAnimationLoop(animate);

export const startScene = () => {
	const targetCanvas = renderer.domElement;
	const pageRef = document.getElementById('pageContent');
	targetCanvas.className = 'threeCanvas';
	document.body.insertBefore(targetCanvas, pageRef);
	renderer.setSize(window.innerWidth, window.innerHeight);
};

export const playScene = () => {
	console.log('play scene');
	isRendering = true;
};

export const pauseScene = () => {
	console.log('pause scene');
	isRendering = false;
};
