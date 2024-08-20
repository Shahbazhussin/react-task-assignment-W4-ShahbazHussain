import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SearchBar from "./SearchBar";
import CurrentWeather from "./CurrentWeather";
import { addSearch, setSearches } from "../features/RecentSearchesSlice";

const RecentSearches = () => {
  const [coordinates, setCoordinates] = useState(null);
  const [unit, setUnit] = useState("metric");
  const recentSearches = useSelector((state) => state.recentSearches.searches);
  const dispatch = useDispatch();

  // Load recent searches from localStorage on component mount
  useEffect(() => {
    const storedSearches = localStorage.getItem("recentSearches");
    if (storedSearches) {
      dispatch(setSearches(JSON.parse(storedSearches)));
    }
  }, [dispatch]);

  // Update localStorage whenever recentSearches changes
  useEffect(() => {
    localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
  }, [recentSearches]);

  useEffect(() => {
    if (coordinates) {
      dispatch(addSearch(coordinates)); // Save the full city data
    }
  }, [coordinates, dispatch]);

  const handleCitySelected = (cityData) => {
    setCoordinates({ lat: cityData.lat, lon: cityData.lon, name: cityData.name });
  };

  const handleRecentSearchClick = (cityData) => {
    handleCitySelected(cityData);
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
