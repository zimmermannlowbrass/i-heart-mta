import React from "react";

import NavBar from "../NavBar";
import Trips from "../../../features/trips/Trips";
import SubwayStops from "../../../features/subwayStops/SubwayStops";
import FavoriteRoutes from "../../../features/favoriteRoutes/FavoriteRoutes";

function Dashboard() {

    return (
        <div>
            <NavBar />
            This section is going to use Redux
            <div>
                <FavoriteRoutes />
                <Trips />
                <SubwayStops />
            </div>
        </div>
    )
}

export default Dashboard;