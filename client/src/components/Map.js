import React from "react";
import { useState, useEffect, useMemo, useCallback, useRef } from "react";

import {
    GoogleMap,
    Marker,
    DirectionsRenderer,
} from "@react-google-maps/api"

import Controls from "./controls/Controls";

function Map() {

    const [borough, setBorough] = useState('')
    const [start, setStart] = useState([])
    const [route, setRoute] = useState('')
    const [color, setColor] = useState('')
    const [end, setEnd] = useState([])
    const [directions, setDirections] = useState()
    const [allDirections, setAllDirections] = useState([])

    const [trips, setTrips] = useState([])
    const [activate, setActivate] = useState(false)
    
    const mapRef = useRef()
    const center = useMemo(() => ({ lat: 40.7826, lng: -73.9656 }), [])
    const options = useMemo(() => ({
        mapId: "343a9e311a65c41f",
        disableDefaultUI: true,
        clickableIcons: false
    }), [])


    const onLoad = useCallback((map) => {mapRef.current = map}, [])


    useEffect(() => {
        fetch("/trips")
        .then(r => r.json())
        .then(setTrips)
    }, [])

    let test

    const handleTrips = useMemo(() => {
        for (let i = 0; trips.length > i; i ++) {
            console.log(trips[i])
            setStart(start => [...start, {lat: trips[i].start_lat, lng: trips[i].start_lng}])
            setStart(end => [...end, {lat: trips[i].end_lat, lng: trips[i].end_lng}])
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
                    console.log('HELPME')
                    // setDirections(result)
                    setAllDirections(allDirections => [...allDirections, result])
                    // handleReset()
                } 
            })
        }
    }, [activate])


    const fetchDirections = () => {
        console.log(start, end)
        // fetch("/trips",{
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //         start_lat: start.lat,
        //         start_lng: start.lng,
        //         end_lat: end.lat,
        //         end_lng: end.lng
        //     })
        // }) 
        // .then( r => r.json())
        // .then(data => console.log(data))
        const service = new window.google.maps.DirectionsService()
        service.route({
            origin: {lat: start.lat, lng: start.lng},
            destination: {lat: end.lat, lng: end.lng},
            waypoints: [],
            travelMode: window.google.maps.TravelMode.TRANSIT,
            transitOptions: {
                routingPreference: "FEWER_TRANSFERS",
                modes: ['SUBWAY']
            }
        }, 
        (result, status) => {
            if (status === 'OK' && result) {
                console.log('HELPME')
                // setDirections(result)
                setAllDirections([...allDirections, result])
                // handleReset()
            } 
        })
    }

    const start_markers = start.map(start => {
        return (
            <Marker position={{lat: start.lat, lng: start.lng}}/>
        )
    })
    const end_markers = end.map(end => {
        return (
            <Marker position={{lat:end.lat, lng: end.lng}} />
        )
    })

    console.log(allDirections)



    function handleReset() {
        setBorough('')
        setRoute('')
        setStart('')
        setEnd('')
    } 

    const directions_rendered = allDirections.map(direction => {
        return (
            <div>
                <DirectionsRenderer directions={direction} />
            </div>
        )
    })



    return(
        <div className="continer">
            <div className="controls">
                <button onClick={handleReset}>Reset data</button>
                <button onClick={() => setActivate(true)}>Click me</button>
                {!activate && <Controls 
                    start = {start}
                    onSetStart = {setStart}
                    end = {end}
                    onSetEnd = {setEnd}
                    mapRef = {mapRef}
                    onSetColor={setColor}
                    borough={borough}
                    onSetBorough={setBorough}
                    route={route}
                    onSetRoute={setRoute}
                />}
                {(start && end) ? 
                <button onClick={fetchDirections}>
                    Directions
                </button>
                : null}

            </div>
            <div className="map" id="map">
                <GoogleMap 
                zoom={13}
                tilt={60}
                heading={30}
                center={center} 
                mapContainerClassName="map-container"
                options={options}
                onLoad={onLoad}
                >
                    {start_markers}
                    {end_markers}
                    {directions_rendered}
                    {/* {directions && 
                    (
                    <DirectionsRenderer 
                        directions={directions} 
                        options={{
                            polylineOptions: {
                                strokeColor: color
                            },
                            suppressMarkers: true
                        }}
                    />)} */}
                    {/* {start && (<Marker position={{lat: start.lat, lng: start.lng}}/>)}
                    {end && (<Marker position={{lat: end.lat, lng: end.lng}}/>)} */}
                </GoogleMap>
            </div>
        </div>
    )
}

export default Map;