import React from "react";
import { Route, Switch } from "react-router-dom";

import NavBar from "./dashboard/NavBar";

import Home from "./dashboard/addTrip/Home";
import ProfileHome from "./dashboard/profile/ProfileHome"
import ManageTrips from "./dashboard/manageTrips/ManageTrips";

function Welcome() {


  // profile (shows old map), past trips, add trips

  return (
    <div>
      <div className="NavBar">
        <h1>
          Welcome
        </h1>
        <NavBar />
      </div>
      <div className="Stuff">
        <Switch>
          <Route exact path="/profile">
            <ProfileHome />
          </Route>
          <Route exact path="/profileOld">
            <Home />
          </Route>
          <Route exact path="/managetrips">
            <ManageTrips />
          </Route>
        </Switch>
      </div>
    </div>

  )
} 

export default Welcome;