import * as THREE from 'three';
import { outlinePass } from '@/managers/threeSceneManager';

export const testFunction = () => {
	console.log('123123 - test');
};

export const updateOutlineShader = (target: THREE.Object3D<THREE.Object3DEventMap>) => {
	let currentCheck = target;
	outlinePass.selectedObjects = [target];

	while (currentCheck.parent!.name != 'Scene') {
		outlinePass.selectedObjects.push(currentCheck.parent!);
		currentCheck = currentCheck.parent!;
	}
	console.log(outlinePass.selectedObjects);
};
