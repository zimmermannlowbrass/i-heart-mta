import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { selectFavoriteTrips, loadFavs } from "./favoriteRoutesSlice";


function FavoriteTrips() {
    const dispatch = useDispatch()
    const onFirstRender = () => {
        dispatch(loadFavs())
      }
    useEffect(onFirstRender, [])
    const favRoutes = useSelector(selectFavoriteTrips)
    console.log(favRoutes)

    return (
        <div>
            These are my favorite trips
        </div>
    )
}

export default FavoriteTrips;