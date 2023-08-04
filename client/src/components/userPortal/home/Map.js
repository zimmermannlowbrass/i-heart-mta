import React from "react";
import { useMemo, useCallback, useRef, useState, useEffect, useContext } from "react";
import ShowPastTrips from "./ShowPastTrips";
import {
    GoogleMap
} from "@react-google-maps/api"
import NavBar from "../NavBar";
import "../../../stylesheets/home.css"
import CannotEdit from './profile/CannotEdit.js'

import { UserContext } from "../../../context/user";
import CanEditProfile from "./profile/CanEdit";

function Map() {

    const {user} = useContext(UserContext)
    const [trips, setTrips] = useState([])
    const [revealTrips, setRevealTrips] = useState(false)
    const [canEditProfile, setCanEditProfile] = useState(false)
    const [showPasword, setShowPassword] = useState(false)
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

    function handleUnlock(e) {
        e.preventDefault()
        const password = e.target[0].value
        fetch('/checkpassword', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id: user.id,
                password: password
            })
        })
        .then((r) => {
            if (r.ok) {
                setCanEditProfile(true)
            } else {
                r.json().then(err => alert(err['error']))
            }
        })
    }


    return(
        <div className="continer">
            <div className="controls">
                <NavBar />
                <div className="profile-home">
                    {canEditProfile 
                    ?
                    <div> 
                        <button onClick={() => setCanEditProfile(false)}>Go Back</button>
                        <CanEditProfile setCanEditProfile={setCanEditProfile}/> 
                    </div>
                    : 
                    <div>
                        <button className="show-trips" onClick={() => setRevealTrips(!revealTrips)}>{revealTrips ? 'Hide' : 'Show'}<br/>Past Trips</button>
                        <CannotEdit userTrips={userTrips}/>
                        <br />
                        <form onSubmit={handleUnlock}>
                            Password
                            <input type={showPasword ? null : "password"}></input>
                            <button type="button" onClick={() =>setShowPassword(!showPasword)}>
                                {showPasword ? "Hide Password" : "Show Password"}
                            </button>
                            <button>Unlock Profile</button>
                        </form>
                    </div>
                }
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