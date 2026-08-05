import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { ref } from 'vue';
import { loadedObjects } from '@/composables/useSceneObjects';
import { EffectComposer, ShaderPass } from 'three/examples/jsm/Addons.js';
import { RenderPass, OutlinePass } from 'three/examples/jsm/Addons.js';
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader.js';
import { RenderPixelatedPass } from 'three/addons/postprocessing/RenderPixelatedPass.js';

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

export const activeScene = new THREE.Scene();
activeScene.background = new THREE.Color().set('#280231');

export const camera = new THREE.PerspectiveCamera(
	30,
	window.innerWidth / window.innerHeight,
	0.1,
	500,
);
camera.rotation.order = 'YXZ';

export type SceneData = {
	position: number[];
	rotation: number[];
};

type CameraData = SceneData & {
	currentFOV: number;
};

export const cameraData = ref<CameraData>({
	position: [],
	rotation: [],
	currentFOV: 30,
});

export const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.setPixelRatio(1);
renderer.toneMapping = 0;
renderer.toneMappingExposure = 1;
renderer.toneMapping = THREE.NoToneMapping;
renderer.setClearColor(0xffffff, 0);
renderer.outputColorSpace = THREE.SRGBColorSpace;

export const composer = new EffectComposer(renderer);
composer.setPixelRatio(1);
composer.setSize(window.innerWidth, window.innerHeight);

const renderPass = new RenderPass(activeScene, camera);
const gammaPass = new ShaderPass(GammaCorrectionShader);

const renderPixelatedPass = new RenderPixelatedPass(3, activeScene, camera);
renderPixelatedPass.depthEdgeStrength = 0;
renderPixelatedPass.normalEdgeStrength = 0;

export let navOutlinePass = new OutlinePass(
	new THREE.Vector2(window.innerWidth, window.innerHeight),
	activeScene,
	camera,
);

navOutlinePass.selectedObjects = [];

composer.addPass(renderPass);
composer.addPass(renderPixelatedPass);
composer.addPass(gammaPass);
composer.addPass(navOutlinePass);

const loader = new GLTFLoader();

loader.load('models/Blockout.glb', (gltf) => {
	const mesh = gltf.scene.children;
	const textureLoader = new THREE.TextureLoader();
	const newTexture = textureLoader.load('textures/BlockoutMaterial.png');
	newTexture.flipY = false;
	mesh.forEach((model) => {
		((model as THREE.Mesh).material as THREE.MeshStandardMaterial).map = newTexture;
	});
	activeScene.add(gltf.scene);
});

const fragmentShader = await loadText('./shaders/test.frag');
const vertexShader = await loadText('./shaders/worldSpace.vert');
export const uniforms = {
	iTime: { value: 0 },
	iResolution: { value: new THREE.Vector3() },
};

const pointLight = new THREE.PointLight(0xffffff, 75, 30, 2);
pointLight.position.set(-0.2, 1.62, 1.1);
activeScene.add(pointLight);

let width;
let height;
const minimumFOV = Math.PI / 4;
const maximumFOV = Math.PI / 6;
const targetAR = 16 / 9;

// const deg = Math.PI / 180;
const resize = (forceRunAll: boolean, crunchScale: number) => {
	const canvas = renderer.domElement;
	const clientWidth = canvas.clientWidth;
	const clientHeight = canvas.clientHeight;
	const dpr = 1;
	width = Math.floor(clientWidth * dpr);
	height = Math.floor(clientHeight * dpr);
	if (canvas.width !== width || canvas.height !== height || forceRunAll) {
		console.log('resize', forceRunAll, canvas.width, width, canvas.height, height);
		const aspect = width / height;
		const currentAspect = window.innerWidth / window.innerHeight;
		const fov =
			(currentAspect >= targetAR
				? maximumFOV
				: 2 * Math.atan(Math.tan(minimumFOV / targetAR) / currentAspect)) /
			(Math.PI / 180);
		cameraData.value.currentFOV = fov;

		camera.fov = cameraData.value.currentFOV;
		camera.aspect = aspect;
		camera.updateProjectionMatrix();
		renderer.setPixelRatio(dpr);
		renderer.setSize(clientWidth / crunchScale, clientHeight / crunchScale, true);
	}
};

const clock = new THREE.Clock();

export type FrameRequest = {
	[key: string]: (arg: number) => void;
};
let renderingQueue: FrameRequest = {};

export const addToRenderingQueue = (name: string, animation: (arg: number) => void) => {
	renderingQueue[name] = animation;
};
export const removeFromRenderingQueue = (name: string) => {
	delete renderingQueue[name];
};

let isRendering = false;
let firstPass = true;
const crunchScale: number = 1;
function animate(time: number) {
	if (firstPass) {
		resize(true, crunchScale);
		firstPass = false;
		console.log('first pass');
	}

	if (!isRendering) return;

	const dt = Math.min(0.05, clock.getDelta());

	resize(false, crunchScale);
	uniforms.iResolution.value.set(1, 1, 1);
	uniforms.iTime.value = time / 1000;
	renderer.render(activeScene, camera);
	for (const object in renderingQueue) {
		renderingQueue[object](dt);
	}
	composer.render();
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

const clearLoadedObjects = () => {
	for (const object in loadedObjects) {
		loadedObjects[object]();
	}
};

export const swapScene = (targetScene: SceneData) => {
	const newPos = targetScene.position;
	const newRot = targetScene.rotation;
	clearLoadedObjects();
	camera.position.set(newPos[0], newPos[1], newPos[2]);
	camera.rotation.set(newRot[0], newRot[1], newRot[2]);

	console.log('swapped to: ', targetScene, camera);
};
