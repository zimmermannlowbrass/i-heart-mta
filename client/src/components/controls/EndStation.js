import React from "react";
import { useState, useEffect } from "react";
import Dropdown from 'react-dropdown';
import Select from 'react-select';



function EndStation({ route, start, setPosition}){

    const [subwaystops, setSubwayStops] = useState([])
    const [direction, setDirection] = useState()

    useEffect(() => {
        fetch("/subwaystops")
        .then(r => r.json())
        .then(setSubwayStops)
    }, [])

    const subwaystops_in_route = subwaystops.filter(subwaystop => subwaystop.route === route)
    const currentstop = subwaystops_in_route.filter(stop => stop.stationname === start.name)[0]
    const possible_subwaystops = subwaystops_in_route.filter(subwaystop => {
        if (direction === 'uptown') {
            return subwaystop.position < currentstop.position
        } else if (direction === 'downtown') {
            return subwaystop.position > currentstop.position
        } else return false
    })

    const options = possible_subwaystops.map(stop => {
        return {label: stop.stationname, value: stop}
    })

    console.log(options)
    return (
        <div>
            <Dropdown placeholder="Pick a direction" options={[{label: start.uptown, value: "uptown"}, {label: start.downtown, value: "downtown"}]} onChange={e => setDirection(e.value)}/>
            {direction && 
            <Select
            options={options}
            onChange={e => console.log(e.value)}
            />}
        </div>
    )
}

export default EndStation;