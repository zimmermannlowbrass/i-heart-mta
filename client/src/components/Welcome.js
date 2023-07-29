import React from "react";
import { Route, Switch } from "react-router-dom";

import { Provider } from 'react-redux'
import { store } from "../app/store"

import AddTripHome from "./userPortal/addTrip/AddTripHome";
import ProfileHome from "./userPortal/profile/ProfileHome"
import Dashboard from "./userPortal/dashboard/Dashboard";


function Welcome() {


  // profile (shows old map), past trips, and dashboard

  return (
    <Switch>
      <Route exact path="/">
        <ProfileHome />
      </Route>
      <Route exact path="/addtrip">
        <AddTripHome />
      </Route>
      <Route exact path="/dashboard">
        <Provider store={store}>
          <Dashboard />
        </Provider>
      </Route>
    </Switch>
  )
} 

export default Welcome;