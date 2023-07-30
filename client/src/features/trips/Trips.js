import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { selectTrips, loadTrips } from "./tripsSlice.js"


function Trips() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadTrips())
      }, [dispatch])
    const trips = useSelector(selectTrips)
    console.log(trips)
    // const tripList = trips.map(trip => {
    //     return (
    //         <ul key={trips.indexOf(trip)}>
    //             {trip.route}
    //         </ul>
    //     )
    // })
    return (
        <div>
            This is a trips component
            {/* {tripList} */}
        </div>
    )
}

export default Trips;