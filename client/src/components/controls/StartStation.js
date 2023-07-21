import React from "react";
import { useState } from "react";

import Dropdown from 'react-dropdown';

import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from "@reach/combobox";

function StartStation({ routes, onSetRoutes, stations, setPosition }) {

    const [station, setStation] = useState('')
    const [borough, setBorough] = useState('')


    function handleSelect(stationName) {
        const station = station_choices.filter(station => station.name === stationName)[0]
        const routes = []
        for (let route of station.routes) {
            routes.push(route)
        }
        onSetRoutes(routes)
        setPosition(station)
    } 
    
    const stations_in_borough = stations.filter(station => station.borough === borough)
    const station_choices = stations_in_borough.filter(station_in_borough => station_in_borough.name.toUpperCase().includes(station.toUpperCase()))

    return (
        <div>
            {routes.length !== 0 ? <Dropdown options={routes} >Which train?</Dropdown> : null}
            <Dropdown className="combobox-input" placeholder="Pick a borough" options={['M', 'Bk', 'Bx', 'Q', 'SI']} value={borough} onChange={e => setBorough(e.value)}/>
            <br />
            {borough &&
                <Combobox onSelect={e => handleSelect(e)}>
                    <ComboboxInput 
                    value={station} 
                    onChange ={e => setStation(e.target.value)}
                    className="combobox-input"
                    placeholder="start"
                    />
                    <ComboboxPopover>
                        <ComboboxList>
                            {station_choices.map(station => <ComboboxOption key={station.id} value={station.name}>{station.name} {station.routes}</ComboboxOption>)}
                        </ComboboxList>
                    </ComboboxPopover>
                </Combobox>}
        </div>
    )

}

export default StartStation;