import { MagnifyingGlass } from "phosphor-react";

import "./styles.scss";

export const SearchPokemon = () => {
	return (
		<header className="search-box">
			<form className="search-box__form">
				<input type="text" className="search-box__form--input" />
				<button className="search-box__form--button">
					<MagnifyingGlass size={16} weight="bold" />
				</button>
			</form>
		</header>
	);
};
