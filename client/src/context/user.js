import React from "react";
import { useEffect, useState } from "react";


const UserContext = React.createContext();

function UserProvider({ children }) {

  const [user, setUser] = useState('')
  useEffect(() => {
    fetch('users')
    .then(r => r.json())
    .then(setUser)
  }, [])


  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  )
}
  
export { UserContext, UserProvider };