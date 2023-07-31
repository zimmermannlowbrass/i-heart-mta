import React from "react";
import { useState, useEffect } from "react";
import Dropdown from 'react-dropdown';

import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from "@reach/combobox";


function EndStation({ route, start, onSetStartId, end, onSetEnd, onSetEndId, onSetColor, setPosition}){

    const [subwaystops, setSubwayStops] = useState([])
    const [station, setStation] = useState('')
    const [direction, setDirection] = useState()

    useEffect(() => {
        fetch("/subwaystops")
        .then(r => r.json())
        .then(setSubwayStops)
    }, [])

    const subwaystops_in_route = subwaystops.filter(subwaystop => subwaystop.route === route)
    const currentstop = subwaystops_in_route.filter(stop => stop.station.id === start.id)[0]
    const possible_subwaystops = subwaystops_in_route.filter(subwaystop => {
        if (direction === 'uptown') {
            return subwaystop.position < currentstop.position
        } else if (direction === 'downtown') {
            return subwaystop.position > currentstop.position
        } else return false
    })

    const comboboxoptions = possible_subwaystops.map(stop => {
        const value = stop.stationname + ' - stop #' + stop.position
        return (
            <ComboboxOption key={stop.stationname} value={value}>{stop.stationname}</ComboboxOption>
        )
    })

    function handleSelect(e) {
        const x = e.indexOf('#')
        onSetStartId(currentstop.id)
        const position_id = parseInt(e.slice(x + 1))
        console.log(position_id)
        const end = possible_subwaystops.filter(subwaystop => subwaystop.position === position_id)[0]
        onSetEndId(end.id)
        setPosition(end.station)
        onSetColor(end.color)
        setStation(e.slice(0 ,(x - 8)))
    }

    return (
        <div>
            <Dropdown
                className="combobox-input" 
                placeholder="Pick a direction" 
                options={[{label: start.uptown, value: "uptown"}, {label: start.downtown, value: "downtown"}]} 
                onChange={e => setDirection(e.value)}
            />
            <br />
            {direction && 
                <Combobox onSelect={(e) => handleSelect(e)}>
                    <ComboboxInput 
                    value={station}
                    onChange ={e => setStation(e.target.value)}
                    className="combobox-input"
                    placeholder="end"
                    />
                    {!station && <ComboboxPopover>
                        <ComboboxList className="combobox-list">
                            {comboboxoptions}
                        </ComboboxList>
                    </ComboboxPopover>}
                </Combobox>
            }
        </div>
    )
}

export default EndStation;