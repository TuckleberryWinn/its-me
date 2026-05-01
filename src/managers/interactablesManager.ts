import * as useTooltip from '@/composables/useTooltip';

export const hoverInteractableUI = (prompt: string, direction: string) => {
	useTooltip.addUIPrompt(prompt, direction);
};
export const unhoverInteractableUI = (prompt: string, direction: string) => {
	useTooltip.removeUIPrompt();
};
