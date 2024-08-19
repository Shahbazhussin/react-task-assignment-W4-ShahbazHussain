import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import CurrentWeather from "./CurrentWeather";

const RecentSearches = () => {
  const [coordinates, setCoordinates] = useState(null);
  const [unit, setUnit] = useState("metric");
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    const storedSearches =
      JSON.parse(localStorage.getItem("recentSearches")) || [];
    setRecentSearches(storedSearches);
  }, []);

  useEffect(() => {
    if (coordinates) {
      addRecentSearch(coordinates.name);
    }
  }, [coordinates]);

  const handleCitySelected = (coords) => {
    setCoordinates(coords);
  };

  const handleRecentSearchClick = (cityName) => {
    const city = recentSearches.find((search) => search === cityName);
    if (city) {
      const coords = { name: city };
      handleCitySelected(coords);
    }
  };

  const addRecentSearch = (cityName) => {
    setRecentSearches((prevSearches) => {
      const updatedSearches = [
        cityName,
        ...prevSearches.filter((search) => search !== cityName),
      ];
      const newSearches = updatedSearches.slice(0, 5);

      localStorage.setItem("recentSearches", JSON.stringify(newSearches));
      return newSearches;
    });
  };

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === "metric" ? "imperial" : "metric"));
  };

  return (
    <div className="bg-white p-6 mt-5 rounded-lg shadow-lg max-w-md mx-auto flex flex-col">
      <SearchBar
        onCitySelected={handleCitySelected}
        recentSearches={recentSearches}
        onRecentSearchClick={handleRecentSearchClick}
      />
      {coordinates && (
        <div className="text-center mt-4">
          <CurrentWeather
            coordinates={coordinates}
            unit={unit}
            name={coordinates.name}
          />
          <button
            onClick={toggleUnit}
            className="mt-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Switch to {unit === "metric" ? "Fahrenheit" : "Celsius"}
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentSearches;
