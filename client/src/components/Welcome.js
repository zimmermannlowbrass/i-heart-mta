import React from "react";
import { Route, Switch } from "react-router-dom";

import { Provider } from 'react-redux'
import { store } from "../app/store"

import AddTripHome from "./userPortal/addTrip/AddTripHome";
import ProfileHome from "./userPortal/profile/ProfileHome"
import Dashboard from "./userPortal/dashboard/Dashboard";

function Welcome() {

  console.log('welcome')
  // profile (shows old map), past trips, and dashboard

  return (
    <Switch>
      <Route path="/addtrip">
        <AddTripHome />
      </Route>
      <Route path="/dashboard">
        <Provider store={store}>
          <Dashboard />
        </Provider>
      </Route>
      <Route exact path="/">
        <ProfileHome />
      </Route>
    </Switch>
  )
} 

export default Welcome;