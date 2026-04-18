import Search from "../Search/Search"
import PokemonList from "../PokemonList/PokemonList"

function Pokedex() {
    return (
        <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold mt-4 mb-4">Pokedex</h1>
            <Search />
            <PokemonList />
        </div>
    )
}

export default Pokedex