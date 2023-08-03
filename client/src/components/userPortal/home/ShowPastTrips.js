import React from "react";
import { useState, useMemo } from "react";

import {
    Polyline
} from "@react-google-maps/api"

function ShowPastTrips({ userTrips }) {

    const [polylineDicts, setPolylineDicts] = useState([])

    const makePolylines = () => {
        for (let i = 0; userTrips.length > i; i++) {
            const service = new window.google.maps.DirectionsService()
            const dict = {}
            service.route({
                origin: {lat: userTrips[i].start.station.lat, lng: userTrips[i].start.station.lng},
                destination: {lat: userTrips[i].stop.station.lat, lng: userTrips[i].stop.station.lng},
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
                    dict[userTrips[i].start.color] = path
                    setPolylineDicts(polylineDicts => [...polylineDicts, dict])
                } 
            })  
        }
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
                        strokeWeight: 3,
                    }}
                />
            </div> 
        )
    })
    useMemo(() => {
        makePolylines()
    },  [])
    return (
        <div>
            {polylines}
        </div>
    )
}

export default ShowPastTrips;