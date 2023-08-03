import React from "react";
import { useMemo, useCallback, useRef, useState, useEffect, useContext } from "react";
import ShowPastTrips from "./ShowPastTrips";
import {
    GoogleMap
} from "@react-google-maps/api"
import NavBar from "../NavBar";
import "../../../stylesheets/home.css"

import { UserContext } from "../../../context/user";

function Map() {

    const {user, setUser} = useContext(UserContext)
    const [trips, setTrips] = useState([])
    const [revealTrips, setRevealTrips] = useState(false)
    useEffect(() => {
        fetch("/trips")
        .then(r => r.json())
        .then(setTrips)
    }, [])
    const userTrips = trips.filter(trip => trip.user_id === user.id)
    
    const mapRef = useRef()
    const center = useMemo(() => ({ lat: 40.7, lng: -73.9 }), [])
    const options = useMemo(() => ({
        mapId: "343a9e311a65c41f",
        disableDefaultUI: true,
        clickableIcons: false,
        gestureHandling: 'none'
    }), [])

    const onLoad = useCallback((map) => {
        mapRef.current = map
    }, [])

    function handleSignOut() {
        fetch('/logout', {
            method: 'DELETE'
        })
        .then(setUser(null))
    }

    return(
        <div className="continer">
            <div className="controls">
                <NavBar />
                <div className="profile-home">
                    <button className="show-trips" onClick={() => setRevealTrips(!revealTrips)}>{revealTrips ? 'Hide' : 'Show'}<br/>Past Trips</button>
                    <h1>Profile</h1>
                    <h3>Name:<br />{user.name}</h3>
                    <h3>Occupation:<br/>{user.role ? user.role : 'n/a'}</h3>
                    <h3>Borough:<br/>{user.borough}</h3>
                    <h3>Trips Taken:<br/>{userTrips.length}</h3>
                    <button onClick={() => handleSignOut()}>Sign Out</button>
                </div>
            </div>
            <div className="map" id="map">
                <GoogleMap 
                zoom={12.3}
                tilt={50}
                heading={30}
                center={center} 
                mapContainerClassName="map-container"
                options={options}
                onLoad={onLoad}
                >
                    {revealTrips && <ShowPastTrips userTrips={userTrips}/>}
                </GoogleMap>
            </div>
        </div>
    )
}

export default Map;