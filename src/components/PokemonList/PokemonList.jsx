import axios from "axios";
import { useEffect, useState } from "react";
import Pokemon from "../Pokemon/Pokemon";


function PokemonList() {
    const [pokemonList, setPokemonList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const POKEDEX_URL = "https://pokeapi.co/api/v2/pokemon"


    async function downloadPokemons(){
        const response = await axios.get(POKEDEX_URL);
        const pokemonResult = response.data.results;
        const pokemonResultPromise = pokemonResult.map((pokemon) => axios.get(pokemon.url));
        const pokemonData = await axios.all(pokemonResultPromise);
        const pokeListResult = pokemonData.map((pokeData) => {
            const pokemon = pokeData.data;
            return {
                id: pokemon.id,
                name: pokemon.name,
                image: pokemon.sprites.other ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny,
                types: pokemon.types
            }
        });
        console.log(pokeListResult);
        setPokemonList(pokeListResult);
        setIsLoading(false);
    }

    useEffect(() => {
        downloadPokemons();
    }, [POKEDEX_URL]);


    return (
        <div className="flex flex-col mt-8 border border-slate-800 px-4 py-2 h-min-[90vh] w-[90vw] text-center rounded-lg">
            <h1 className="text-2xl font-bold mt-4 mb-4">Pokemon List</h1>
             <div className="flex flex-wrap gap-4">
               {isLoading ? 'Loading...' : pokemonList.map((p) => <Pokemon key={p.name} name={p.name} image={p.image} />)}
             </div>
        </div>
    )
}

export default PokemonList;