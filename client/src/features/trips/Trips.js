import React from "react";
import { useEffect, useContext } from "react";
import { UserContext } from "../../context/user.js";

import { useSelector, useDispatch } from 'react-redux';
import { selectTrips, loadTrips, deleteTrip } from "./tripsSlice.js"
import { addTrip } from "../favoriteTrips/favoriteTripsSlice.js";


function Trips() {
    const {user} = useContext(UserContext)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadTrips())
      }, [dispatch])

    const trips = useSelector(selectTrips)
    function onDeleteTrip(id) {
        dispatch(deleteTrip(id))
    }
    function onAddTripToFavorites(trip) {
        dispatch(addTrip(trip))
    }

    const userTrips = trips.filter(trip => trip.user_id === user.id)
    const tripList = userTrips.map(trip => {
        const distance = Math.abs(trip.start.position - trip.stop.position)
        return (
            <div className="pastTripContainer" key={userTrips.indexOf(trip)}>
                <h3>Start: {trip.start.stationname}</h3>
                <h3>End: {trip.stop.stationname}</h3>
                <h3>Total Stations Traveled: {distance}</h3>
                <button onClick={() => onAddTripToFavorites(trip)}>Add to Favorites</button>
                <button onClick={() => onDeleteTrip(trip.id)}>Delete Trip</button>
            </div>
        )
    })


    return (
        <div>
            <h1>Past trips</h1>
            {userTrips.length === 0 ? 'No trips' : tripList}
        </div>
    )
}

export default Trips;