import * as THREE from 'three';
import { navOutlinePass } from '@/managers/threeSceneManager';

export const testFunction = () => {
	console.log('123123 - test');
};

const interactables: Record<string, Function> = {
	Computer_CRT: () => setNavShader('sceneNavigation'),
	Computer_Chair: () => setNavShader('sceneNavigation'),
	Dresser_Short: () => setNavShader('sceneNavigation'),
	Painting_Desk1: () => setNavShader('objectInspect'),
	Painting_Desk2: () => setNavShader('objectInspect'),
	Painting_Desk3: () => setNavShader('objectInspect'),
};

navOutlinePass.edgeStrength = 12;
navOutlinePass.edgeGlow = 0.8;
navOutlinePass.edgeThickness = 8;
navOutlinePass.pulsePeriod = 6;
navOutlinePass.downSampleRatio = 2.25;
navOutlinePass.visibleEdgeColor.set('#2e65e6');
navOutlinePass.hiddenEdgeColor.set('#001d60');
const setNavShader = (context: string) => {
	switch (context) {
		case 'sceneNavigation':
			navOutlinePass.edgeStrength = 12;
			break;
		case 'objectInspect':
			navOutlinePass.edgeStrength = 40;
			break;
		default:
			navOutlinePass.edgeStrength = 0;
			break;
	}
};

export const updateOutlineShader = (target: THREE.Object3D<THREE.Object3DEventMap>) => {
	let currentCheck = target;
	navOutlinePass.selectedObjects = [target];
	while (currentCheck.parent != null && currentCheck.parent!.name != 'Scene') {
		navOutlinePass.selectedObjects.push(currentCheck.parent!);
		currentCheck = currentCheck.parent!;
	}

	if (currentCheck.name in interactables) {
		interactables[currentCheck.name]();
	} else {
		setNavShader('none');
	}
};
