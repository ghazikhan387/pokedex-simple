

function Pokemon({name,image}) {
    return (
        <div>
            <div>{name}</div>
            <div><img className="w-50 h-50" src={image} alt={name} /></div>
        </div>
    )
}

export default Pokemon