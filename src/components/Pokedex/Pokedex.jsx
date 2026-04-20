import Search from "../Search/Search"
import PokemonList from "../PokemonList/PokemonList"

function Pokedex() {
    return (
        <div className="flex flex-col items-center">
            <Search />
            <PokemonList />
        </div>
    )
}

export default Pokedex