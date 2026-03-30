import { ref, watch } from 'vue';

// export const setTooltip = (prompt: string) => {
// 	isActive.value = true;
// 	textPrompt.value = prompt;
// };
// export const hideTooltip = () => {
// 	isActive.value = false;
// };

const activePrompts = ref({
	scenePrompt: '',
	uiPrompt: '',
});

const errorTextValue = 'If you see this, shit broke :<';
export const isActive = ref(false);
export const textPrompt = ref(errorTextValue);

watch(activePrompts.value, (newVal, oldVal) => {
	if (newVal.scenePrompt != '') {
		isActive.value = true;
		textPrompt.value = newVal.scenePrompt;
	} else if (newVal.uiPrompt != '') {
		isActive.value = true;
		textPrompt.value = newVal.uiPrompt;
	} else {
		textPrompt.value = errorTextValue;
		isActive.value = false;
	}
});

export const addScenePrompt = (prompt: string) => {
	activePrompts.value.scenePrompt = prompt;
	textPrompt.value = prompt;
};
export const removeScenPrompt = () => {
	activePrompts.value.scenePrompt = '';
};
export const addUIPrompt = (prompt: string) => {
	activePrompts.value.uiPrompt = prompt;
};
export const removeUIPrompt = () => {
	activePrompts.value.uiPrompt = '';
};

export const newSceneReset = () => {
	removeUIPrompt();
	removeScenPrompt();
};
