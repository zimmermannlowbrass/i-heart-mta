import { trips } from "../exampleData.js"

// reducer and initial state
const initalTrips = []
export const tripReducer = (trips = initalTrips, action) => {
    switch(action.type) {
        case 'trips/loadTrips':
            return action.payload
        case 'trips/filterRoute':
            return trips.filter(trip => trip.route === action.payload)
        case 'trips/deleteTrip':
            return trips.filter(trip => trip.id !== action.payload.id)
        default:
            return trips
    }
}

// action types
export const deleteTrip = (trip) => {
    return {
        type: 'trips/deleteTrip',
        payload: trip
    }
}
export const filterRoute = (route) => {
    return {
        type: 'trips/filterRoute',
        payload: route
    }
}
export const loadData = () => {
    return {
        type: 'trips/loadTrips',
        payload: trips
    }
}

// selectors
export const selectTrips = state => state.trips 
