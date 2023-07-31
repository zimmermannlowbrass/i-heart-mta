import React from "react";

import StartStation from "./StartStation";
import EndStation from "./EndStation";
import Boroughs from "./Boroughs";
import Routes from "./Routes";

function Controls({ start, onSetStart, onSetStartId, end, onSetEnd, onSetEndId, mapRef, onSetColor, borough, onSetBorough, route, onSetRoute, onReset}) {

    return (
        <div>
            <button onClick={onReset}>Reset</button>
            <Boroughs
            borough = {borough} 
            onSetBorough = {onSetBorough}
            />

            {borough && 
            <StartStation
                start={start}
                onSetStart={onSetStart}
                borough = {borough}
                setPosition={(position) => {
                    mapRef.current.panTo(position)}}
            />}

            {(borough && start) && 
            <Routes start={start} route ={route} onSetRoutes={onSetRoute}
            />}

            {(borough && start && route) && 
            <EndStation 
                route = {route}
                start = {start}
                onSetStartId= {onSetStartId}
                end ={end}
                onSetEndId = {onSetEndId}
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