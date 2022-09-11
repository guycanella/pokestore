import { useEffect, useState } from "react";
import { Union } from "../../App";

type PokemonGridProps = {
	results: Union;
};

type InfoPokemonProps = {
	url: string;
	// setData: (item: object[]) => void
};

const fetchInfoPokemon = async ({ url }: InfoPokemonProps) => {
	await fetch(url)
		.then((res) => {
			if (res.ok) {
				return res.json();
			}
		})
		.then((data) => {
			console.log(data);
		});
};

export const PokemonGrid = ({ results }: PokemonGridProps) => {
	const [infoPokemon, setInfoPokemon] = useState<object[]>([]);

	useEffect(() => {
		results.map((pokemon) => fetchInfoPokemon({ url: pokemon?.url }));
	}, [results]);

	return (
		<div className="grid-results outline">
			{results.map((pokemon) => {
				return (
					<div key={pokemon?.name} className="grid-results__infoPokemon">
						{pokemon?.name}
					</div>
				);
			})}
		</div>
	);
};
