import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSearchRoute, setSearchRoute } from "./searchRouteSlice";

function SearchRoute() {

    const dispatch = useDispatch()
    const currentRoute = useSelector(selectSearchRoute)

    function onFilterSubwayRoute(value) {
        dispatch(setSearchRoute(value))
    }

    const subwayRoutes = ['1','2','3','4','5','6','7','A','C', 'E', 'B', 'D','F','M','N','Q','R','W','J','Z','L','S','G']
    const routeButtons = subwayRoutes.map(route => {
        const highlight = route === currentRoute ? 'red' : null
        return (
            <button 
            onClick={e => onFilterSubwayRoute(e.target.value)} 
            key={route} 
            value={route}
            style={{color: highlight}}>
                {route}
            </button>
        )
    })

    return (
        <div>
            {routeButtons}<button onClick={() => onFilterSubwayRoute(null)}>Reset</button>
        </div>
    )
}

export default SearchRoute;