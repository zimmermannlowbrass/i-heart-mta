import React from 'react';
import SignIn from '../components/SignIn';
import { UserProvider } from '../context/user';
function App() {


  // here I will set up login stuff
  return (
    <div>
      <UserProvider>
        <SignIn />
      </UserProvider>
    </div>
  )
}

export default App;