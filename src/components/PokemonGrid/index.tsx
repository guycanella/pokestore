import { Info } from "phosphor-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { SearchPokemonProps, Union } from "../../App";
import { AddToCartButton } from "./AddToCartButton";

import "./styles.scss";

type PokemonGridProps = {
	results: Union;
};

type BasicProps = {
	name: string;
	url: string;
};

export type InfoPokemonProps = {
	abilities: Array<{
		ability: BasicProps;
		is_hidden: boolean;
		slot: number;
	}>;
	base_experience: number;
	forms: Array<BasicProps>;
	game_indices: any[];
	height: number;
	held_items: Array<{
		item: BasicProps;
		version_details: Array<{
			rarity: number;
			version: BasicProps;
		}>;
	}>;
	id: number;
	is_default: boolean;
	location_area_encounters: string;
	moves: Array<{
		move: BasicProps;
		version_group_details: Array<{
			level_learned_at: number;
			move_learn_method: BasicProps;
			version_group: BasicProps;
		}>;
	}>;
	name: string;
	order: number;
	past_types: any[];
	species: BasicProps;
	sprites: {
		back_default?: string;
		back_female?: string;
		back_shiny?: string;
		back_shiny_female?: string;
		front_default?: string;
		front_female?: string;
		front_shiny?: string;
		front_shiny_female?: string;
	};
	stats: Array<{
		base_stat: number;
		effort: number;
		stat: BasicProps;
	}>;
	types: Array<{
		slot: number;
		type: BasicProps;
	}>;
	weight: number;
};

export const PokemonGrid = ({ results }: PokemonGridProps) => {
	const [infoPokemon, setInfoPokemon] = useState<InfoPokemonProps[]>([]);
	const ids = useMemo(() => {
		return [] as string[];
	}, []);

	const fetchInfoPokemon = useCallback(async (poke: SearchPokemonProps) => {
		await fetch(poke?.url)
			.then((res) => {
				if (res.ok) {
					return res.json();
				}
			})
			.then((data) => {
				setInfoPokemon((prevState) => [...prevState, data]);
			});
	}, []);

	useEffect(() => {
		results.forEach((pokemon) => {
			if (pokemon && !ids.includes(pokemon?.url)) {
				fetchInfoPokemon(pokemon);
				ids.push(pokemon?.url);
			}
		});
	}, [results, fetchInfoPokemon, ids]);

	return (
		<div className="grid-results">
			{infoPokemon.map((pokemon) => {
				return (
					<div key={pokemon?.name} className="grid-results__pokemonCard">
						<button className="grid-results__pokemonCard--info">
							<Info size={24} />
						</button>
						<div className="grid-results__pokemonCard--img">
							<img
								src={pokemon?.sprites?.front_default}
								alt={`Sprite principal do ${pokemon?.name}`}
							/>
						</div>
						<p className="grid-results__pokemonCard--name">
							#{pokemon?.id} {pokemon?.name.split("-")[0]}
						</p>
						<div className="grid-results__pokemonCard--types">
							{pokemon?.types.map((type) => {
								return (
									<span
										key={`${pokemon?.name}-type-${type?.type.name}`}
										className={type?.type.name}
									>
										{type?.type.name}
									</span>
								);
							})}
						</div>
						<p className="grid-results__pokemonCard--price">$ 23,50</p>
						<AddToCartButton pokemon={pokemon} />
					</div>
				);
			})}
		</div>
	);
};
