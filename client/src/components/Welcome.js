import React from "react";
import { Route, Switch } from "react-router-dom";

import NavBar from "./dashboard/NavBar";

import AddTripHome from "./dashboard/addTrip/AddTripHome";
import ProfileHome from "./dashboard/profile/ProfileHome"
import ManageTrips from "./dashboard/manageTrips/ManageTrips";

function Welcome() {


  // profile (shows old map), past trips, add trips

  return (
        <Switch>
          <Route exact path="/">
            <ProfileHome />
          </Route>
          <Route exact path="/addtrip">
            <AddTripHome />
          </Route>
          <Route exact path="/managetrips">
            <ManageTrips />
          </Route>
        </Switch>
  )
} 

export default Welcome;