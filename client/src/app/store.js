import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { tripReducer } from '../features/trips/tripsSlice'
import { subwayStopReducer } from '../features/subwayStops/subwayStopsslice'
//  trips


const reducers = {
    trips: tripReducer,
    subwayStops: subwayStopReducer
}

const rootReducer = combineReducers(reducers)
const store = configureStore(rootReducer)
// export default store