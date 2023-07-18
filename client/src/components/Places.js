import React from "react";
import { useState, useEffect } from "react";
import usePlacesAutocomplete, { getGeocode, getLatLng}  from "use-places-autocomplete";


import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from "@reach/combobox";

function Places({ position, setPosition }) {

    //Here I can plug in my stations table
    const {ready, value, setValue, suggestions: {status, data}, clearSuggestions} = usePlacesAutocomplete()

    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')

    const [stations, setStations] = useState([])
    useEffect(() => {
        fetch("/stations")
        .then(r => r.json())
        .then(setStations)
    }, [])

    console.log(stations)



    const handleSelect = async(string) => {
        console.log(string)
    //     setValue(string, false)
    //     clearSuggestions()

    //     const results = await getGeocode({address: string})
    //     const {lat, lng} = getLatLng(results[0])
    //     setPosition({lat, lng})
    }

    const station_choices = stations.filter(station => station.name.includes(end))

    return (
        <div>
            <Combobox onSelect={handleSelect}>
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
            </Combobox>
        </div>
    )
}

export default Places;