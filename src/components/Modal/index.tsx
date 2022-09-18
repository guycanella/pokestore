import { useEffect, memo } from "react";
import type { ReactNode } from "react";

type ModalProps = {
	mainClass: string;
	isOpen: boolean | undefined;
	setIsOpen: (item: boolean | undefined) => void;
	reference: React.MutableRefObject<HTMLDivElement | null>;
	children: ReactNode;
};

const Modal = ({
	mainClass,
	isOpen,
	setIsOpen,
	reference,
	children,
}: ModalProps) => {
	useEffect(() => {
		const handleCloseModal = (event: MouseEvent) => {
			if (
				reference.current &&
				!reference.current?.contains(event?.target as Node)
			) {
				setIsOpen(false);
			}
		};

		if (typeof window !== "undefined") {
			window.addEventListener("click", handleCloseModal);
			return () => window.removeEventListener("click", handleCloseModal);
		}
	}, [reference, setIsOpen]);

	return (
		<div className={`${mainClass} ${isOpen ? "block" : "hidden"}`}>
			<div className={`${mainClass}__content`} ref={reference}>
				{children}
			</div>
		</div>
	);
};

export default memo(Modal);
