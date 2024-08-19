import { useState, useEffect } from "react";
import { useGetCityCoordinatesQuery } from "../services/weatherApi";
import "tailwindcss/tailwind.css";

function SearchBar({ onCitySelected, recentSearches, onRecentSearchClick }) {
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const { data: cityData, error: cityError } = useGetCityCoordinatesQuery(
    query,
    {
      skip: !query,
      refetchOnReconnect: true,
    }
  );

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
    console.log(query);
    if (!query) {
      setError("Please enter a city name.");
      return;
    }

    if (!cityData || cityData.length === 0) {
      setError("No results found for this city.");
      return;
    }

    const selectedCity = cityData[0];

    if (selectedCity) {
      onCitySelected(selectedCity);
      setQuery(""); // Clear the input field
      setShowDropdown(false); // Hide dropdown
    } else {
      setError("No results found for this city.");
    }
  };

  const handleKeyDown = (event) => {
    console.log(event.key);

    if (event === "Enter") {
      console.log("event");
      handleSearch();
    }
  };

  const handleDropdownItemClick = (cityName) => {
    setQuery(cityName);
    setShowDropdown(false);
    handleKeyDown("Enter");
  };

  return (
    <div className="bg-white p-3 rounded-lg shadow-lg max-w-md mx-auto flex flex-col relative">
      <input
        type="text"
        placeholder="Search for a city..."
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setShowDropdown(true)}
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
              onClick={() => handleDropdownItemClick(search)}
              className="p-2 cursor-pointer hover:bg-gray-100"
            >
              {search}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
