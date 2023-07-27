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
export const loadTrips = () => {
    return {
        type: 'trips/loadTrips',
        payload: 'upload trips here'
    }
}

const initalTrips = []
export const tripReducer = (trips = initalTrips, action) => {
    switch(action.type) {
        case 'trips/deleteTrip':
            return trips.filter(trip => trip.id !== action.payload.id)
        default:
            return trips
    }
}