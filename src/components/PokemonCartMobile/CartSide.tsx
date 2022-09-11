import { X } from "phosphor-react";

type CartSideProps = {
	isOpen: boolean;
	setIsOpen: (item: boolean) => void;
};

export const CartSide = ({ isOpen, setIsOpen }: CartSideProps) => {
	const handleCloseMinicart = () => {
		setIsOpen(false);
	};
	return (
		<div className={`pokemon-minicart__cart ${isOpen ? "active" : ""}`}>
			<div className="pokemon-minicart__cart__header">
				<button
					className="pokemon-minicart__cart__header--closeBtn"
					onClick={handleCloseMinicart}
				>
					<X size={20} weight="bold" />
				</button>
			</div>
			<div className="pokemon-minicart__cart__content">
				<h3>Você não tem nenhum produto adicionado no seu carrinho.</h3>
			</div>
		</div>
	);
};
