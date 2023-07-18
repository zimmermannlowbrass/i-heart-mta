import React from "react";
import { useState, useEffect } from "react";
// import usePlacesAutocomplete, { getGeocode, getLatLng}  from "use-places-autocomplete";

import Dropdown from 'react-dropdown';

import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from "@reach/combobox";

function Places({ position, setPosition }) {

    //Here I can plug in my stations table
    // const {ready, value, setValue, suggestions: {status, data}, clearSuggestions} = usePlacesAutocomplete()

    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')
    const [borough, setBorough] = useState('')

    const [stations, setStations] = useState([])
    useEffect(() => {
        fetch("/stations")
        .then(r => r.json())
        .then(setStations)
    }, [])

    console.log(borough)


    function handleSelect(e) {
        const station = station_choices.filter(station => station.name === e)[0]
        console.log(station.lat, station.lng)
        setPosition({ lat: station.lat, lng: station.lng})
    }

    // const handleSelect = async(string) => {
    //     setValue(string, false)
    //     clearSuggestions()

    //     const results = await getGeocode({address: string})
    //     const {lat, lng} = getLatLng(results[0])
    //     setPosition({lat, lng})
    // }   
    
    const stations_in_borough = stations.filter(station => station.borough === borough)
    const station_choices = stations_in_borough.filter(station => station.name.includes(end))

    return (
        <div>
            <Dropdown className="combobox-input" placeholder="Pick a borough" options={['M', 'Br', 'Bx', 'Q', 'SI']} value={borough} onChange={e => setBorough(e.value)}/>
            <br />
            {borough &&
                <Combobox onSelect={e => handleSelect(e)}>
                    <ComboboxInput 
                    value={end} 
                    onChange ={e => setEnd(e.target.value)}
                    className="combobox-input"
                    placeholder={position ==="start" ? "Starting point" : "Ending point"}
                    />
                    <ComboboxPopover>
                        <ComboboxList>
                            {/* {status ==="OK" ? data.map(({ place_id, description }) => (
                                <ComboboxOption key={place_id} value={description}/>
                            )) : null} */}
                            {station_choices.map(station => <ComboboxOption key={station.id} value={station.name}/>)}
                        </ComboboxList>
                    </ComboboxPopover>
                </Combobox>}
        </div>
    )

}

export default Places;