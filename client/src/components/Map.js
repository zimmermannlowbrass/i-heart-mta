import React from "react";
import { useState, useMemo, useCallback, useRef } from "react";

import {
    GoogleMap,
    Marker,
    DirectionsRenderer,
} from "@react-google-maps/api"

import Controls from "./controls/Controls";
import Directions from "./Directions";

function Map() {
    const [start, setStart] = useState()
    const [end, setEnd] = useState()
    const [directions, setDirections] = useState()
    
    const mapRef = useRef()
    const center = useMemo(() => ({ lat: 40.7826, lng: -73.9656}), [])
    const options = useMemo(() => ({
        mapId: "7cb36be43290dc46",
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
            }
        })
    }


    function handleSetStart(start) {
        setStart(start)
    }
    function handleSetEnd(end) {
        setEnd(end)
    }

    return(
        <div className="continer">
            <div className="controls">
                <Controls 
                    start = {start}
                    onSetStart = {handleSetStart}
                    end = {end}
                    onSetEnd = {handleSetEnd}
                    mapRef = {mapRef}
                />
                {(start && end) ? 
                <button onClick={fetchDirections}>
                    Directions
                </button>
                : null}
                <div>
                    {directions && <Directions directions={directions.routes[0].legs[0]}/>}
                </div>
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
                                strokeColor:'red'
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