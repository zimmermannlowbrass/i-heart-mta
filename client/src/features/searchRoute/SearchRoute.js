import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSearchRoute, setSearchRoute } from "./searchRouteSlice";

function SearchRoute({ subwayRoutes }) {

    const dispatch = useDispatch()
    const currentRoute = useSelector(selectSearchRoute)

    function onFilterSubwayRoute(value) {
        dispatch(setSearchRoute(value))
    }

    const routeButtons = subwayRoutes.map(route => {
        const color = route === currentRoute ? 'hotpink' : null
        const background = route === currentRoute ? 'black' : null
        return (
            <button 
            onClick={e => onFilterSubwayRoute(e.target.value)} 
            key={route} 
            value={route}
            style={{color: color, backgroundColor: background}}>
                {route}
            </button>
        )
    })

    return (
        <div>
            {routeButtons}
            <br />
            <button onClick={() => onFilterSubwayRoute(null)}>Clear</button>
        </div>
    )
}

export default SearchRoute;