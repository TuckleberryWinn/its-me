import { ref, watch } from 'vue';

enum Cursor {
	debug = 0,
	default = 1,
	inspect = 2,
	arrow_right = 3,
	arrow_left = 4,
	arrow_up = 5,
	arrow_down = 6,
}

const activePrompts = ref({
	scenePrompt: '',
	uiPrompt: '',
});

const activeCursor = ref({
	sceneCursor: Cursor.default,
	uiCursor: Cursor.default,
});

const errorTextValue = 'If you see this, shit broke :<';
export const isActive = ref(false);
export const textPrompt = ref(errorTextValue);
export const currentGlobalCursor = ref<Cursor>(Cursor.default);

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

watch(activeCursor.value, (newVal, oldVal) => {
	if (newVal.sceneCursor != Cursor.default) {
		currentGlobalCursor.value = newVal.sceneCursor;
	} else if (newVal.uiCursor != Cursor.default) {
		currentGlobalCursor.value = newVal.uiCursor;
	} else {
		currentGlobalCursor.value = Cursor.default;
	}
});

export const addScenePrompt = (prompt: string) => {
	activePrompts.value.scenePrompt = prompt;
};
export const removeScenePrompt = () => {
	activePrompts.value.scenePrompt = '';
	activeCursor.value.sceneCursor = Cursor.default;
};
export const addUIPrompt = (prompt: string, cursor: string) => {
	activePrompts.value.uiPrompt = prompt;
	activeCursor.value.uiCursor = Cursor[`arrow_${cursor}` as keyof typeof Cursor];
};
export const removeUIPrompt = () => {
	activePrompts.value.uiPrompt = '';
	activeCursor.value.uiCursor = Cursor.default;
};

export const newSceneReset = () => {
	removeUIPrompt();
	removeScenePrompt();
};
