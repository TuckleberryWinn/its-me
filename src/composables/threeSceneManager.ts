import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.1, 3000);

camera.position.set(0, 1.12, 3.77);

camera.rotation.set(-.17, 0, 0);

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
ambientLight.position.set(0,0,0);
scene.add(ambientLight);

function animate() {
	renderer.render(scene, camera);
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
}

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);

export const startScene = () => {
	document.body.appendChild(renderer.domElement);
};

console.log(scene)
