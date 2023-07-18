import React from "react";
import { useState, useEffect } from "react";

function EndStation({ route, setPosition}){

    const [subwaystops, setSubwayStops] = useState([])

    useEffect(() => {
        fetch("/subwaystops")
        .then(r => r.json())
        .then(setSubwayStops)
    }, [])

    const subwaystops_on_route = subwaystops.filter(subwaystop => subwaystop.route === route)[0]

    console.log(subwaystops_on_route)
    return (
        <div>
            EndStation
        </div>
    )
}

export default EndStation;