import { useGetWeatherByCoordinatesQuery } from '../services/weatherApi';

const CurrentWeather = ({ coordinates, unit, name }) => {
  console.log(coordinates);
  const { data: weatherData, isLoading, isError, error } = useGetWeatherByCoordinatesQuery(
    coordinates ? { ...coordinates, unit } : null,
    { skip: !coordinates }
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <h1>Error: {error.message}</h1>;

  const { current } = weatherData;
  return (
    <div className="p-4 border rounded-md shadow-lg">
      <h1 className="text-xl font-semibold mb-2">Current Weather</h1>
      <p className="text-lg">Temperature: {unit === 'metric' ? `${current.temp}°C` : `${((((current.temp * 9 / 5) + 32)).toFixed(0) - 100)}°F`}</p>
      <p className="text-lg">Weather: {current.weather[0].description}</p>
      <p className="text-lg">Wind Speed: {current.wind_speed} m/s</p>
    </div>
  )
};

export default CurrentWeather;

