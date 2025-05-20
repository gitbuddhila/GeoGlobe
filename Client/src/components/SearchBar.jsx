import React, { useEffect, useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import "../css/SearchBar.css";

const SearchBar = ({ data, onFilterChange }) => {
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(-1);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const suggestionsRef = useRef([]);

  const handleChange = (e) => {
    const val = e.target.value;
    setSearch(val);
    setSelectedItem(-1);
    setSelectedCountry(null);
  };

  const handleClose = () => {
    setSearch("");
    setSearchData([]);
    setSelectedItem(-1);
    setSelectedCountry(null);
    onFilterChange(data);
  };

  const handleKeyDown = (e) => {
    if (searchData.length === 0) return;
    if (e.key === "ArrowUp") {
      e.preventDefault(); // prevent cursor from moving to beginning
      setSelectedItem((prev) => (prev <= 0 ? searchData.length - 1 : prev - 1));
    } else if (e.key === "ArrowDown") {
      e.preventDefault(); // prevent scrolling the page
      setSelectedItem((prev) => (prev >= searchData.length - 1 ? 0 : prev + 1));
    } else if (e.key === "Enter" && selectedItem >= 0) {
      const selected = searchData[selectedItem];
      handleSelect(selected);
    }
  };

  const handleSelect = (country) => {
    // Save the selected country before clearing the search
    setSelectedCountry(country);
    // Clear the search text
    setSearch("");
    // Clear the dropdown
    setSearchData([]);
    setSelectedItem(-1);
    // Filter to show only the selected country
    onFilterChange([country]);
  };

  useEffect(() => {
    if (search !== "") {
      const newFiltered = data.filter((country) =>
        country.name.common.toLowerCase().includes(search.toLowerCase())
      );
      setSearchData(newFiltered);
      onFilterChange(newFiltered);
    } else if (selectedCountry) {
      // If no search text but we have a selected country, keep showing just that country
      setSearchData([]);
      onFilterChange([selectedCountry]);
    } else {
      // No search text and no selected country, show all countries
      setSearchData([]);
      onFilterChange(data);
    }
  }, [search, data, selectedCountry]);

  useEffect(() => {
    if (selectedItem >= 0 && suggestionsRef.current[selectedItem]) {
      suggestionsRef.current[selectedItem].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedItem]);

  return (
    <section className="search_section">
      <div className="search_input_div">
        <input
          type="text"
          className="search_input"
          placeholder={selectedCountry ? selectedCountry.name.common : "Search..."}
          autoComplete="off"
          onChange={handleChange}
          value={search}
          onKeyDown={handleKeyDown}
        />
        <div className="search_icon">
          {(search === "" && !selectedCountry) ? (
            <SearchIcon />
          ) : (
            <CloseIcon onClick={handleClose} />
          )}
        </div>
      </div>
      {searchData.length > 0 && (
        <div className="search_result">
          {searchData.slice(0, 11).map((country, index) => (
            <div
              key={country.name.common}
              ref={(el) => (suggestionsRef.current[index] = el)}
              onClick={() => handleSelect(country)}
              className={
                selectedItem === index
                  ? "search_suggestion_line active"
                  : "search_suggestion_line"
              }
            >
              {country.name.common}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default SearchBar;