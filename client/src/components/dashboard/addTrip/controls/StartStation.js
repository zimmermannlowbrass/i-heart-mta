import React from "react";
import { useState, useEffect } from "react";

import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from "@reach/combobox";

function StartStation({start, onSetStart, borough, setPosition }) {

    const [stations, setStations] = useState([])
    const [station, setStation] = useState('')

    useEffect(() => {
        fetch("/stations")
        .then(r => r.json())
        .then(setStations)
    }, [])


    function handleSelect(stationName) {
        const x = stationName.indexOf('#')
        const station_id = parseInt(stationName.slice(x + 1))
        const station = stations.filter(station => station.id === station_id)[0]
        onSetStart(station)
        setPosition(station)
        setStation(station.name)
    } 
    
    const stations_in_borough = stations.filter(station => station.borough === borough)
    const station_choices = stations_in_borough.filter(station_in_borough => station_in_borough.name.toUpperCase().includes(station.toUpperCase()))
    const station_choices_mapped = station_choices.map(station => {
        const value = station.name + ' ' + station.routes + ' #' + station.id
        return (
            <ComboboxOption key={station.id} value={value}>{station.name}-{station.routes}</ComboboxOption>
        )
    })


    return (
        <div>
            <br />
            <Combobox onSelect={(e) => handleSelect(e)}>
                <ComboboxInput 
                value={station}
                readOnly = {start && true}
                onChange ={e => setStation(e.target.value)}
                className="combobox-input"
                placeholder="start"
                />
                {!start && <ComboboxPopover>
                    <ComboboxList className="combobox-list">
                        {station_choices_mapped}
                    </ComboboxList>
                </ComboboxPopover>}
            </Combobox>
            < br />
        </div>
    )

}

export default StartStation;