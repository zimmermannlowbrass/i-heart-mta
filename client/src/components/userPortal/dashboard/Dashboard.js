import React from "react";
import { NavLink, Route, Switch } from "react-router-dom";

import NavBar from "../NavBar";
import Trips from "../../../features/trips/Trips";
import SubwayStops from "../../../features/subwayStops/SubwayStops";

function Dashboard() {

    console.log('dashboard')

    return (
        <div>
            <NavBar />
            <NavLink exact to="/dashboard/pasttrips">
            <button>Past Trips</button>
            </NavLink>
            <NavLink exact to="/dashboard/allsubwaystops">
            <button>All Subway Stops</button>
            </NavLink>
            <br />
            <br />
            <Switch>
            <Route exact path="/dashboard/pasttrips">
                <Trips />
            </Route>
            <Route exact path="/dashboard/allsubwaystops">
                <SubwayStops />
            </Route>
            </Switch>

            {/* <div>
                <Trips />
                <SubwayStops />
            </div> */}
        </div>
    )
}

export default Dashboard;