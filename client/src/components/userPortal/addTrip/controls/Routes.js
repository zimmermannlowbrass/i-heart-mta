import React from "react";
import Dropdown from 'react-dropdown';


function Routes({ start, route, onSetRoutes}) {
    
    const routes = []
    for (let route of start.routes) {
        routes.push(route)
    }

    return (
        <div>
            <Dropdown
            className="combobox-input" 
            options={routes}
            disabled={route && true} 
            placeholder="which train..."
            onChange={e => onSetRoutes(e.value)}>
                Which train?
            </Dropdown>
            <br/>
        </div>
    )
}

export default Routes;