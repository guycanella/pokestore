import {
	useState,
	useEffect,
	useMemo,
	createContext,
	useRef,
	memo,
} from "react";
import { PokemonCartMobile } from "./components/PokemonCartMobile";
import { PokemonGrid } from "./components/PokemonGrid";
import { SearchPokemon } from "./components/SearchPokemon";
import type { InfoPokemonProps } from "./components/PokemonGrid";
import Modal from "./components/Modal";

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
	minicartState: CartPokemonProps[];
	minicartSetState: (item: CartPokemonProps[]) => void;
	isMinicartOpen: boolean;
	setIsMinicartOpen: (item: boolean) => void;
	addSamePokemon: boolean | undefined;
	setAddSamePokemon: (item: boolean | undefined) => void;
};

export const MinicartContext = createContext<ContextProps>({
	minicartState: [{} as CartPokemonProps],
	minicartSetState() {},
	isMinicartOpen: false,
	setIsMinicartOpen() {},
	addSamePokemon: false,
	setAddSamePokemon() {},
});

function App() {
	const setpArr = useMemo(() => [1, 2, 3, 4], []);
	const [selectedPokemon, setSelectedPokemon] = useState<Union>([]);
	const [allPokemon, setAllPokemon] = useState<Union>([]);
	const [minicart, setMinicart] = useState<CartPokemonProps[]>([]);
	const [isMinicartOpen, setIsMinicartOpen] = useState(false);
	const [addSamePokemon, setAddSamePokemon] = useState<boolean | undefined>(
		undefined
	);
	const [failedSearching, setFailedSearching] = useState<boolean | undefined>(
		undefined
	);
	const [infoPokemon, setInfoPokemon] = useState<InfoPokemonProps | undefined>(
		undefined
	);

	const failedModalRef = useRef<HTMLDivElement | null>(null);
	const addModalRef = useRef<HTMLDivElement | null>(null);

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
				<SearchPokemon
					searchPokemon={setInfoPokemon}
					setFailedSearching={setFailedSearching}
				/>
			</div>
			<div className="main-container__content">
				<MinicartContext.Provider
					value={{
						minicartState: minicart,
						minicartSetState: setMinicart,
						isMinicartOpen,
						setIsMinicartOpen,
						addSamePokemon,
						setAddSamePokemon,
					}}
				>
					<PokemonCartMobile />
					<PokemonGrid
						results={selectedPokemon}
						searchedPokemon={infoPokemon}
					/>
				</MinicartContext.Provider>
			</div>
			<Modal
				mainClass="failedModal"
				isOpen={failedSearching}
				setIsOpen={setFailedSearching}
				reference={failedModalRef}
			>
				<h2>Pokemon não encontrado.</h2>
			</Modal>
			<Modal
				mainClass="failedModal"
				isOpen={addSamePokemon}
				setIsOpen={setAddSamePokemon}
				reference={addModalRef}
			>
				<h2>Você não pode adicionar o mesmo Pokemon novamente no carrinho!</h2>
			</Modal>
		</section>
	);
}

export default memo(App);
