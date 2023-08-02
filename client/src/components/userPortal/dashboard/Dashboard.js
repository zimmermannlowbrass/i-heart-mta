import React from "react";
import { NavLink, Route, Switch } from "react-router-dom";

import NavBar from "../NavBar";
import Trips from "../../../features/trips/Trips";
import SubwayStops from "../../../features/subwayStops/SubwayStops";
import FavoriteTrips from "../../../features/favoriteTrips/FavoriteTrips";


function Dashboard() {

    return (
        <div className="dashboard">
            <NavBar />
            <div className="dashboard-navlinks">
                <NavLink exact to="/dashboard/favoritetrips"><button>Favorite Trips</button></NavLink>
                <NavLink exact to="/dashboard/pasttrips"><button>All Past Trips</button></NavLink>
                <NavLink exact to="/dashboard/allsubwaystops"><button>All Subway Stops</button></NavLink>
            </div>
            <Switch>
                <Route exact path="/dashboard/pasttrips">
                    <Trips />
                </Route>
                <Route exact path="/dashboard/allsubwaystops">
                    <SubwayStops />
                </Route>
                <Route exact path="/dashboard/favoritetrips">
                    <FavoriteTrips />
                </Route>
            </Switch>
        </div>
    )
}

export default Dashboard;