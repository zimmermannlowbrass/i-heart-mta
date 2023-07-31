import React from "react";
import { useEffect, useState } from "react";


const UserContext = React.createContext();

function UserProvider({ children }) {

  const [user, setUser] = useState('')
  useEffect(() => {
    fetch("/checksession")
      .then((response) => {
        if (response.ok) {
          response.json()
          .then((user) => setUser(user))
        }})
  }, [])

  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  )
}
  
export { UserContext, UserProvider };