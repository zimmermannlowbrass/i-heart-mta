import React from "react";
import { useState, useMemo, useCallback, useRef } from "react";

import {
    GoogleMap,
    Marker,
    DirectionsRenderer,
    Polyline
} from "@react-google-maps/api"

import Controls from "./controls/Controls";
import ShowPastTrips from "./pastTrips/ShowPastTrips";

function Map() {

    const [borough, setBorough] = useState('')
    const [start, setStart] = useState('')
    const [route, setRoute] = useState('')
    const [color, setColor] = useState('')
    const [end, setEnd] = useState('')
    const [path, setPath] = useState([])
    const [directions, setDirections] = useState('')

    const [activate, setActivate] = useState(false)
    
    const mapRef = useRef()
    const center = useMemo(() => ({ lat: 40.7826, lng: -73.9656 }), [])
    const options = useMemo(() => ({
        mapId: "343a9e311a65c41f",
        disableDefaultUI: true,
        clickableIcons: false,
    }), [])


    const onLoad = useCallback((map) => {mapRef.current = map}, [])

    const fetchDirections = () => {
        console.log(start, end)
        fetch("/trips",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                start_lat: start.lat,
                start_lng: start.lng,
                end_lat: end.lat,
                end_lng: end.lng,
                color: color
            })
        }) 
        .then( r => r.json())
        .then(data => console.log(data))
        const service = new window.google.maps.DirectionsService()
        service.route({
            origin: {lat: start.lat, lng: start.lng},
            destination: {lat: end.lat, lng: end.lng},
            waypoints: [],
            travelMode: window.google.maps.TravelMode.TRANSIT,
            transitOptions: {
                routingPreference: "FEWER_TRANSFERS",
                modes: ['SUBWAY']
            },
        }, 
        (result, status) => {
            if (status === 'OK' && result) {
                const overview_path=result.routes[0].overview_path
                setPath([])
                for (let i=0; i<overview_path.length;i++) {
                  console.log("latitude="+overview_path[i].lat()+", longitude="+overview_path[i].lng())
                  setPath(path => [...path, {lat: overview_path[i].lat(), lng: overview_path[i].lng()}])
                }
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
                <button onClick={() => setActivate(!activate)}>Show past trips</button>
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
                {(start && end) &&
                <button onClick={fetchDirections}>
                    Directions
                </button>}

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
                    <Polyline 
                    path={path} 
                    geodesic = {true}
                    options={{strokeColor: color,
                    strokeOpacity: .5,
                    strokeWeight: 5,
                    }}
                    />

                    <ShowPastTrips activate={activate}/>
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