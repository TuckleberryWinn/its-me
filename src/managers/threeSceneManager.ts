import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { ref } from 'vue';
import { loadedObjects } from '@/composables/useSceneObjects';
import { EffectComposer, ShaderPass } from 'three/examples/jsm/Addons.js';
import { RenderPass } from 'three/examples/jsm/Addons.js';
import { OutlinePass } from 'three/examples/jsm/Addons.js';
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader.js';

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
renderer.setPixelRatio(window.devicePixelRatio);
renderer.toneMapping = 0;
renderer.toneMappingExposure = 1;
renderer.toneMapping = THREE.NoToneMapping;
renderer.setClearColor(0xffffff, 0);
renderer.outputColorSpace = THREE.SRGBColorSpace;

const composer = new EffectComposer(renderer);
composer.setPixelRatio(window.devicePixelRatio);
composer.setSize(window.innerWidth, window.innerHeight);

const renderPass = new RenderPass(activeScene, camera);
composer.addPass(renderPass);

export let outlinePass = new OutlinePass(
	new THREE.Vector2(window.innerWidth, window.innerHeight),
	activeScene,
	camera,
);

outlinePass.selectedObjects = [];
outlinePass.edgeStrength = 5;
outlinePass.edgeGlow = 0.9;
outlinePass.edgeThickness = 4;
outlinePass.pulsePeriod = 6;
outlinePass.visibleEdgeColor.set('#2e65e6');
outlinePass.hiddenEdgeColor.set('#06d9c08a');

composer.addPass(outlinePass);

const gammaPass = new ShaderPass(GammaCorrectionShader);
composer.addPass(gammaPass);

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
			(currentAspect >= targetAR
				? maximumFOV
				: 2 * Math.atan(Math.tan(minimumFOV / targetAR) / currentAspect)) /
			(Math.PI / 180);
		cameraData.value.currentFOV = fov;

		camera.fov = cameraData.value.currentFOV;
		camera.aspect = aspect;
		camera.updateProjectionMatrix();
		renderer.setPixelRatio(dpr);
		renderer.setSize(clientWidth / 3, clientHeight / 3, true);
		outlinePass = new OutlinePass(
			new THREE.Vector2(window.innerWidth, window.innerHeight),
			activeScene,
			camera,
		);
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
function animate(time: number) {
	if (!isRendering) return;

	const dt = Math.min(0.05, clock.getDelta());

	resize();
	uniforms.iResolution.value.set(1, 1, 1);
	uniforms.iTime.value = time / 1000;
	renderer.render(activeScene, camera);
	for (const object in renderingQueue) {
		renderingQueue[object](dt);
		console.log(object);
	}
	composer.render();
}

renderer.setAnimationLoop(animate);

export const startScene = () => {
	const targetCanvas = renderer.domElement;
	const pageRef = document.getElementById('pageContent');
	targetCanvas.className = 'threeCanvas';
	document.body.insertBefore(targetCanvas, pageRef);
	renderer.setSize(window.innerWidth / 4, window.innerHeight / 4);
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
