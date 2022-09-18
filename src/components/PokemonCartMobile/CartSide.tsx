import { useContext, useEffect, useRef, useState } from "react";
import { Trash, X } from "phosphor-react";
import { MinicartContext } from "../../App";

type CartSideProps = {
	isOpen: boolean;
	setIsOpen: (item: boolean) => void;
};

export const CartSide = ({ isOpen, setIsOpen }: CartSideProps) => {
	const cart = useContext(MinicartContext);
	const [isFinalModalOpen, setIsFinalModalOpen] = useState(false);
	const finalizationModal = useRef<HTMLDivElement | null>(null);

	const handleCloseMinicart = () => {
		setIsOpen(false);
	};

	useEffect(() => {
		const modalListener = (event: MouseEvent) => {
			if (
				finalizationModal.current &&
				finalizationModal.current?.contains(event?.target as Node)
			) {
				setIsFinalModalOpen(false);
			}
		};

		if (typeof window !== "undefined") {
			window.addEventListener("click", modalListener);
			return () => window.removeEventListener("click", modalListener);
		}
	}, []);

	const handleOrderFinalization = () => {
		cart.minicartSetState([]);
		cart.setIsMinicartOpen(false);
		setIsFinalModalOpen(true);
	};

	const handleRemovePokemon = (pokeId: number) => {
		cart.minicartSetState(
			cart.minicartState.filter((poke) => poke.id !== pokeId)
		);
	};

	return (
		<>
			<div className={`pokemon-minicart__cart ${isOpen ? "active" : ""}`}>
				<div className="pokemon-minicart__cart__header">
					<button
						className="pokemon-minicart__cart__header--closeBtn"
						onClick={handleCloseMinicart}
					>
						<X size={20} weight="bold" />
					</button>
				</div>
				<div
					className={`pokemon-minicart__cart__content ${
						cart.minicartState.length === 0 ? "centering" : ""
					}`}
				>
					{cart.minicartState.length === 0 ? (
						<h3>Você não tem nenhum produto adicionado no seu carrinho.</h3>
					) : (
						<>
							<div className="pokemon-minicart__cart__content--items">
								{cart.minicartState.map((pokemon, idx) => (
									<div
										className="minicart-pokemon-cell"
										key={`pokemon${pokemon?.id}-key${idx}-${pokemon?.name}`}
									>
										<div className="minicart-pokemon-cell__header">
											<p className="minicart-pokemon-cell__header--name">
												#{`${pokemon?.id} ${pokemon?.name.split("-")[0]}`}
											</p>
											<div
												onClick={() => handleRemovePokemon(pokemon?.id)}
												className="minicart-pokemon-cell__header--removeBtn"
											>
												<Trash size={16} />
											</div>
										</div>
										<div className="minicart-pokemon-cell__body">
											<div>
												<div className="minicart-pokemon-cell__body--pokeInfo">
													Informações
												</div>
												<p className="minicart-pokemon-cell__body--price">
													<span>
														R${" "}
														{(pokemon?.price.toFixed(2) + "").replace(".", ",")}
													</span>
													<span>(unidade)</span>
												</p>
											</div>
											<div>
												<img
													src={pokemon?.sprite}
													alt={`Sprite do Pokemon ${pokemon?.name} no minicart`}
													className="minicart-pokemon-cell__body--image"
												/>
											</div>
										</div>
									</div>
								))}
							</div>
							<div className="pokemon-minicart__cart__content--summary">
								<div className="pokemon-order__totalPrice">
									<span>total</span>
									<span>
										R${" "}
										{cart.minicartState
											.reduce(
												(previous, current) => previous + current?.price,
												0
											)
											.toFixed(2)
											.replace(".", ",")}
									</span>
								</div>
								<button
									onClick={handleOrderFinalization}
									className="pokemon-order__buyingBtn"
								>
									finalizar
								</button>
							</div>
						</>
					)}
				</div>
			</div>
			<div
				className={`modal-finalization ${
					isFinalModalOpen ? "block" : "hidden"
				}`}
				ref={finalizationModal}
			>
				<div className="modal-finalization__content">
					<h2>Parabéns</h2>
					<p>compra realizada.</p>
				</div>
			</div>
		</>
	);
};
