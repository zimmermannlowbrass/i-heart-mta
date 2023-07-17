import React from "react";
import usePlacesAutocomplete, { getGeocode, getLatLng}  from "use-places-autocomplete";

import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from "@reach/combobox";

function Places({ position, setPosition }) {

    //Here I can plug in my stations table
    const {ready, value, setValue, suggestions: {status, data}, clearSuggestions} = usePlacesAutocomplete()


    const handleSelect = async(string) => {
        setValue(string, false)
        clearSuggestions()

        const results = await getGeocode({address: string})
        const {lat, lng} = getLatLng(results[0])
        setPosition({lat, lng})

    }

    return (
        <div>
            <Combobox onSelect={handleSelect}>
                <ComboboxInput 
                value={value} 
                onChange ={e => setValue(e.target.value)}
                className="combobox-input"
                placeholder={position ==="start" ? "Starting point" : "Ending point"}
                />
                <ComboboxPopover>
                    <ComboboxList>
                        {status ==="OK" ? data.map(({ place_id, description }) => (
                            <ComboboxOption key={place_id} value={description}/>
                        )) : null}
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
            
        </div>
    )
}

export default Places;