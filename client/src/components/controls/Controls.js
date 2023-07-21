import React from "react";
import { useState, useEffect } from "react";

import StartStation from "./StartStation";
import EndStation from "./EndStation";
import Boroughs from "./Boroughs";
import Routes from "./Routes";

function Controls({ start, onSetStart, end, onSetEnd, mapRef, onSetColor}) {

    const [borough, setBorough] = useState('')
    const [route, setRoute] = useState('')
 
    function handleSetRoute(route) {
        setRoute(route)
    }

    function handleSetBorough(newBorough) {
        setBorough(newBorough)
    }

    function handleReset() {
        setBorough('')
        setRoute('')
        onSetStart('')
        onSetEnd('')
    }

    return (
        <div>
            <button onClick={handleReset}>Reset data</button>
            <Boroughs
            borough = {borough} 
            onSetBorough = {handleSetBorough}
            />
            {borough && 
            <StartStation
                start={start}
                onSetStart={onSetStart}
                borough = {borough}
                setPosition={(position) => {
                    mapRef.current.panTo(position)}}
            />
            }
            {(borough && start) && <Routes start={start} route ={route} onSetRoutes={handleSetRoute}/>}

            {(borough && start && route) && 
            <EndStation 
                route = {route}
                start = {start}
                onSetColor = {onSetColor}
                setPosition={(station) => {
                    onSetEnd(station)
                    mapRef.current.panTo(station)}
                }
            />}
        </div>
    )
}

export default Controls