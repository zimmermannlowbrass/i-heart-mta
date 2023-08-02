import React from "react";
import Dropdown from 'react-dropdown';


function Routes({ start, route, onSetRoutes}) {
    
    const routes = []
    for (const route of start.routes) {
        routes.push(route)
    }

    return (
        <div>
            {!route && 'Which train are you taking?'}
            <Dropdown
            className="combobox-input" 
            options={routes}
            disabled={route && true} 
            onChange={e => onSetRoutes(e.value)}>
                Which train?
            </Dropdown>
        </div>
    )
}

export default Routes;