import { useContext, useMemo } from "react";
import type { InfoPokemonProps } from ".";
import { MinicartContext } from "../../App";
import type { CartPokemonProps } from "../../App";

export const AddToCartButton = ({ pokemon }: { pokemon: InfoPokemonProps }) => {
	const cart = useContext(MinicartContext);

	const pokemonCart: CartPokemonProps = useMemo(() => {
		return {
			id: pokemon?.id,
			name: pokemon?.name,
			sprite: pokemon?.sprites?.front_default,
			price: 23.5,
		};
	}, [pokemon?.id, pokemon?.name, pokemon?.sprites?.front_default]);

	const handleAddToCart = (poke: CartPokemonProps): void => {
		cart.setState((prevState: CartPokemonProps[]) => [...prevState, poke]);
	};

	return (
		<button
			className="grid-results__pokemonCard--addToCart"
			onClick={() => handleAddToCart(pokemonCart)}
		>
			adicionar ao carrinho
		</button>
	);
};
