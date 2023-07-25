import React from "react";
import { useMemo, useCallback, useRef, useState } from "react";
import ShowPastTrips from "./ShowPastTrips";


import {
    GoogleMap
} from "@react-google-maps/api"

function ProfileMap() {
    const [active, setActive] = useState(false)
    const mapRef = useRef()
    const center = useMemo(() => ({ lat: 40.7826, lng: -73.9656 }), [])
    const options = useMemo(() => ({
        mapId: "343a9e311a65c41f",
        disableDefaultUI: true,
        clickableIcons: false,
    }), [])


    const onLoad = useCallback((map) => {
        mapRef.current = map
    }, [])


    return(
        <div className="continer">
            <button onClick={() => setActive(!active)}>Show Past Trips</button>
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
                    {active && <ShowPastTrips />}
                </GoogleMap>
            </div>
        </div>
    )
}

export default ProfileMap;