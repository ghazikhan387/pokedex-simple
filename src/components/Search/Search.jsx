import { useState } from "react";
import useDebounce from "../../hooks/useDebounce";

function Search({ updateSearchTerm }) {
    const [isSearching, setIsSearching] = useState(false);

    const debouncedCallback = useDebounce((value) => {
        updateSearchTerm(value);
        setIsSearching(false);
    }, 500);

    return (
        <div>
            <input
                className="text-sm text-slate-900 p-4 w-full border border-slate-200 rounded-lg"
                type="text"
                placeholder="Search Pokemon"
                onChange={(e) => {
                    setIsSearching(true);
                    debouncedCallback(e.target.value);
                }}
            />

            {isSearching && <div>Searching...</div>}
        </div>
    );
}

export default Search;