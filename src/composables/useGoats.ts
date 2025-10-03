import { ref } from 'vue';

export type Goat = {
	name: string;
	powerLevel: number;
	isGrumpy: boolean;
};

export default () => {
	const goats = ref<Goat[]>([]);

	const addGoat = (newWindowData: Goat) => {
		goats.value.push(newWindowData);
	};

	const removeGoat = (b: Goat) => {
		goats.value.filter((a) => a !== b);
	};
	return {
		goats,
		addGoat,
		removeGoat,
	};
};

let age: number = 20;

let canDrink: boolean = false;
let canVote: boolean = false;

if (age > 21) {
	canDrink = true;
	canVote = true;
} else if (age > 18) {
	canVote = true;
} else {
	blockUser();
}
console.log(canDrink, canVote);
function blockUser() {
	throw new Error('Function not implemented.');
}

export type Coordinate = {
	x: Number;
	y: Number;
};

export const activeCoords = ref<Coordinate[]>([]);
