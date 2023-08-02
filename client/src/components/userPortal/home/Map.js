import React from "react";
import { useMemo, useCallback, useRef, useState, useContext } from "react";
import ShowPastTrips from "./ShowPastTrips";
import {
    GoogleMap
} from "@react-google-maps/api"
import NavBar from "../NavBar";
import { UserContext } from "../../../context/user";
import "../../../stylesheets/home.css"
function Map() {

    const {setUser} = useContext(UserContext)
    
    const [active, setActive] = useState(false)
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
                    <button className="show-trips" onClick={() => setActive(!active)}>Past Trips</button>
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
                    {active && <ShowPastTrips />}
                </GoogleMap>
            </div>
        </div>
    )
}

export default Map;