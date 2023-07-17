import React from "react";
import { useState, useMemo, useCallback, useRef } from "react";
import {
    GoogleMap,
    Marker,
    DirectionsRenderer,
    Circle,
    MarkerClusterer,
} from "@react-google-maps/api"

import Places from "./Places";
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
            origin: start,
            destination: end,
            travelMode: window.google.maps.TravelMode.TRANSIT,
            transitOptions: {
                routingPreference: "FEWER_TRANSFERS",
                modes: ['TRAIN']
            }
        }, 
        (result, status) => {
            if (status === 'OK' && result) {
                setDirections(result)
            }
        })
    }

    function subwayfilter(route) {
        for (const leg in route.routes[0].legs[0].steps) {
            if (leg.travel_mode === 'TRANSIT') {
                console.log('TRANSIT!')
            }
        }
        return route
    }

    console.log(directions)

    return(
        <div className="continer">
            <div className="controls">
                <h1>Commute?</h1>
                <Places 
                    position = "start"
                    setPosition={(position) => {
                        setStart(position)
                        mapRef.current.panTo(position)
                }}
                />
                <Places 
                    position = "end"
                    setPosition={(position) => {
                        setEnd(position)
                        mapRef.current.panTo(position)
                }}
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
                center={center} 
                mapContainerClassName="map-container"
                options={options}
                onLoad={onLoad}
                >
                    {directions && 
                    (<DirectionsRenderer directions={directions} options={{
                        polylineOptions: {
                            strokeColor:'red'
                        },
                        suppressMarkers: true
                    }}
                    />)
                    }

                    {start && (<Marker position={start}/>)}
                    {end && (<Marker position={end}/>)}
                </GoogleMap>
            </div>
        </div>
    )
}

export default Map;