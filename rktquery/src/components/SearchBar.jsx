import { useState, useEffect } from "react";
import { useGetCityCoordinatesQuery } from "../services/weatherApi";
import "tailwindcss/tailwind.css";

function SearchBar({ onCitySelected, recentSearches, onRecentSearchClick }) {
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const { data: cityData, error: cityError } = useGetCityCoordinatesQuery(query, {
    skip: !query,
    refetchOnReconnect: true,
  });

  useEffect(() => {
    if (cityError) {
      setError("Error fetching city coordinates");
    } else if (cityData && cityData.length === 0) {
      setError("No results found for this city.");
    } else {
      setError(null);
    }
  }, [cityData, cityError]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    setShowDropdown(true);
  };

  const handleSearch = () => {
    if (!query) {
      setError("Please enter a city name.");
      return;
    }

    if (!cityData || cityData.length === 0) {
      setError("No results found for this city.");
      return;
    }

    const selectedCity = cityData[0]; // Assuming the first result is the desired one

    if (selectedCity) {
      onCitySelected(selectedCity); // Pass the full city data
      setQuery(""); // Clear the input field
      setShowDropdown(false); // Hide dropdown
    } else {
      setError("No results found for this city.");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleDropdownItemClick = (city, event) => {
    event.stopPropagation();
    event.preventDefault();

    setQuery(city.name);
    setShowDropdown(false);
    onRecentSearchClick(city);
  };

  return (
    <div className="bg-white p-3 rounded-lg shadow-lg max-w-md mx-auto flex flex-col relative">
      <input
        type="text"
        placeholder="Search for a city..."
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setShowDropdown(recentSearches.length > 0)}
        onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
        className="p-2 border border-gray-300 rounded-md w-full"
      />
      <button
        onClick={handleSearch}
        className="mt-2 p-2 w-20 m-auto bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Search
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {showDropdown && recentSearches.length > 0 && (
        <ul className="absolute bg-white border border-gray-300 rounded-md w-full mt-28 max-h-48 overflow-y-auto z-10">
          {recentSearches.map((search, index) => (
            <li
              key={index}
              onClick={(event) => handleDropdownItemClick(search, event)}
              className="p-2 cursor-pointer hover:bg-gray-100"
            >
              {search.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
