import { List } from "phosphor-react";
import { useState } from "react";
import { CartSide } from "./CartSide";

import "./styles.scss";

export const PokemonCartMobile = () => {
	const [isMinicartOpen, setIsMinicartOpen] = useState(false);

	const handleOpenMinicart = () => {
		setIsMinicartOpen(true);
	};

	return (
		<nav className="pokemon-minicart">
			<button className="pokemon-minicart__button" onClick={handleOpenMinicart}>
				<List size={20} weight="bold" />
			</button>
			<CartSide isOpen={isMinicartOpen} setIsOpen={setIsMinicartOpen} />
		</nav>
	);
};
