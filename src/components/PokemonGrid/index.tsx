import { useCallback, useEffect, useMemo, useState } from "react";
import { PokemonCard } from "./PokemonCard";

import type { SearchPokemonProps, Union } from "../../App";

import "./styles.scss";

type PokemonGridProps = {
	results: Union;
	searchedPokemon: InfoPokemonProps | undefined;
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

export const PokemonGrid = ({ results, searchedPokemon }: PokemonGridProps) => {
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
		<div className={`grid-results ${searchedPokemon ? "unsetHeight" : ""}`}>
			{searchedPokemon ? (
				<PokemonCard poke={searchedPokemon} />
			) : (
				infoPokemon.map((pokemon) => {
					return <PokemonCard key={pokemon?.name} poke={pokemon} />;
				})
			)}
		</div>
	);
};
