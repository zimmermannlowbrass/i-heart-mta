import React from 'react';
import { useContext, useState } from 'react';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp'
import { UserContext } from "../context/user";
import Welcome from '../components/Welcome';

function App() {
  const {user} = useContext(UserContext)
  const [currentUser, setCurrentUser] = useState()
  const [showSignIn, setShowSignIn] = useState(false)
  const [showSignUp, setShowSignUp] = useState(false)


  function handleSignInClick() {
    setShowSignIn(true)
    setShowSignUp(false)
  }

  function handleSignUpClick() {
    setShowSignIn(false)
    setShowSignUp(true)
  }

  if (currentUser) {
    return <Welcome />
  }
  return (
    <div>
        <h1>I ♥ MTA</h1>
        <button onClick={() => setCurrentUser(user[0])}>Click me</button>
        <br />
        <button onClick={() => handleSignInClick()}>Sign In</button>
        <button onClick={() => handleSignUpClick()}>Register New User</button>
        {showSignIn && <SignIn />}
        {showSignUp && <SignUp />}
    </div>
  )
}

export default App;