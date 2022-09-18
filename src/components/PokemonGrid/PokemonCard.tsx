import { AddToCartButton } from "./AddToCartButton";

import type { InfoPokemonProps } from ".";

type PokemonCardProps = {
	poke: InfoPokemonProps;
};

export const PokemonCard = ({ poke }: PokemonCardProps) => {
	return (
		<div className="grid-results__pokemonCard">
			<div className="grid-results__pokemonCard--img">
				<img
					src={poke?.sprites?.front_default}
					alt={`Sprite principal do ${poke?.name}`}
				/>
			</div>
			<p className="grid-results__pokemonCard--name">
				#{poke?.id} {poke?.name.split("-")[0]}
			</p>
			<div className="grid-results__pokemonCard--types">
				{poke?.types.map((type) => {
					return (
						<span
							key={`${poke?.name}-type-${type?.type.name}`}
							className={type?.type.name}
						>
							{type?.type.name}
						</span>
					);
				})}
			</div>
			<p className="grid-results__pokemonCard--price">$ 23,50</p>
			<AddToCartButton pokemon={poke} />
		</div>
	);
};
