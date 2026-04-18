import axios from "axios";
import { useEffect, useState } from "react";
import Pokemon from "../Pokemon/Pokemon";


function PokemonList() {
    const [pokemonList, setPokemonList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [POKEDEX_URL, setPOKEDEX_URL] = useState("https://pokeapi.co/api/v2/pokemon");
    const [nextUrl, setNextUrl] = useState("");
    const [prevUrl, setPrevUrl] = useState("");


    async function downloadPokemons(){
        setIsLoading(true);
        const response = await axios.get(POKEDEX_URL);
        const pokemonResult = response.data.results;
        setNextUrl(response.data.next);
        setPrevUrl(response.data.previous);
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
        <div className="flex flex-col mt-8 mb-4 border border-slate-800 px-2 py-1 h-min-[90vh] w-[95vw] text-center rounded-lg">
            <h1 className="text-2xl font-bold mt-4 mb-4">Pokemon List</h1>
             <div className="flex flex-wrap gap-4 justify-between p-2">
               {isLoading ? 'Loading...' : pokemonList.map((p) => <Pokemon key={p.name} name={p.name} image={p.image} />)}
             </div>
             <div className="flex justify-center gap-4 m-4">
                <button className="bg-slate-700 w-[80px] text-slate-50 px-2 py-1 rounded-lg cursor-pointer hover:bg-slate-600 transition-all duration-300 hover:scale-105" disabled={prevUrl == null} onClick={() => setPOKEDEX_URL(prevUrl)}>Prev</button>
                <button className="bg-slate-700 w-[80px] text-slate-50 px-2 py-1 rounded-lg cursor-pointer hover:bg-slate-600 transition-all duration-300 hover:scale-105" disabled={nextUrl == null} onClick={() => setPOKEDEX_URL(nextUrl)}>Next</button>
             </div>
        </div>
    )
}

export default PokemonList;