

function Pokemon({name,image}) {
    return (
        <div className="border w- border-slate-800 px-2 py-1 text-center rounded-lg basis-[18%] hover:bg-slate-200 hover:scale-105 transition-all duration-300">
            <div className="font-bold capitalize py-1">{name}</div>
            <div className="flex justify-center"><img className="w-40 p-2 h-40 hover:scale-110 transition-all duration-300" src={image} alt={name} /></div>
        </div>
    )
}

export default Pokemon