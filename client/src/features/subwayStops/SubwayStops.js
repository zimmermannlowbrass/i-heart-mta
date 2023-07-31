import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { 
    selectAllSubwayStops, 
    loadSubwayStops, 
    selectFilteredSubwayStops 
} from "./subwayStopsSlice";
import SearchRoute from "../searchRoute/SearchRoute";


function SubwayStops() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadSubwayStops());
      }, [dispatch]);
    const subwayStops = useSelector(selectAllSubwayStops)
    const filteredStops = useSelector(selectFilteredSubwayStops)
    const subwayStopList = filteredStops.map(subwaystop => {
        return (
            <ul key={subwayStops.indexOf(subwaystop)}>
                {subwaystop.stationname}
            </ul>
        )
    })

    return (
        <div>
            <h1>SubwayStops</h1>
            <SearchRoute />
            {subwayStopList}
        </div>
    )
}

export default SubwayStops;