import { useState, type Dispatch, type SetStateAction } from "react";
import "./searchInput.css";
import useNominatim, { type NominatimResult } from "../hooks/useNominatim";
import type { SelectedLocation } from "../pages/home/Home";

type Props = {
  setSelectedLocation: Dispatch<SetStateAction<SelectedLocation>>;
};

const SearchInput = ({ setSelectedLocation }: Props) => {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const { result } = useNominatim(inputValue);

  const handleClick = (location: NominatimResult) => {
    setSelectedLocation({
      coordinates: [parseFloat(location.lat), parseFloat(location.lon)],
      name: location.display_name,
    });
    setInputValue(location.display_name);
    setIsFocused(false);
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
      <div className="search-input-wrapper">
        <label htmlFor="search-input" className="search-input-label">
          Search location
        </label>
        <input
          id="search-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          type="text"
          placeholder="City, address or coordinates"
          autoComplete="off"
          className="search-input-field"
        />
      </div>
      {isFocused && result.length > 0 && (
        <ul className="search-dropdown">
          {result.map((item) => (
            <li
              key={item.place_id}
              className="search-dropdown-item"
              tabIndex={0}
              onClick={() => handleClick(item)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleClick(item);
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
