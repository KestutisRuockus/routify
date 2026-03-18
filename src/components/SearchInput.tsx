import { useState } from "react";
import "./searchInput.css";
import useNominatim from "../hooks/useNominatim";

const SearchInput = () => {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const { result, loading } = useNominatim(inputValue);

  const handleSubmit = () => {
    console.log(inputValue);
    setInputValue("");
  };

  return (
    <section
      aria-label="Destination search"
      className="search-section"
      onFocus={() => setIsFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsFocused(false);
        }
      }}
    >
      <label htmlFor="search-input" className="search-input-label">
        Search location
      </label>
      <div className="search-input-wrapper">
        <input
          id="search-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
          type="text"
          placeholder="City, address or coordinates"
          autoComplete="off"
          className="search-input-field"
        />
        <button
          type="button"
          className="search-input-button"
          onClick={handleSubmit}
        >
          Search
        </button>
      </div>
      {isFocused && result.length > 0 && (
        <ul className="search-dropdown">
          {result.map((item) => (
            <li
              key={item.place_id}
              className="search-dropdown-item"
              tabIndex={0}
              onClick={() => console.log(item.display_name)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  console.log(item.display_name);
                }
              }}
            >
              {item.display_name}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default SearchInput;
