import React from "react";
import { useState, useEffect } from "react";
import Dropdown from 'react-dropdown';

import StartStation from "./StartStation";
import EndStation from "./EndStation";

function Controls({ start, onSetStart, end, onSetEnd, mapRef }) {

    const [routes, setRoutes] = useState([])
    const [stations, setStations] = useState([])

    useEffect(() => {
        fetch("/stations")
        .then(r => r.json())
        .then(setStations)
    }, [])

    function handleSetRoutes(routes) {
        setRoutes(routes)
    }


    return (
        <div>
            <StartStation 
                routes = {routes}
                onSetRoutes = {handleSetRoutes}
                stations = {stations}
                setPosition={(position) => {
                    console.log('Set!')
                    onSetStart(position)
                    mapRef.current.panTo(position)}}
            />
            {routes.length >=1 && <Dropdown options={routes} placeholder="which train..."onChange={e => setRoutes(e.value)}>Which train?</Dropdown>}

            {typeof(routes) === 'string' && 
            <EndStation 
                route = {routes}
                start = {start}
                setPosition={(station) => {
                    onSetEnd(station)
                    mapRef.current.panTo(station)}
                }
            />}
        </div>
    )
}

export default Controls