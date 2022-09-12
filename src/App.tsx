import { useState, useEffect, useMemo } from "react";
import { PokemonCartMobile } from "./components/PokemonCartMobile";
import { PokemonGrid } from "./components/PokemonGrid";
import { SearchPokemon } from "./components/SearchPokemon";

export type SearchPokemonProps = {
	name: string;
	url: string;
};

export type Union = SearchPokemonProps[] | [];

function App() {
	const setpArr = useMemo(() => [1, 2, 3, 4], []);
	const [selectedPokemon, setSelectedPokemon] = useState<Union>([]);
	const [allPokemon, setAllPokemon] = useState<Union>([]);

	useEffect(() => {
		const fetchAllPokemonData = async () => {
			await fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
				.then((res) => {
					if (res.ok) {
						return res.json();
					}
				})
				.then((data) => {
					setAllPokemon(data.results);
				});
		};

		fetchAllPokemonData();
	}, []);

	useEffect(() => {
		setpArr.forEach(() => {
			setSelectedPokemon((prevState) => [
				...prevState,
				allPokemon?.splice(Math.floor(Math.random() * allPokemon.length), 1)[0],
			]);
		});
	}, [allPokemon, setpArr]);

	console.log(selectedPokemon);
	// const handleSelectPokemon = () => {};

	return (
		<section className="main-container">
			<div className="main-container__header">
				<SearchPokemon />
			</div>
			<div className="main-container__content">
				<PokemonCartMobile />
				<PokemonGrid results={selectedPokemon} />
			</div>
		</section>
	);
}

export default App;
