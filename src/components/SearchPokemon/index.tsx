import { MagnifyingGlass } from "phosphor-react";
import { useState } from "react";
import type { InfoPokemonProps } from "../PokemonGrid";

import "./styles.scss";

type EventInputProps = {
	target: HTMLInputElement;
};

type SearchProps = {
	setFailedSearching: (item: boolean | undefined) => void;
	searchPokemon: (item: InfoPokemonProps | undefined) => void;
};

export const SearchPokemon = ({
	setFailedSearching,
	searchPokemon,
}: SearchProps) => {
	const [searchValue, setSearchValue] = useState("");

	const fetchOnePokemon = async (nameOrId: string): Promise<void> => {
		const value = nameOrId.trim();

		if (value === "") {
			searchPokemon(undefined);
			return;
		}

		await fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrId}`)
			.then((res) => {
				if (res.ok) {
					return res.json();
				}

				searchPokemon(undefined);
				setFailedSearching(true);
			})
			.then((data) => {
				searchPokemon(data);
			});
	};

	const handleSearchPokemon = (event: EventInputProps) => {
		setSearchValue(event.target.value);
	};

	const handleSearch = (event: React.MouseEvent<HTMLElement>) => {
		event.preventDefault();
		fetchOnePokemon(searchValue);
	};

	return (
		<header className="search-box">
			<form className="search-box__form">
				<input
					type="text"
					name="searchbox"
					className="search-box__form--input"
					onChange={handleSearchPokemon}
				/>
				<button onClick={handleSearch} className="search-box__form--button">
					<MagnifyingGlass size={16} weight="bold" />
				</button>
			</form>
		</header>
	);
};
