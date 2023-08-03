import React from "react";
import { useContext } from "react";

import Dropdown from 'react-dropdown';
import { UserContext } from "../../../../context/user";

function Boroughs({ borough, onSetBorough}) {

    const {user} = useContext(UserContext)
    console.log(user.borough)

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
            default:
                return
        }
    }

    return (
        <div className="boroughDropdown">
            {!borough && 'Which Borough did you start at?'}
            <Dropdown
            value={borough} 
            className="combobox-input" 
            disabled={borough && true}
            options={!borough && boroughs}
            onChange={(e) => handleSelect(e.value)}
            />
        </div>
    )
}

export default Boroughs;