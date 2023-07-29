import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { selectTrips, loadData } from "./tripsSlice.js"


function Trips() {
    const dispatch = useDispatch()
    const onFirstRender = () => {
        dispatch(loadData())
      }
    useEffect(onFirstRender, [])
    const trips = useSelector(selectTrips)
    const tripList = trips.map(trip => {
        return (
            <ul key={trips.indexOf(trip)}>
                {trip.route}
            </ul>
        )
    })
    return (
        <div>
            This is a trips component
            {tripList}
        </div>
    )
}

export default Trips;