import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.openweathermap.org/" }),
  endpoints: (builder) => ({
    getCityCoordinates: builder.query({
      query: (cityName) =>
        `geo/1.0/direct?q=${cityName}&limit=5&appid=${
          import.meta.env.VITE_WEATHER_API_KEY_1
        }`,
    }),
    getWeatherByCoordinates: builder.query({
      query: ({ lat, lon, unit }) =>
        `data/3.0/onecall?lat=${lat}&lon=${lon}&units=${unit}&appid=${
          import.meta.env.VITE_WEATHER_API_KEY_2
        }`,
    }),
  }),
});

export const { useGetCityCoordinatesQuery, useGetWeatherByCoordinatesQuery } =
  weatherApi;
