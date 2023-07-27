import React from "react";
import Dropdown from 'react-dropdown';


function Boroughs({ borough, onSetBorough}) {

    const boroughs = ['M', 'Bk', 'Bx', 'Q']

    return (
        <div className="boroughDropdown">
            <Dropdown 
            className="combobox-input" 
            placeholder="Pick a borough" 
            disabled={borough && true}
            options={!borough && boroughs}
            onChange={(e) => onSetBorough(e.value)}
            />
        </div>
    )
}

export default Boroughs;