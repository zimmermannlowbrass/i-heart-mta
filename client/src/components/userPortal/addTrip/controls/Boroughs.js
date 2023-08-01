import React from "react";
import Dropdown from 'react-dropdown';



function Boroughs({ borough, onSetBorough}) {

    const boroughs = ['Manhattan', 'Brooklyn', 'Bronx', 'Queens']
    function handleSelect(borough) {
        switch(borough) {
            case 'Manhattan':
                onSetBorough('M')
                break
            case 'Brooklyn':
                onSetBorough('Bk')
                break
            case 'Bronx':
                onSetBorough('Bx')
                break
            case 'Queens':
                onSetBorough('Q')
                break
        }
    }

    return (
        <div className="boroughDropdown">
            <Dropdown
            value={borough} 
            className="combobox-input" 
            placeholder="Pick a borough" 
            disabled={borough && true}
            options={!borough && boroughs}
            onChange={(e) => handleSelect(e.value)}
            />
        </div>
    )
}

export default Boroughs;