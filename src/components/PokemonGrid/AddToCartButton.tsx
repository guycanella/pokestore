import { useContext, useMemo } from "react";
import { MinicartContext } from "../../App";
import type { InfoPokemonProps } from ".";
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
		const isFound = cart.minicartState.some((pokemon) => {
			if (pokemon?.id === poke.id) {
				return true;
			}

			return false;
		});

		if (!isFound) {
			const auxArray = cart.minicartState;
			auxArray.push(poke);
			cart.minicartSetState(auxArray);
			cart.setIsMinicartOpen(true);

			return;
		}

		cart.setAddSamePokemon(true);
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
