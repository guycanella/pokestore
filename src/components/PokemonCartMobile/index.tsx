import { useContext } from "react";
import { List } from "phosphor-react";
import { MinicartContext } from "../../App";
import { CartSide } from "./CartSide";

import "./styles.scss";

export const PokemonCartMobile = () => {
	const cart = useContext(MinicartContext);

	const handleOpenMinicart = () => {
		cart.setIsMinicartOpen(true);
	};

	return (
		<nav className="pokemon-minicart">
			<button className="pokemon-minicart__button" onClick={handleOpenMinicart}>
				<List size={20} weight="bold" />
			</button>
			<CartSide
				isOpen={cart.isMinicartOpen}
				setIsOpen={cart.setIsMinicartOpen}
			/>
		</nav>
	);
};
