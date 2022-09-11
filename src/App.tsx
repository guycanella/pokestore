import { PokemonGrid } from "./components/PokemonGrid";
import { SearchPokemon } from "./components/SearchPokemon";

function App() {
	return (
		<section className="main-container outline">
			<SearchPokemon />
			<PokemonGrid />
		</section>
	);
}

export default App;
