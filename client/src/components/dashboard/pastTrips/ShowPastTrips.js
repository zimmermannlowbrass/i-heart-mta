import React from "react";
import { useEffect, useState, useMemo } from "react";

import {
    Marker,
    DirectionsRenderer,
} from "@react-google-maps/api"

function ShowPastTrips({ activate }) {

    const [trips, setTrips] = useState([])
    const [starts, setStarts] = useState([])
    const [ends, setEnds] = useState([])
    const [allDirections, setAllDirections] = useState([])



    useEffect(() => {
        fetch("/trips")
        .then(r => r.json())
        .then(setTrips)
    }, [])

    useMemo(() => {
        for (let i = 0; trips.length > i; i ++) {
            console.log(trips[i])
            setStarts(starts => [...starts, {lat: trips[i].start_lat, lng: trips[i].start_lng}])
            setEnds(ends => [...ends, {lat: trips[i].end_lat, lng: trips[i].end_lng}])
            const service = new window.google.maps.DirectionsService()
            service.route({
                origin: {lat: trips[i].start_lat, lng: trips[i].start_lng},
                destination: {lat: trips[i].end_lat, lng: trips[i].end_lng},
                waypoints: [],
                travelMode: window.google.maps.TravelMode.TRANSIT,
                transitOptions: {
                    routingPreference: "FEWER_TRANSFERS",
                    modes: ['SUBWAY']
                }
            }, 
            (result, status) => {
                if (status === 'OK' && result) {
                    // setDirections(result)
                    setAllDirections(allDirections => [...allDirections, result])
                } 
            })
        }
    }, [activate])

    const start_markers = starts.map(start => {
        return (
            <Marker position={{lat: start.lat, lng: start.lng}}/>
        )
    })
    const end_markers = ends.map(end => {
        return (
            <Marker position={{lat:end.lat, lng: end.lng}} />
        )
    })

    const directions_rendered = allDirections.map(direction => {
        return (
            <div key={allDirections.indexOf(direction)}>
                <DirectionsRenderer directions={direction} />
            </div>
        )
    })


    return (
        <div>
            {start_markers}
            {end_markers}
            {directions_rendered}
        </div>
    )
}

export default ShowPastTrips;