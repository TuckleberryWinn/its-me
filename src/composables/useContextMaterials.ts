import * as THREE from 'three';
import { navOutlinePass } from '@/managers/threeSceneManager';

export const testFunction = () => {
	console.log('123123 - test');
};

const interactables: Record<string, Function> = {
	Computer_CRT: () => setOutlineShader('sceneNavigation'),
	Computer_Chair: () => setOutlineShader('sceneNavigation'),
	Dresser_Short: () => setOutlineShader('sceneNavigation'),
	Painting_Desk1: () => setOutlineShader('objectInspect'),
	Painting_Desk2: () => setOutlineShader('objectInspect'),
	Painting_Desk3: () => setOutlineShader('objectInspect'),
};

navOutlinePass.edgeStrength = 12;
navOutlinePass.edgeGlow = 0.8;
navOutlinePass.edgeThickness = 4;
navOutlinePass.pulsePeriod = 3;
navOutlinePass.downSampleRatio = 2.25;

const setOutlineShader = (context: string) => {
	switch (context) {
		case 'sceneNavigation':
			navOutlinePass.edgeStrength = 8;
			navOutlinePass.visibleEdgeColor.set('#2e65e6');
			navOutlinePass.hiddenEdgeColor.set('#001d60');
			break;
		case 'objectInspect':
			navOutlinePass.edgeStrength = 10;
			navOutlinePass.visibleEdgeColor.set('#4ee52c');
			navOutlinePass.hiddenEdgeColor.set('#4ee52c');
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
		setOutlineShader('none');
	}
};
