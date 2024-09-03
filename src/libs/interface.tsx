interface Attack {
	name: string;
	type: string;
	damage: string;
}

interface Evolution {
	name: string;
	image: string;
}

interface Pokemon {
	name: string;
	image: string;
	attacks: {
		fast: Attack[];
		special: Attack[];
	};
	evolutions: Evolution[];
}

export interface PokemonCardProps {
	pokemon?: Pokemon;
	onEvolutionClick: (name: string) => void;
}
