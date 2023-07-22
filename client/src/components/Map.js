import React from "react";
import { useState, useMemo, useCallback, useRef } from "react";

import {
    GoogleMap,
    Marker,
    DirectionsRenderer,
} from "@react-google-maps/api"

import Controls from "./controls/Controls";

function Map() {

    const [borough, setBorough] = useState('')
    const [start, setStart] = useState()
    const [route, setRoute] = useState('')
    const [color, setColor] = useState('')
    const [end, setEnd] = useState()
    const [directions, setDirections] = useState()
    const [allDirections, setAllDirections] = useState([])
    
    const mapRef = useRef()
    const center = useMemo(() => ({ lat: 40.7826, lng: -73.9656 }), [])
    const options = useMemo(() => ({
        mapId: "343a9e311a65c41f",
        disableDefaultUI: true,
        clickableIcons: false
    }), [])


    const onLoad = useCallback((map) => mapRef.current = map, [])

    // const service = new window.google.maps.DirectionsService()
    // useMemo(() => {
    //     service.route({
    //         origin: {lat: 40.76266, lng: -73.967258},
    //         destination: {lat: 
    //             40.759901, lng: -73.984139},
    //         waypoints: [],
    //         travelMode: window.google.maps.TravelMode.TRANSIT,
    //         transitOptions: {
    //             routingPreference: "FEWER_TRANSFERS",
    //             modes: ['SUBWAY']
    //         }
    //     }, 
    //     (result, status) => {
    //         if (status === 'OK' && result) {
    //             setDirections(result)
    //             handleReset()
    //         } 
    //     })
    // }, [])





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
                setDirections(result)
                setAllDirections([...allDirections, result])
                handleReset()
            } 
        })
    }




    function handleReset() {
        setBorough('')
        setRoute('')
        setStart('')
        setEnd('')
    }

    return(
        <div className="continer">
            <div className="controls">
                <button onClick={handleReset}>Reset data</button>
                <Controls 
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
                />
                {(start && end) ? 
                <button onClick={fetchDirections}>
                    Directions
                </button>
                : null}

            </div>
            <div className="map">
                <GoogleMap 
                zoom={13}
                tilt={60}
                heading={30}
                center={center} 
                mapContainerClassName="map-container"
                options={options}
                onLoad={onLoad}
                polylineOptions={"cakwFrorbMv@eEBSDQFODQHOFOHMJKHMJKLKJILINGNGPIPIPKLMLOJOJQHSFUFUFWBYBY@]@]PuM"}
                >
                    {directions && 
                    (
                    <DirectionsRenderer 
                        directions={directions} 
                        options={{
                            polylineOptions: {
                                strokeColor: color
                            },
                            suppressMarkers: true
                        }}
                    />)}
                    {start && (<Marker position={{lat: start.lat, lng: start.lng}}/>)}
                    {end && (<Marker position={{lat: end.lat, lng: end.lng}}/>)}
                </GoogleMap>
            </div>
        </div>
    )
}

export default Map;