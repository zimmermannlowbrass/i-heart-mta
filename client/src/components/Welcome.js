import Home from "./dashboard/Home";
import Map from "./dashboard/Map";
import NavBar from "./dashboard/NavBar";
import { Route, Switch } from "react-router-dom";
import React from "react";
import Profile from "./dashboard/Profile";

function Welcome() {

  return (
    <div>
      <h1>
        Welcome
      </h1>
      <NavBar />
      <Switch>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
      </Switch>
    </div>

  )
} 

export default Welcome;