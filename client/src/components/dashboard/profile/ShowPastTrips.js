import React from "react";
import { useEffect, useState } from "react";

import {
    Polyline
} from "@react-google-maps/api"

function ShowPastTrips() {

    const [trips, setTrips] = useState([])
    const [polylineDicts, setPolylineDicts] = useState([])

    useEffect(() => {
        fetch("/trips")
        .then(r => r.json())
        .then(setTrips)
    }, [])

    for (let i = 0; trips.length > i; i ++) {
        const service = new window.google.maps.DirectionsService()
        const dict = {}
        service.route({
            origin: {lat: trips[i].start_lat, lng: trips[i].start_lng},
            destination: {lat: trips[i].end_lat, lng: trips[i].end_lng},
            waypoints: [],
            travelMode:  window.google.maps.TravelMode.TRANSIT,
            transitOptions: {
                routingPreference: "FEWER_TRANSFERS",
                modes: ['SUBWAY'],
            }, 
        }, 
        (result, status) => {
            if (status === 'OK' && result) {
                const overview_path=result.routes[0].overview_path
                const path = []
                for (let i=0 ; i<overview_path.length ; i++) {
                    path.push({lat: overview_path[i].lat(), lng: overview_path[i].lng()})
                }
                dict[trips[i].color] = path
                setPolylineDicts(polylineDicts => [...polylineDicts, dict])
            } 
        })  
    }

    const polylines = polylineDicts.map(polylineDict => {
        return (
            <div key={polylineDicts.indexOf(polylineDict)}>
                <Polyline 
                    path={Object.values(polylineDict)[0]} 
                    geodesic = {true}
                    options={{
                        strokeColor: Object.keys(polylineDict),
                        strokeOpacity: .5,
                        strokeWeight: 5,
                    }}
                />
            </div> 
        )
    })

    return (
        <div>
            {polylines}
        </div>
    )
}

export default ShowPastTrips;