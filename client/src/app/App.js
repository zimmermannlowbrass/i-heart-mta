import React from 'react';
import { useContext } from 'react';

import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp'
import { NavLink, Route, Switch } from "react-router-dom";

import { UserContext } from "../context/user";
import Welcome from '../components/Welcome';

function App() {
  const {user} = useContext(UserContext)

  console.log(user)
  if (user) {
    return (
      <Welcome/>
    )
  }
  return (
    <div>
        <h1>I ♥ MTA</h1>
        <br />
        <NavLink exact to="/signin">
          <button>Sign In</button>
        </NavLink>
        <NavLink exact to="/signup">
          <button>New Member</button>
        </NavLink>
        <br />
        <br />
        <Switch>
          <Route exact path="/signIn">
            <SignIn />
          </Route>
          <Route exact path="/signUp">
            <SignUp />
          </Route>
        </Switch>
    </div>
  )
}

export default App;