import * as THREE from 'three';
import {
	activeScene,
	addToRenderingQueue,
	removeFromRenderingQueue,
	uniforms,
} from '@/managers/threeSceneManager';

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

const geometry = new THREE.BoxGeometry(0.35, 1.25, 0.35);
const fragmentShader = await loadText('./shaders/test.frag');
// const fragmentShader = await loadText('./shaders/wolfenstein.frag');
const vertexShader = await loadText('./shaders/worldSpace.vert');
// const uniforms = {
// 	iTime: { value: 0 },
// 	iResolution: { value: new THREE.Vector3() },
// };

type activeObjectTracker = {
	[key: string]: () => void;
};

export const loadedObjects: activeObjectTracker = {};

//desk-dresser-view
const DRESSER_CUBE_NAME = 'DresserShaderCube';
export const loadDresserShaderCube = () => {
	console.log('loading: ', DRESSER_CUBE_NAME);
	const material = new THREE.ShaderMaterial({
		fragmentShader,
		vertexShader,
		uniforms,
	});
	const cube = new THREE.Mesh(geometry, material);
	const cube2 = new THREE.Mesh(geometry, material);

	cube.name = DRESSER_CUBE_NAME;
	cube2.name = DRESSER_CUBE_NAME + '2';
	cube.position.set(-3.9, 1.6, -2.25);
	cube2.position.set(-1.9, 1.6, -2.25);
	cube.parent = activeScene;
	cube2.parent = activeScene;
	activeScene.add(cube, cube2);

	loadedObjects[cube.name] = () => unloadMesh(cube);
	let speed = 1;
	addToRenderingQueue(cube.name, (dt: number) => {
		{
			if (cube.rotation.y > 1) {
				speed = -1;
			}
			if (cube.rotation.y < -1) {
				speed = 1;
			}
			cube.rotation.y += (speed / 10) * dt;
			cube2.rotation.y -= (speed / 10) * dt;
		}
	});
};

const unloadMesh = (targetObject: THREE.Mesh) => {
	removeFromRenderingQueue(targetObject.name);
	activeScene.remove(targetObject);
	console.log('unloading: ', targetObject);
};
