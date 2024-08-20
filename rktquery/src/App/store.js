import { configureStore } from '@reduxjs/toolkit';
import { weatherApi } from '../services/weatherApi';
import RecentSearchesReducer from '../features/RecentSearchesSlice';


export const store = configureStore({
  reducer: {
    [weatherApi.reducerPath]: weatherApi.reducer,
    recentSearches: RecentSearchesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(weatherApi.middleware),
});
