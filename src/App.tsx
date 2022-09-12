import { useState, useEffect, useMemo, createContext } from "react";
import { PokemonCartMobile } from "./components/PokemonCartMobile";
import { PokemonGrid } from "./components/PokemonGrid";
import { SearchPokemon } from "./components/SearchPokemon";

export type SearchPokemonProps = {
	name: string;
	url: string;
};

export type CartPokemonProps = {
	name: string;
	id: number;
	sprite: string | undefined;
	price: number;
};

export type Union = SearchPokemonProps[] | [];

type ContextProps = {
	state: CartPokemonProps[];
	setState: (item: CartPokemonProps[]) => void;
};

export const MinicartContext = createContext<ContextProps>({
	state: [{} as CartPokemonProps],
	setState() {},
});

function App() {
	const setpArr = useMemo(() => [1, 2, 3, 4], []);
	const [selectedPokemon, setSelectedPokemon] = useState<Union>([]);
	const [allPokemon, setAllPokemon] = useState<Union>([]);
	const [minicart, setMinicart] = useState<CartPokemonProps[]>([]);

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

	return (
		<section className="main-container">
			<div className="main-container__header">
				<SearchPokemon />
			</div>
			<div className="main-container__content">
				<MinicartContext.Provider
					value={{ state: minicart, setState: setMinicart }}
				>
					<PokemonCartMobile />
					<PokemonGrid results={selectedPokemon} />
				</MinicartContext.Provider>
			</div>
		</section>
	);
}

export default App;
