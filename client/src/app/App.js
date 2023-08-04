import React from 'react';
import { useContext } from 'react';

import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp'
import { NavLink, Route, Switch } from "react-router-dom";

import { UserContext } from "../context/user";
import Welcome from '../components/Welcome';
import Video from './video/Video';

function App() {
  const {user} = useContext(UserContext)

  if (user) {
    return (
      <Welcome/>
    )
  }
  return (
    <div>
        <header>I ♥ MTA<br/>"The Best App for The Best Subway"</header>
        <br />
        <NavLink exact to="/signin">
          <button>Sign In</button>
        </NavLink>
        <NavLink exact to="/signup">
          <button>New Member</button>
        </NavLink>
        <br />
        <br />
        <br />
        <Switch>
          <Route exact path="/signIn">
            <SignIn />
          </Route>
          <Route exact path="/signUp">
            <SignUp />
          </Route>
          <Route exact path="/">
            <div>
              <Video />
            </div>
          </Route>
        </Switch>
    </div>
  )
}

export default App;