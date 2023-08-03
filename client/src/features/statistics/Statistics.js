import React from "react";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/user.js";

import SearchRoute from "../searchRoute/SearchRoute.js";

import { useSelector, useDispatch } from 'react-redux';
import { selectTrips, loadTrips } from "../trips/tripsSlice.js"
import { selectAllSubwayStops, loadSubwayStops } from "../subwayStops/subwayStopsSlice.js";
import { selectFilteredSubwayStops } from "../subwayStops/subwayStopsSlice.js";

function Statistics() {
    const {user} = useContext(UserContext)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadTrips())
        dispatch(loadSubwayStops())
      }, [dispatch])

    const trips = useSelector(selectTrips)
    const subwayStops = useSelector(selectAllSubwayStops)
    const filteredStops = useSelector(selectFilteredSubwayStops)

    const userTrips = trips.filter(trip => trip.user_id === user.id)
    const routes = [...new Set(subwayStops.map(subwayStops => subwayStops.route))]
    const userRoutes = [...new Set(userTrips.map(trip => trip.start.route))]

    const allStopsVisited = userTrips.map(trip => {
        const arr =[trip.start.id, trip.stop.id]
        arr.sort()
        let x = arr[0]
        const stations = []
        while (x <= arr[1]) {
            stations.push(x)
            x ++
        }
        return stations
    })
    const flattenedStopsVisited = [...new Set (allStopsVisited.flat(1))].sort()

    console.log(flattenedStopsVisited)
    
    const subwayStopList = filteredStops.map(subwaystop => {
        const color = flattenedStopsVisited.includes(subwaystop.id) ? 'green' : 'tomato'
        return (
            <li style={{color:color}} key={subwayStops.indexOf(subwaystop)}>
                {subwaystop.stationname}
            </li>
        )
    })

    const percentageSubwayStops = ((flattenedStopsVisited.length)/(subwayStops.length)).toFixed(3) * 100

    return (
        <div>
            <h1>Statistics</h1>
            <div style={{backgroundColor: 'black', width: 'fit-content', display: 'inline-block'}}>
                <h3>{percentageSubwayStops}% of all subwaystops visited</h3>
                <h3 style={{color:'tomato'}}>Orange means you have not traveled through this stop</h3>
                <h3 style={{color:'green'}}>Green means you have traveled through this stop</h3>
                <h3><u>{userRoutes.length} of {routes.length}</u> trains taken</h3>
            </div>
            <SearchRoute subwayRoutes={userRoutes}/>
            <ol>
                {subwayStopList}
            </ol>
        </div>
    )
}

export default Statistics;