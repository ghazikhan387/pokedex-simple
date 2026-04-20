import { Routes, Route } from "react-router-dom";
import Pokedex from "../components/Pokedex/Pokedex";
import PokemonDetail from "../components/PokemonDetails/PokemonDetails";


function CustomRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Pokedex />} />
            <Route path="/pokemon/:id" element={<PokemonDetail />} />
        </Routes>
    )
}

export default CustomRoutes;