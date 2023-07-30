import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { selectAllSubwayStops, loadSubwayStops } from "./subwayStopsSlice";


function SubwayStops() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadSubwayStops());
      }, [dispatch]);
    const subwayStops = useSelector(selectAllSubwayStops)
    console.log(subwayStops)
    const subwayStopList = subwayStops.map(subwaystop => {
        return (
            <ul key={subwayStops.indexOf(subwaystop)}>
                {subwaystop.stationname}
            </ul>
        )
    })
    return (
        <div>
            This is a SubwayStop component
            {subwayStopList}
        </div>
    )
}

export default SubwayStops;