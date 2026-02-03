import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { ref, watch } from 'vue';

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

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 500);
camera.rotation.order = 'YXZ';
export const cameraData = ref({
	currentFOV: 45,
	position: [-2, 1.6, -1.48],
	rotation: [-0.3, 1.5708, 0],
});

const renderer = new THREE.WebGLRenderer();

const loader = new GLTFLoader();

loader.load('models/Blockout.glb', (gltf) => {
	const mesh = gltf.scene.children;
	const textureLoader = new THREE.TextureLoader();
	const newTexture = textureLoader.load('textures/BlockoutMaterial.png');
	newTexture.flipY = false;
	mesh.forEach((model) => {
		(model as THREE.Mesh).material.map = newTexture;
	});
	scene.add(gltf.scene);
});

const geometry = new THREE.BoxGeometry(0.2, 2.8, 4);
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

const pointLight = new THREE.PointLight(0xffffff, 60, 30, 2);
pointLight.position.set(-0.2, 1.62, 1.1);
scene.add(pointLight);

let width;
let height;
const minimumFOV = Math.PI / 3.9;
const maximumFOV = Math.PI / 6.78;

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
		const currentAspect = window.innerWidth / window.innerHeight;
		const fov =
			(currentAspect >= 16 / 9
				? maximumFOV
				: 2 * Math.atan(Math.tan(minimumFOV / 2) / currentAspect)) /
			(Math.PI / 180);
		cameraData.value.currentFOV = fov;
		console.log('current FOV', cameraData.value.currentFOV);
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
	isRendering = true;
};

export const playScene = () => {
	console.log('play scene');
	isRendering = true;
};

export const pauseScene = () => {
	console.log('pause scene');
	isRendering = false;
};

type SceneData = {
	path: string;
	position: number[];
	rotation: number[];
};

const DeskView: SceneData = {
	path: '/',
	position: [-2.4, 1.7, -0.25],
	rotation: [-0.3, 0.9, 0],
};
const ScreenView: SceneData = {
	path: '/desktop-view',
	position: [-3.6567, 1.23, -1.48],
	rotation: [0, 1.5708, 0],
};

type SceneRecord = Record<string, SceneData>;

const SceneIndex: SceneRecord = {
	DeskView,
	ScreenView,
};

export const swapScene = (targetScene: string) => {
	const newPos = SceneIndex[targetScene].position;
	const newRot = SceneIndex[targetScene].rotation;

	camera.position.set(newPos[0], newPos[1], newPos[2]);
	camera.rotation.set(newRot[0], newRot[1], newRot[2]);

	console.log('swapped to: ', targetScene);
};
