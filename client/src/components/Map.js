import React from "react";
import { useState, useMemo, useCallback, useRef } from "react";

import {
    GoogleMap,
    Marker,
    DirectionsRenderer,
} from "@react-google-maps/api"

import Controls from "./controls/Controls";

function Map() {
    const [start, setStart] = useState()
    const [end, setEnd] = useState()
    const [directions, setDirections] = useState()
    const [color, setColor] = useState('Black')
    const [borough, setBorough] = useState('')
    const [route, setRoute] = useState('')
    
    const mapRef = useRef()
    const center = useMemo(() => ({ lat: 40.7826, lng: -73.9656}), [])
    const options = useMemo(() => ({
        mapId: "343a9e311a65c41f",
        disableDefaultUI: true,
        clickableIcons: false
    }), [])


    const onLoad = useCallback(map => (mapRef.current = map), [])
    const fetchDirections = () => {
        console.log(start, end)

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
                console.log(result)
                setDirections(result)
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
                {/* <div>
                    {directions && <Directions directions={directions.routes[0].legs[0]}/>}
                </div> */}
            </div>
            <div className="map">
                <GoogleMap 
                zoom={14}
                tilt={20}
                heading={30}
                center={center} 
                mapContainerClassName="map-container"
                options={options}
                onLoad={onLoad}
                >
                    {directions && 
                    (<DirectionsRenderer 
                        directions={directions} 
                        options={{
                            polylineOptions: {
                                strokeColor: color
                            },
                            suppressMarkers: true
                        }}
                    />)
                    }

                    {start && (<Marker position={{lat: start.lat, lng: start.lng}}/>)}
                    {end && (<Marker position={{lat: end.lat, lng: end.lng}}/>)}
                </GoogleMap>
            </div>
        </div>
    )
}

export default Map;