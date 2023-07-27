import React from "react";
import { Route, Switch } from "react-router-dom";
import { UserProvider } from "../context/user";

import AddTripHome from "./userPortal/addTrip/AddTripHome";
import ProfileHome from "./userPortal/profile/ProfileHome"
import Dashboard from "./userPortal/dashboard/Dashboard";

function Welcome() {


  // profile (shows old map), past trips, add trips

  return (
    <UserProvider>
      <Switch>
        <Route exact path="/addtrip">
          <AddTripHome />
        </Route>
        <Route exact path="/dashboard">
          <Dashboard />
        </Route>
        <Route exact path="/">
          <ProfileHome />
        </Route>
      </Switch>
    </UserProvider>
  )
} 

export default Welcome;