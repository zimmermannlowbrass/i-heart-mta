import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { selectTrips, loadTrips, deleteTrip } from "./tripsSlice.js"


function Trips() {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadTrips())
      }, [dispatch])

    const trips = useSelector(selectTrips)
    function onDeleteTrip(id) {
        dispatch(deleteTrip(id))
    }
    console.log(trips)
    
    const tripList = trips.map(trip => {
        const distance = Math.abs(trip.start.position - trip.stop.position)
        return (
            <div className="pastTripContainer" key={trips.indexOf(trip)}>
                <h5>Start: {trip.start.stationname}</h5>
                <h5>Stations traveled: {distance}</h5>
                <h5>End: {trip.stop.stationname}</h5>
                <button onClick={() => onDeleteTrip(trip.id)}>Delete Trip</button>
            </div>
        )
    })


    return (
        <div>
            <h1>Past trips</h1>
            {!trips ? 'No trips' : tripList}
        </div>
    )
}

export default Trips;