import { combineReducers, configureStore } from '@reduxjs/toolkit'
import tripsSliceReducer from '../features/trips/tripsSlice'
import { searchRouteReducer } from '../features/searchRoute/searchRouteSlice'
import subwayStopSliceReducer from '../features/subwayStops/subwayStopsSlice'
import favoriteRoutesSliceReducer from '../features/favoriteRoutes/favoriteRoutesSlice'

const reducers = {
    trips: tripsSliceReducer,
    searchRoute: searchRouteReducer,
    subwayStops: subwayStopSliceReducer ,
    favoriteRoutes: favoriteRoutesSliceReducer
}
console.log(reducers)

const rootReducer = combineReducers(reducers)
export const store = configureStore({ reducer: rootReducer})