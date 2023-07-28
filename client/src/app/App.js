import React from 'react';
import SignIn from '../components/SignIn';
import { UserProvider } from '../context/user';
function App() {


  // here I will set up login stuff
  return (
    <div>
      <UserProvider>
        <h1>I ♥ MTA</h1>
        <SignIn />
      </UserProvider>
    </div>
  )
}

export default App;