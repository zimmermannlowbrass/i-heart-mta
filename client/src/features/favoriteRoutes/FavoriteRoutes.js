import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { selectFavoriteRoutes, loadFavs } from "./favoriteRoutesSlice";


function FavoriteRoutes() {
    // const dispatch = useDispatch()
    // const onFirstRender = () => {
    //     dispatch(loadFavs())
    //   }
    // useEffect(onFirstRender, [])
    // const favRoutes = useSelector(selectFavoriteRoutes)
    // console.log(favRoutes)

    return (
        <div>
            These are my favorite routes
        </div>
    )
}

export default FavoriteRoutes;