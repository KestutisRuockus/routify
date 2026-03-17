import { useState } from "react";
import "./searchInput.css";

const SearchInput = () => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = () => {
    console.log(inputValue);
    setInputValue("");
  };

  return (
    <section aria-label="Destination search" className="search-section">
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
    </section>
  );
};

export default SearchInput;
