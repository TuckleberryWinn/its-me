import * as useTooltip from '@/composables/useTooltip';

/**
 * @property {string}  [0] - Outline shader to trigger.
 * @property {string}  [1] - Cursor to show.
 * @property {string}  [2] - Tooltip to display.
 */
// [0] == {'sceneNavigation' | 'objectInspect'}
// [1] == {	debug | default | inspect | arrow_right | arrow_left | arrow_up | arrow_down }

const interactables: Record<string, string[]> = {
	Computer_CRT: ['sceneNavigation', 'arrow_up'],
};

const focusInteractable = () => {};

const unfocusInteractable = () => {};

export const hoverInteractableUI = (prompt: string, direction: string) => {
	useTooltip.addUIPrompt(prompt, direction);
};
export const unhoverInteractableUI = (prompt: string, direction: string) => {
	useTooltip.removeUIPrompt();
};
