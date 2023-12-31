import { combineReducers, configureStore } from '@reduxjs/toolkit'
import tripsSliceReducer from '../features/trips/tripsSlice'
import searchRouteReducer from '../features/searchRoute/searchRouteSlice'
import subwayStopSliceReducer from '../features/subwayStops/subwayStopsSlice'
import favoriteTripsSliceReducer from '../features/favoriteTrips/favoriteTripsSlice'

const reducers = {
    trips: tripsSliceReducer,
    searchRoute: searchRouteReducer,
    subwayStops: subwayStopSliceReducer ,
    favoriteTrips: favoriteTripsSliceReducer
}

const rootReducer = combineReducers(reducers)
export const store = configureStore({ reducer: rootReducer})