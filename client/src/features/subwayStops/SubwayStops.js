import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { selectAllSubwayStops, loadData } from "./subwayStopsSlice";


function SubwayStops() {
    const dispatch = useDispatch()
    const onFirstRender = () => {
        dispatch(loadData())
      }
    useEffect(onFirstRender, [])
    const subwayStops = useSelector(selectAllSubwayStops)
    const subwayStopList = subwayStops.map(subwaystop => {
        return (
            <ul>
                {subwaystop.name}
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