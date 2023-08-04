import React from "react";
import { useState, useMemo, useCallback, useRef, useContext } from "react";

import {
    GoogleMap,
    Marker,
    Polyline,
} from "@react-google-maps/api"

import Controls from "./controls/Controls";
import NavBar from "../NavBar";
import { UserContext } from "../../../context/user";

function AddTripMap() {
    
    const {user} = useContext(UserContext)

    const [borough, setBorough] = useState('')
    const [start, setStart] = useState('')
    const [startId, setStartId] = useState('')
    const [route, setRoute] = useState('')
    const [color, setColor] = useState('')
    const [end, setEnd] = useState('')
    const [endId, setEndId] = useState('')
    const [path, setPath] = useState([])
    const [revealControls, setRevealControls] = useState(true)

    const startingpoint = () => {switch (user.borough) {
        case 'Manhattan':
            return { lat: 40.7826, lng: -73.9656 }
        case 'Bronx':
            return { lat: 40.8448, lng: -73.8648 }
        case 'Brooklyn':
            break;
        case 'Queens':
            return { lat: 40.7282, lng: -73.7949 }
        default:
            return { lat: 40.7826, lng: -73.9656 }
        }
    }
    
    const mapRef = useRef()
    const center = useMemo(() => (startingpoint()), [])
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
                start_id: startId,
                end_id: endId,
                user_id: user.id
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
                  setPath(path => [...path, {lat: overview_path[i].lat(), lng: overview_path[i].lng()}])
                }
                handleReset()
                setRevealControls(false)
            } 
        })
    }
    console.log(start, end, route)
    const handleReset = () => {
        setBorough('')
        setRoute('')
        setStart('')
        setEnd('')
    } 

    return(
        <div className="continer">
            <div className="controls">
                <NavBar />
                {revealControls 
                ?
                <div>
                    <h1>Add a trip</h1>
                    <Controls 
                    start = {start}
                    onSetStart = {setStart}
                    onSetStartId = {setStartId}
                    end = {end}
                    onSetEnd = {setEnd}
                    onSetEndId = {setEndId}
                    mapRef = {mapRef}
                    onSetColor={setColor}
                    borough={borough}
                    onSetBorough={setBorough}
                    route={route}
                    onSetRoute={setRoute}
                    onReset={handleReset}/>
                </div>
                : <div>
                    <h1 className="addedTripAlert">🥳🎉🎊<br/>Trip has been added!!<br/>🥳🎉🎊</h1>
                    <button onClick={() => setRevealControls(true)}>Add another trip?</button>
                </div>
                }
                {(start && end) &&
                <button className="show-trips" onClick={fetchDirections}>
                    Get Directions
                </button>}
            </div>
            <div className="map" id="map">
                <GoogleMap 
                zoom={13}
                tilt={90}
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
                    {start && (<Marker position={{lat: start.lat, lng: start.lng}}/>)}
                    {end && (<Marker position={{lat: end.lat, lng: end.lng}}/>)}
                </GoogleMap>
            </div>
        </div>
    )
}

export default AddTripMap;