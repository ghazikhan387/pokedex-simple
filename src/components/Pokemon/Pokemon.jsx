import { Link } from "react-router-dom";


function Pokemon({name,image,id}) {
    return (
        <Link to={`/pokemon/${id}`}>
        <div className="border w- border-slate-800 px-2 py-1 text-center rounded-lg hover:bg-slate-200 hover:scale-105 transition-all duration-300">
            <div className="font-bold capitalize py-1">{name}</div>
            <div className="flex justify-center"><img className="w-40 p-2 h-40 hover:scale-110 transition-all duration-300" src={image} alt={name} /></div>
        </div>
        </Link>
    )
}

export default Pokemon