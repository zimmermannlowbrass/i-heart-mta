import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { tripReducer } from '../features/trips/tripsSlice'
import { searchRouteReducer } from '../features/searchRoute/searchRouteSlice'
import { subwayStopReducer } from '../features/subwayStops/subwayStopsSlice'

const reducers = {
    trips: tripReducer,
    searchRoute: searchRouteReducer,
    subwayStops: subwayStopReducer
}
console.log(reducers)

const rootReducer = combineReducers(reducers)
export const store = configureStore({ reducer: rootReducer})