import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { 
    selectAllSubwayStops, 
    loadSubwayStops, 
    selectFilteredSubwayStops 
} from "./subwayStopsSlice";
import SearchRoute from "../searchRoute/SearchRoute";

import "../../stylesheets/subwaystop.css"

function SubwayStops() {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadSubwayStops())
      }, [dispatch])
    const subwayStops = useSelector(selectAllSubwayStops)
    const filteredStops = useSelector(selectFilteredSubwayStops)
    const subwayStopList = filteredStops.map(subwaystop => {
        return (
            <li key={subwayStops.indexOf(subwaystop)}>
                {subwaystop.stationname}
            </li>
        )
    })
    const subwayRoutes = ['1','2','3','4','5','6','7','A','C', 'E', 'B', 'D','F','M','N','Q','R','W','J','Z','L','S','G']


    return (
        <div>
            <h1>SubwayStops</h1>
            <SearchRoute subwayRoutes={subwayRoutes}/>
            <ol>
                {subwayStopList}
            </ol>
        </div>
    )
}

export default SubwayStops;