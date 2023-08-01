import React from "react";
import { useMemo, useCallback, useRef, useState } from "react";
import ShowPastTrips from "./ShowPastTrips";


import {
    GoogleMap
} from "@react-google-maps/api"
import NavBar from "../NavBar";

function Map() {
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

    return(
        <div className="continer">
            <div className="controls">
                <NavBar />
                <button onClick={() => setActive(!active)}>Show Past Trips</button>
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