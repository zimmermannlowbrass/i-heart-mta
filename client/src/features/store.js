import { combineReducers, configureStore } from '@reduxjs/toolkit'

//  trips
const deleteTrip = (trip) => {
    return {
        type: 'trips/deleteTrip',
        payload: trip
    }
}

const filterRoute = (route) => {
    return {
        type: 'trips/filterRoute',
        payload: route
    }
}
const loadTrips = () => {
    return {
        type: 'trips/loadTrips',
        payload: 'upload trips here'
    }
}
const filterSubwayStops = (route) => {
    return {
        type: 'subwayStops/filterSubwayStops',
        payload: route
    }
}

const initalTrips = []
const tripReducer = (trips = initalTrips, action) => {
    switch(action.type) {
        case 'trips/deleteTrip':
            return trips.filter(trip => trip.id !== action.payload.id)
        default:
            return trips
    }
}

const initialSubwayStops = []
const subwayStopReducer = (subwayStops = initialSubwayStops, action) => {
    switch(action.type) {
        case 'subwayStops/filterSubwayStops':
            return subwayStops.filter(subwayStop => subwayStop.route !== route)
        default:
            return subwayStops
    }        
}


const reducers = {
    trips: tripReducer,
    subwayStops: subwayStopReducer
}

const rootReducer = combineReducers(reducers)
export const store = configureStore(rootReducer)