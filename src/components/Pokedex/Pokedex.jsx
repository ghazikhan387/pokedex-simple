import Search from "../Search/Search"
import PokemonList from "../PokemonList/PokemonList"
import PokemonDetails from "../PokemonDetails/PokemonDetails"
import { useState } from "react";

function Pokedex() {

    const [searchTerm, setSearchTerm] = useState("");


    return (
        <div className="flex flex-col items-center">
            <Search updateSearchTerm={setSearchTerm}/>
            { (searchTerm.length ==0 ) ? <PokemonList /> : <PokemonDetails pokemonName={searchTerm}/>}
        </div>
    )
}

export default Pokedex