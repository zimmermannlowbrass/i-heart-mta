import React from "react";
import { Route, Switch } from "react-router-dom";

import { Provider } from 'react-redux'
import { store } from "../app/store"

import AddTripHome from "./userPortal/addTrip/AddTripHome";
import Home from "./userPortal/home/Home"
import Dashboard from "./userPortal/dashboard/Dashboard";

function Welcome() {
  
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
        <Home />
      </Route>
    </Switch>
  )
} 

export default Welcome;