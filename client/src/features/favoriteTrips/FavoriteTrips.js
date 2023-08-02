import React from "react";
import { useEffect, useContext } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { selectFavoriteTrips, loadFavorites, removeTrip } from "./favoriteTripsSlice";
import { UserContext } from "../../context/user.js";


function FavoriteTrips() {
    const {user} = useContext(UserContext)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadFavorites())
    },[dispatch])


    function onUnfavorite(trip) {
        dispatch(removeTrip(trip))
    }
    
    const favTrips = useSelector(selectFavoriteTrips)
    const userFavTrips = favTrips.filter(trip => trip.user_id === user.id)
    const tripList = userFavTrips.map(trip => {
        const distance = Math.abs(trip.start.position - trip.stop.position)
        return (
            <div className="pastTripContainer" key={userFavTrips.indexOf(trip)}>
                <h5>Start: {trip.start.stationname}</h5>
                <h5>Stations traveled: {distance}</h5>
                <h5>End: {trip.stop.stationname}</h5>
                <button onClick={() => onUnfavorite(trip)}>Remove</button>
            </div>
        )
    })

    return (
        <div>
            <h1>Favorite Trips</h1>
            {tripList}
        </div>
    )
}

export default FavoriteTrips;